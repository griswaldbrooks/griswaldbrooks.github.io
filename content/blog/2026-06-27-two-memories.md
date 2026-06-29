+++
title = "Two Memories: Honcho vs Hindsight, all the way down"
date = 2026-06-27
[taxonomies]
tags = ["agent-memory", "llm", "honcho", "hindsight", "systems"]
categories = ["engineering"]
+++

<link rel="stylesheet" href="/blog/two-memories/widgets.css">

If you ask an LLM to compare [Honcho](https://github.com/plastic-labs/honcho) and [Hindsight](https://github.com/vectorize-io/hindsight), you get mush. Both "give your agent long-term memory." Both "go beyond RAG." Both "reason." The mush isn't the model's fault — it's downstream of docs that are themselves vague, and a marketing layer that wants every system to sound like the same magic.

So I cloned both repos and read down to the schema. The two systems are **not** two implementations of one idea. They're two opposing bets about *where intelligence should live in a memory system* — and that single disagreement propagates cleanly from design philosophy all the way down to their `CREATE TABLE` statements. One puts the intelligence <span class="tm-h">in a model</span>. The other puts it <span class="tm-s">in the structure</span>. Everything else follows.

What follows is a descent. Each layer is the same question asked further down: how does the system decide what's true, what to keep, what to surface, and how to store it. <span class="tm-h">Amber is Honcho</span>; <span class="tm-s">teal is Hindsight</span>.

## Layer 00 — The split

<span class="tm-h">Honcho</span> (Plastic Labs) models **people**. Its thesis is "memory as reasoning": it treats remembering as a logical-reasoning task and builds a theory-of-mind representation of each participant. Tellingly, *both* users and agents are "peers" — it's fundamentally a social-cognition engine.

<span class="tm-s">Hindsight</span> (Vectorize, with Virginia Tech and The Washington Post) models **the world and the agent's own experience**, with a hard wall between *evidence* and *inference*. The architecture exists to keep "what the agent saw" separate from "what the agent believes," over a queryable timeline.

> One bets on weights. The other bets on structure. Read every layer below as that same wager, restated.

## Layer 01 — The reasoning engine

This is the cleanest expression of the split, and the first place the docs mislead.

<span class="tm-h">Honcho trains a model.</span> **Neuromancer XR** is a fine-tune of Qwen3-8B on a hand-curated dataset (~10k social-reasoning traces) mapping conversation turns to atomic conclusions along a certainty spectrum. Crucially it's trained *once*, by Plastic Labs, ahead of time. Your conversations run *inference* through frozen weights — no gradients touch your data. The "continual learning" is rows accumulating in Postgres, not weight updates. (Swap Neuromancer for GLM-5 or Grok and you keep all your memory — proof it lives in the DB, not the model.)

<span class="tm-s">Hindsight trains nothing.</span> Its reasoning layer, CARA, is a prompt-and-orchestration framework over *any* model you configure. It's LLM-based at several stages — fact extraction, a cross-encoder reranker, response generation — all swappable modules. The intelligence is in the pipeline and the prompts, not a specialized weight set.

<figure class="tm-fig">
  <div class="tm-legend">
    <span><span class="tm-dot h"></span>Neuromancer XR (Qwen3-8B fine-tune)</span>
    <span><span class="tm-dot s"></span>generic backbone (open-source 20B+)</span>
  </div>
  <div id="tm-bench"></div>
</figure>
<p class="tm-cap"><b>Fig 1 · published benchmarks</b> &nbsp; Honcho's win comes from a small specialized model; Hindsight's from a generic backbone inside a structured pipeline. These are the numbers each project reports — different benchmarks, not a head-to-head — so read them as "what each bet buys," not a leaderboard.</p>

So the privacy story is the ordinary one (your text sits in their Postgres unless you self-host), not "my data is in a model." And the engineering story is the deep one: **Honcho put a brain in the box; Hindsight built a very good filing system and rents a brain by the call.**

## Layer 02 — Representation

What is a single "memory"? They answer in opposite directions.

<span class="tm-h">Honcho: atomic conclusions.</span> A memory is an *atomic conclusion* about a peer, placed on a strict spectrum of logical certainty — `explicit` (stated), `deductive` (necessarily follows), `inductive` (likely pattern), `abductive` (best explanation). Conclusions are recomposable and link to the premises they came from.

<span class="tm-s">Hindsight: narrative facts.</span> A memory is a *coarse narrative fact* (2–5 per conversation, each covering a whole exchange), filed into one of four networks by epistemic role — `world`, `experience`, `opinion`, `observation`.

Note the inversion: Honcho makes facts **atomic and recomposable** so a reasoner can scaffold them; Hindsight keeps them **chunky and narrative** so retrieval is robust to where you split the conversation. And neither stores its "types" as separate tables — both use a single fact table with a discriminator column. The four networks are a `WHERE fact_type = …`, not four databases (more at Layer 07).

## Layer 03 — Retrieval

<span class="tm-h">Honcho retrieves with an agent.</span> The Dialectic is the one tool-using agent on the synchronous path; it loops over its tools until it has enough context, with a tunable reasoning budget (`minimal → max`, priced per query). Retrieval is a decision the model makes.

<span class="tm-s">Hindsight retrieves with a fixed pipeline.</span> TEMPR runs four retrievers in parallel — semantic vector, BM25, graph, temporal — fuses them with Reciprocal Rank Fusion, reranks with a cross-encoder, trims to a token budget. No agent decides; the arithmetic does.

<figure class="tm-fig"><div id="tm-ret"></div></figure>
<p class="tm-cap"><b>Fig 2 · the two recall paths</b> &nbsp; left, an adaptive tool loop; right, a deterministic four-arm fusion. Adaptive vs predictable — the same trade reappears in the ranking math at Layer 06.</p>

The RRF core is textbook, constant and all:

```python
# hindsight · search/fusion.py — four arms, fixed priority
def reciprocal_rank_fusion(result_lists, k=60):
    # score(d) = Σ_arms  1 / (k + rank(d))
    ...
```

But right below it sits `interleave_fusion` — an admission against the tidy formula. RRF *sums* reciprocal ranks, so a near-duplicate that's rank #1 in *one* arm but absent from the others gets averaged down and dropped below the budget — the exact failure that makes consolidation create duplicates. Their fix is a round-robin that guarantees every arm's top hit a slot. The elegant formalism had a hole; they patched it with an inelegant interleave. You only find that in the source.

## Layer 04 — Belief and contradiction

When new information contradicts old, the systems disagree about what "confidence" even is.

<span class="tm-s">Hindsight is numeric.</span> An opinion is a tuple `(text, c, τ)` with `c ∈ [0,1]`. New evidence is classified and the scalar is nudged:

```text
c' = min(c + α, 1)     # reinforce
c' = max(c − α, 0)     # weaken
c' = max(c − 2α, 0)    # contradict  ← costs double
c' = c                 # neutral
```

That `2α` is the entire deconfliction philosophy in one coefficient: damped but responsive, so beliefs don't oscillate on a single example. And the evidence/inference wall is enforced *in the database* — the CHECK constraint at Layer 07.

<span class="tm-h">Honcho refuses numbers.</span> It deliberately avoids "arbitrary numerical tokens for certainty," using natural-language tiers plus reasoning traces. Contradiction is handled by re-reasoning: the deduction specialist treats a changed fact as a knowledge update, writes a dated update observation with explicit premises, and **deletes the stale one**. Reconciliation is generative and offline, not arithmetic and online.

A quiet convergence worth noting: both end up *deleting* superseded beliefs — Honcho via a soft-delete in its deduction agent, Hindsight via an LLM-driven move to a tombstone table. They reach "prune the past" from opposite directions: one through agent judgment, one through a consolidation engine.

## Layer 05 — The dreamer, and surprisal

This is the find that most repays reading the source. Honcho's docs mention "reasoning trees," so I expected a logic graph in `src/dreamer/trees/`. It isn't. It's a set of spatial nearest-neighbor structures — random-projection trees, cover trees, LSH — whose only job is to compute **geometric surprisal** over observation embeddings.

Before the dreamer spends a single expensive reasoning call, it decides *what's worth thinking about* using information theory. It builds a tree over the cloud of a peer's existing observations and scores each by how improbable its path through that tree is:

```text
# honcho · dreamer/trees/rptree.py
S(x) = −log P(path to x) = Σ −log( n_child / n_parent )
```

An observation landing in a dense, well-trodden region has a high-probability path → *low* surprisal → redundant. One that forces traversal down sparse branches → *high* surprisal → novel or anomalous. The pipeline keeps only the top slice and feeds *those* to the deductive / inductive / abductive specialists.

<figure class="tm-fig">
  <div id="tm-surprisal"></div>
  <div class="tm-controls">
    <button class="tm-btn" id="tm-surp-add">Drop a new observation</button>
    <button class="tm-btn" id="tm-surp-reset">Reset cloud</button>
  </div>
</figure>
<p class="tm-cap"><b>Fig 3 · surprisal, illustrated</b> &nbsp; Each drop lands an observation in embedding space. Near the crowd → low surprisal (dim, skipped). Out in empty space → high surprisal (bright, sent to the reasoners). This is the throttle that keeps "dreaming" affordable: spend scarce reasoning only on the surprising tail.</p>

So Honcho's most sophisticated code is a mechanism for *not* reasoning about most things. That tells you exactly what it's bound by: **reasoning compute**. The whole architecture rations an expensive, scarce resource and spends it only where novelty says it'll pay off. (The actual premise-linked "reasoning tree," by the way, lives elsewhere — it's the mandatory `source_ids` linkage the deduction agent writes on every conclusion. Two different "trees" sharing a module; no wonder the docs confuse.)

## Layer 06 — The recency–relevance arbitration

The very bottom of retrieval: in a tie, do you get the recent answer or the relevant one? Here the split is almost too clean.

<span class="tm-h">Honcho has no recency formula at all.</span> Grep the whole repo for `recency_boost`, `half_life`, `time_decay` — zero hits. Instead it exposes three separate primitives as tools and lets the Dialectic agent *choose*: cosine-only semantic, `created_at`-only recent, or `times_derived`-then-recency for reinforced observations. Recency-vs-relevance is an agent decision, not a blend.

<span class="tm-s">Hindsight has a closed-form score.</span> Relevance is the multiplicative base; recency, temporal proximity, and proof-count are *bounded* modifiers on top:

```python
# hindsight · search/reranking.py
combined = CE_norm * recency_boost * temporal_boost * proof_count_boost
recency_boost = 1 + alpha * (recency - 0.5)   # alpha=0.2 → range [0.9, 1.1]
# combined envelope: max ≈ +21%, min ≈ −19%  → recency can NEVER trump relevance
```

Drag `α` below and watch the January "I love Python" fact and the June "Rust won me over" fact resolve. Recency is a tiebreaker, not a trump — and there's an explicit guardrail so that when the cross-encoder gives no signal, the order doesn't collapse into a pure recency sort.

<figure class="tm-fig">
  <div class="tm-recency">
    <div><div id="tm-recency-svg"></div></div>
    <div>
      <div class="tm-ctrl"><label for="tm-alpha">recency α</label>
        <input type="range" id="tm-alpha" min="0" max="0.6" step="0.02" value="0.2">
        <span class="tm-read">α = <b id="tm-alpha-val">0.20</b></span></div>
      <div class="tm-ctrl"><label for="tm-rel">Jan relevance edge</label>
        <input type="range" id="tm-rel" min="-0.3" max="0.3" step="0.02" value="0">
        <span class="tm-read"><b id="tm-rel-val">0.00</b></span></div>
      <div class="tm-verdict" id="tm-recency-verdict"></div>
    </div>
  </div>
</figure>
<p class="tm-cap"><b>Fig 4 · recency as a bounded modifier</b> &nbsp; The shaded band is the ±envelope recency can move a result. With relevance tied, June wins by the recency margin — repeatably, every run. Give January a big enough relevance edge and recency can't flip it. That determinism is also why this function is trivially unit-testable; an agent tool-loop is not.</p>

## The trace — one fact, both pipelines

Concretely: the user says *"I love Python"* in January, then *"honestly, Rust has won me over"* in June. Watch the same contradiction move through both systems.

<figure class="tm-fig">
  <div class="tm-controls" style="justify-content:flex-start">
    <button class="tm-btn pri" id="tm-trace-play">▶ Play</button>
    <button class="tm-btn" id="tm-trace-step">Step</button>
    <button class="tm-btn" id="tm-trace-reset">Reset</button>
    <span class="tm-stepn" id="tm-trace-stepn">step 0 / 6</span>
  </div>
  <div class="tm-trace-grid">
    <div class="tm-col h"><h4><span>Honcho</span><span class="mech">surprisal → re-reason → delete</span></h4><div class="tm-steps" id="tm-trace-h"></div></div>
    <div class="tm-col s"><h4><span>Hindsight</span><span class="mech">bitemporal retrieve + decay</span></h4><div class="tm-steps" id="tm-trace-s"></div></div>
  </div>
</figure>

The deepest practical difference surfaces here: what each does with the *past*. Honcho prunes the stale "loves Python" observation in favor of a current-truth update — great for "what's true now," weaker for "what did they prefer in February?" Hindsight keeps the January fact as valid history with bitemporal timestamps — heavier, but it answers point-in-time and "how did this belief evolve" queries natively.

## Layer 07 — Storage: the schema is the architecture

The DDL confirms everything above. Count the storage systems first: <span class="tm-s">Hindsight is one database doing everything</span>; <span class="tm-h">Honcho is two</span> (optionally three).

**Honcho — ~11 tables.** PostgreSQL (relational + pgvector HNSW + `tsvector` FTS + a JSONB graph + a `queue` table) plus Redis as a hot cache, plus an optional external vector store (Turbopuffer / LanceDB). Plus a separate deriver worker process.

**Hindsight — ~19 tables.** PostgreSQL *only*: pluggable ANN (pgvector / pgvectorscale-DiskANN / vchord / scann), BM25 via `pgroonga`/`pg_search`, the graph as real edge tables, queues as tables. There's even an in-process embedded mode. No Redis.

Three physical divergences tell the whole story.

**The graph.** Hindsight normalizes it: `memory_links(from_unit_id, to_unit_id, link_type, weight)` is a real edge table, plus `entities`, `unit_entities`, `entity_cooccurrences`. Honcho denormalizes it into a single JSONB column (`source_ids`) with a GIN index — the graph lives *inside* the fact rows.

**Confidence is a database constraint.** Hindsight's evidence/inference firewall isn't convention; it's DDL. A world or experience fact is *forbidden* a confidence score; an opinion is *required* one:

```sql
-- hindsight · alembic/…initial_schema.py
CHECK (
  (fact_type = 'opinion'      AND confidence_score IS NOT NULL) OR
  (fact_type = 'observation') OR
  (fact_type NOT IN ('opinion','observation') AND confidence_score IS NULL)
)
```

Honcho has no confidence column at all — consistent with its "no numeric certainty" stance. The `level` enum *is* the certainty representation.

**History.** Hindsight keeps append-only provenance — `observation_history`, `observation_sources`, `invalidated_memory_units`, `audit_log` — built for "how did this evolve" and audit. Honcho compresses all of it into a `times_derived` counter, a `source_ids` array, and a `deleted_at` soft-delete flag.

The operational corollary: Honcho's footprint is Postgres + Redis + a long-running deriver worker + the model calls. Hindsight is a single Postgres you can even embed in-process. On a RAM-constrained box, that asymmetry can matter more than any algorithm above it.

## The same bet, at every layer

| layer | Honcho | Hindsight |
|---|---|---|
| philosophy | models people · reasoning-centric | models world + experience · structure-centric |
| engine | Neuromancer XR — fine-tuned Qwen3-8B | CARA — generic swappable LLMs + prompts |
| unit | atomic conclusion · explicit→abductive | narrative fact · world/exp/opinion/obs |
| retrieval | Dialectic agent loop · budgeted | 4-arm fusion · RRF k=60 + rerank |
| certainty | linguistic tiers · no number | scalar c∈[0,1] · CHECK-enforced |
| contradiction | re-reason offline + delete | c−2α + LLM supersede + tombstone |
| consolidation | surprisal-gated dreaming | proof-count + history tables |
| ranking | no formula · agent picks tool | CE × recency × temporal × proof |
| graph | JSONB adjacency + GIN | normalized edge + entity tables |
| storage | Postgres + Redis (+ ext vec) | Postgres only (or embedded) |
| license | AGPL-3.0 | MIT |

## Verdict

Neither is "better." They optimize different axes, and your use case picks for you.

Reach for <span class="tm-h">Honcho</span> when the job is **knowing who someone is right now** and reasoning well about it — personalization, theory-of-mind, an agent that should anticipate needs. Its bias toward current-truth-plus-provenance fits, and the surprisal gate keeps dream cost bounded. The cost: a heavier runtime and ranking behavior you can't pin down with a deterministic test.

Reach for <span class="tm-s">Hindsight</span> when you need an **auditable timeline** — "what did this customer believe in Q1 vs Q3," explainable recall, mission-critical recall over many sessions. Bitemporal facts + an evidence/inference firewall + a deterministic, unit-testable ranking function are the win. The cost: a heavier retrieval stack you have to tune, over generic models.

> They're not two takes on one idea. They're two answers to one question: put the intelligence in the model, or put it in the structure. Everything from the philosophy to the `CHECK` constraint is that single choice, restated.

---

*Written from source — every claim traces to a file, a migration, or a paragraph in the paper, not a docs page. Primary sources: [plastic-labs/honcho](https://github.com/plastic-labs/honcho) (AGPL-3.0), [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) (MIT), and [arXiv:2512.12818](https://arxiv.org/abs/2512.12818), "Hindsight is 20/20," Latimer et al.*

<script src="/blog/two-memories/widgets.js" defer></script>
