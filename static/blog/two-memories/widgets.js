/* ============================================================
   two-memories — interactive figures (vanilla, no deps)
   Progressive enhancement: if this fails to load, the prose and
   fenced code in the post still convey everything. All IDs are
   namespaced tm-*. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";
  function el(t, a) { var e = document.createElementNS(NS, t); a = a || {}; for (var k in a) e.setAttribute(k, a[k]); return e; }
  function byId(id) { return document.getElementById(id); }

  var HONCHO = "#F2B05E", HONCHO_DIM = "#7a5a32", HIND = "#4FD0C9";

  /* ---------- benchmark bars ---------- */
  (function bench() {
    var host = byId("tm-bench"); if (!host) return;
    var data = [
      { label: "Neuromancer XR · LoCoMo", val: 86.9, c: HONCHO, note: "vs 80.0 Claude 4 Sonnet baseline" },
      { label: "base Qwen3-8B · LoCoMo", val: 69.6, c: HONCHO_DIM, note: "the un-tuned backbone" },
      { label: "Hindsight 20B · LongMemEval", val: 83.6, c: HIND, note: "up from 39.0 full-context, same backbone" },
      { label: "Hindsight (large) · LongMemEval", val: 91.4, c: HIND, note: "scaled backbone" },
      { label: "Hindsight (large) · LoCoMo", val: 89.6, c: HIND, note: "vs 75.8 strongest prior open system" }
    ];
    var W = Math.min(host.offsetWidth || 640, 760), rowH = 58, pad = 8, max = 100;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + (data.length * rowH + pad), width: "100%" });
    data.forEach(function (d, i) {
      var y = i * rowH + pad, trackY = y + 24, bw = W;
      var lab = el("text", { x: 0, y: y + 15, fill: "#cfcabb", "font-size": 12.5 }); lab.textContent = d.label; svg.appendChild(lab);
      svg.appendChild(el("rect", { x: 0, y: trackY, width: bw, height: 14, rx: 7, fill: "#1c2330" }));
      var bar = el("rect", { x: 0, y: trackY, width: 0, height: 14, rx: 7, fill: d.c }); svg.appendChild(bar);
      var note = el("text", { x: 6, y: trackY + 44, fill: "#6B7384", "font-size": 11 }); note.textContent = d.note; svg.appendChild(note);
      var num = el("text", { x: 0, y: trackY + 11, fill: "#0f1219", "font-size": 11, "font-weight": 700, "text-anchor": "end" }); svg.appendChild(num);
      var target = bw * d.val / max;
      var obs = new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) {
          var t0 = null, dur = 900;
          (function anim(ts) {
            if (!t0) t0 = ts; var p = reduce ? 1 : Math.min((ts - t0) / dur, 1), e2 = 1 - Math.pow(1 - p, 3);
            bar.setAttribute("width", target * e2); num.setAttribute("x", Math.max(target * e2 - 6, 26));
            num.textContent = (d.val * e2).toFixed(1); if (p < 1) requestAnimationFrame(anim);
          })();
          obs.disconnect();
        }
      }, { threshold: 0.35 });
      obs.observe(host);
    });
    host.appendChild(svg);
  })();

  /* ---------- retrieval diagram ---------- */
  (function ret() {
    var host = byId("tm-ret"); if (!host) return;
    var W = Math.min(host.offsetWidth || 640, 760), H = 300;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: "100%" });
    var midX = W / 2 - 14;
    function lbl(x, y, t, c, sz, anchor, weight) { var e = el("text", { x: x, y: y, fill: c, "font-size": sz || 11, "text-anchor": anchor || "middle", "font-weight": weight || 500 }); e.textContent = t; svg.appendChild(e); }
    function box(x, y, w, h, c, t) { svg.appendChild(el("rect", { x: x, y: y, width: w, height: h, rx: 8, fill: "none", stroke: c, "stroke-width": 1.3, opacity: .9 })); lbl(x + w / 2, y + h / 2 + 4, t, c); }
    var defs = el("defs");
    [["tmah", HONCHO], ["tmas", HIND]].forEach(function (p) { var m = el("marker", { id: p[0], markerWidth: 7, markerHeight: 7, refX: 6, refY: 3, orient: "auto" }); m.appendChild(el("path", { d: "M0,0 L6,3 L0,6 Z", fill: p[1] })); defs.appendChild(m); });
    svg.appendChild(defs);
    svg.appendChild(el("line", { x1: W / 2, y1: 14, x2: W / 2, y2: H - 14, stroke: "#2a323f", "stroke-dasharray": "3 5" }));
    lbl(midX / 2, 30, "HONCHO · Dialectic", HONCHO, 12, "middle", 700);
    box(midX / 2 - 70, 52, 140, 34, HONCHO, "query");
    box(midX / 2 - 70, 118, 140, 34, HONCHO, "LLM agent");
    box(midX / 2 - 70, 184, 140, 34, HONCHO, "tools: search · recent");
    svg.appendChild(el("path", { d: "M " + (midX / 2) + " 86 L " + (midX / 2) + " 118", stroke: HONCHO, "stroke-width": 1.3, "marker-end": "url(#tmah)" }));
    svg.appendChild(el("path", { d: "M " + (midX / 2) + " 152 L " + (midX / 2) + " 184", stroke: HONCHO, "stroke-width": 1.3, "marker-end": "url(#tmah)" }));
    svg.appendChild(el("path", { d: "M " + (midX / 2 - 70) + " 201 C " + (midX / 2 - 130) + " 201, " + (midX / 2 - 130) + " 135, " + (midX / 2 - 70) + " 135", stroke: HONCHO, "stroke-width": 1.3, fill: "none", "marker-end": "url(#tmah)", "stroke-dasharray": "4 4" }));
    lbl(midX / 2 - 120, 170, "loop", HONCHO, 10);
    box(midX / 2 - 70, 250, 140, 30, HONCHO, "answer");
    svg.appendChild(el("path", { d: "M " + (midX / 2) + " 218 L " + (midX / 2) + " 250", stroke: HONCHO, "stroke-width": 1.3, "marker-end": "url(#tmah)" }));
    var sx = W / 2 + (W / 2) / 2;
    lbl(sx, 30, "HINDSIGHT · TEMPR", HIND, 12, "middle", 700);
    ["semantic", "bm25", "graph", "temporal"].forEach(function (a, i) {
      var seg = (W / 2 - 36) / 4, x = W / 2 + 18 + i * seg;
      box(x, 52, seg - 6, 30, HIND, a);
      svg.appendChild(el("path", { d: "M " + (x + (seg - 6) / 2) + " 82 L " + sx + " 118", stroke: HIND, "stroke-width": 1, opacity: .7 }));
    });
    box(sx - 70, 118, 140, 30, HIND, "RRF  k=60");
    svg.appendChild(el("path", { d: "M " + sx + " 148 L " + sx + " 178", stroke: HIND, "stroke-width": 1.3, "marker-end": "url(#tmas)" }));
    box(sx - 70, 178, 140, 30, HIND, "cross-encoder");
    svg.appendChild(el("path", { d: "M " + sx + " 208 L " + sx + " 238", stroke: HIND, "stroke-width": 1.3, "marker-end": "url(#tmas)" }));
    box(sx - 70, 238, 140, 30, HIND, "token budget → facts");
    host.appendChild(svg);
  })();

  /* ---------- surprisal ---------- */
  (function surp() {
    var host = byId("tm-surprisal"); if (!host) return;
    var W = Math.min(host.offsetWidth || 640, 760), H = 320;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: "100%" }); host.appendChild(svg);
    var clusters = [[W * .32, H * .42], [W * .6, H * .62], [W * .5, H * .32]];
    var pts = [];
    function gauss() { var u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function nearest(p) { var m = 1e9; for (var i = 0; i < pts.length; i++) { var q = pts[i]; if (q === p) continue; var d = (q.x - p.x) * (q.x - p.x) + (q.y - p.y) * (q.y - p.y); if (d < m) m = d; } return Math.sqrt(m); }
    function render(flash) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var g = el("text", { x: 12, y: H - 12, fill: "#6B7384", "font-size": 11 }); g.textContent = "embedding space (2-D projection)"; svg.appendChild(g);
      pts.forEach(function (p) {
        var s = nearest(p), high = s > 55;
        var col = high ? HONCHO : (p.base ? "#3a4250" : "#6b7384");
        var r = p.base ? 3.4 : 5;
        svg.appendChild(el("circle", { cx: p.x, cy: p.y, r: r, fill: high ? col : "none", stroke: col, "stroke-width": 1.6, opacity: high ? 1 : .65 }));
        if (p === flash) {
          var ring = el("circle", { cx: p.x, cy: p.y, r: 6, fill: "none", stroke: high ? HONCHO : "#6b7384", "stroke-width": 1.5 });
          svg.appendChild(ring);
          if (!reduce) {
            ring.appendChild(el("animate", { attributeName: "r", from: 6, to: 34, dur: "1s", fill: "freeze" }));
            ring.appendChild(el("animate", { attributeName: "opacity", from: .9, to: 0, dur: "1s", fill: "freeze" }));
          }
          var t = el("text", { x: p.x + 12, y: p.y + 4, fill: high ? HONCHO : "#6b7384", "font-size": 11, "font-weight": 600 });
          t.textContent = high ? "S=" + s.toFixed(0) + " · novel → reason" : "S=" + s.toFixed(0) + " · redundant → skip";
          svg.appendChild(t);
        }
      });
    }
    function seed() { pts = []; clusters.forEach(function (c) { for (var i = 0; i < 14; i++) pts.push({ x: c[0] + gauss() * 28, y: c[1] + gauss() * 24, base: true }); }); render(); }
    var add = byId("tm-surp-add"), rst = byId("tm-surp-reset");
    if (add) add.onclick = function () {
      var p;
      if (Math.random() < .5) { var c = clusters[Math.floor(Math.random() * 3)]; p = { x: c[0] + gauss() * 26, y: c[1] + gauss() * 22, base: false }; }
      else { p = { x: 60 + Math.random() * (W - 120), y: 40 + Math.random() * (H - 100), base: false }; }
      pts.push(p); render(p);
    };
    if (rst) rst.onclick = seed;
    seed();
  })();

  /* ---------- recency lab ---------- */
  (function recency() {
    var host = byId("tm-recency-svg"); if (!host) return;
    var W = Math.min(host.offsetWidth || 400, 420), H = 230;
    var svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: "100%" }); host.appendChild(svg);
    var aEl = byId("tm-alpha"), aV = byId("tm-alpha-val"), rEl = byId("tm-rel"), rV = byId("tm-rel-val"), verdict = byId("tm-recency-verdict");
    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var alpha = parseFloat(aEl.value), rel = parseFloat(rEl.value);
      aV.textContent = alpha.toFixed(2); rV.textContent = (rel >= 0 ? "+" : "") + rel.toFixed(2);
      var baseCE = 0.6, janCE = baseCE + rel, junCE = baseCE, janR = 0.0, junR = 1.0;
      var jan = janCE * (1 + alpha * (janR - 0.5)), jun = junCE * (1 + alpha * (junR - 0.5));
      var top = 24, bot = H - 40, mid = (top + bot) / 2;
      var bandTop = mid - (alpha / 0.6) * 70, bandBot = mid + (alpha / 0.6) * 70;
      svg.appendChild(el("rect", { x: 40, y: bandTop, width: W - 80, height: bandBot - bandTop, fill: HIND, opacity: .07, rx: 4 }));
      svg.appendChild(el("line", { x1: 40, y1: mid, x2: W - 40, y2: mid, stroke: "#2a323f", "stroke-dasharray": "3 5" }));
      var t1 = el("text", { x: 44, y: bandTop - 6, fill: "#6B7384", "font-size": 10 }); t1.textContent = "±recency envelope"; svg.appendChild(t1);
      var maxv = 0.95, minv = 0.35, scale = (bot - top) / (maxv - minv);
      function bar(x, v, col, label, sub) {
        var hgt = (v - minv) * scale, y = bot - hgt;
        svg.appendChild(el("rect", { x: x - 34, y: y, width: 68, height: hgt, rx: 6, fill: col, opacity: .85 }));
        var tv = el("text", { x: x, y: y - 8, fill: col, "font-size": 12, "font-weight": 700, "text-anchor": "middle" }); tv.textContent = v.toFixed(3); svg.appendChild(tv);
        var tl = el("text", { x: x, y: bot + 16, fill: "#cfcabb", "font-size": 11, "text-anchor": "middle" }); tl.textContent = label; svg.appendChild(tl);
        var ts = el("text", { x: x, y: bot + 30, fill: "#6B7384", "font-size": 9.5, "text-anchor": "middle" }); ts.textContent = sub; svg.appendChild(ts);
      }
      bar(W * 0.36, jan, HONCHO_DIM, "Jan · Python", "older fact");
      bar(W * 0.64, jun, HIND, "Jun · Rust", "newer fact");
      var winner = jun > jan ? "Rust (June)" : "Python (January)";
      var margin = Math.abs(jun - jan) / Math.max(jun, jan) * 100;
      verdict.innerHTML = 'recall returns: <span class="win">' + winner + '</span><br>' +
        'Jan score = ' + jan.toFixed(3) + ' &nbsp; Jun score = ' + jun.toFixed(3) + '<br>' +
        'margin ' + margin.toFixed(1) + '% &nbsp;·&nbsp; ' +
        (rel > 0.0001 ? ('relevance edge to January ' + (rel >= alpha ? 'overrides recency' : 'still losing to recency')) : 'relevance tied → recency decides');
    }
    aEl.addEventListener("input", draw); rEl.addEventListener("input", draw); draw();
  })();

  /* ---------- trace stepper ---------- */
  (function trace() {
    var H = [
      ["Jan message stored", 'Deriver emits an <b>explicit</b> observation: "user loves Python" (+ deductive: "is a programmer"). No conflict yet.'],
      ["Jun message stored", 'Deriver emits "user now prefers Rust." Two observations coexist; nothing reconciled.'],
      ["Dream cycle fires", "Surprisal builds a tree over the peer's observation cloud. The Rust point sits in a sparse region → <b>high surprisal</b> → selected."],
      ["Deduction specialist", "Discovery tools surface both facts. Recognizes a <b>knowledge update</b>: preference changed over time."],
      ["Reconcile + prune", 'Writes a dated update with <b>source_ids + premises</b>; <b>soft-deletes</b> the stale "loves Python" observation.'],
      ["Query: prefers?", 'Dialectic tool-loops, finds the current observation → answers <b>"Rust, as of June"</b>, chain traceable via premises.']
    ];
    var S = [
      ["Jan retained", "TEMPR extracts narrative fact f1 (τ≈Jan, entities {User,Python}); embedded, entity-linked."],
      ["Jun retained", "f2 (τ≈Jun, entities {User,Rust,Python}). Shared Python entity → hard <b>w=1.0 edge</b> f1↔f2."],
      ["Consolidation", "New evidence classified <b>contradict</b> vs the Python opinion → c′ = max(c−2α, 0); confidence collapses with repetition."],
      ["Supersede", 'Old observation marked superseded → moved to <b>invalidated_memory_units</b>; new "prefers Rust" written with history.'],
      ["Recall · 4 arms", "Semantic finds f1,f2; temporal + recency push <b>f2 above f1</b>; RRF fuses, cross-encoder reranks."],
      ["Reflect → answer", 'CARA answers <b>"Rust, as of June"</b>. f1 stays valid history — "used to prefer Python" still queryable.']
    ];
    var hHost = byId("tm-trace-h"), sHost = byId("tm-trace-s"); if (!hHost || !sHost) return;
    function build(host, arr) { arr.forEach(function (s, i) { var d = document.createElement("div"); d.className = "tm-step"; d.dataset.i = i; d.innerHTML = '<span class="i">' + String(i + 1).padStart(2, "0") + '</span><span class="x"><b>' + s[0] + '</b><br>' + s[1] + '</span>'; host.appendChild(d); }); }
    build(hHost, H); build(sHost, S);
    var total = H.length, cur = 0, timer = null;
    var stepn = byId("tm-trace-stepn"), playBtn = byId("tm-trace-play");
    function paint() { var n = document.querySelectorAll("#tm-trace-h .tm-step, #tm-trace-s .tm-step"); n.forEach(function (x) { x.classList.toggle("on", +x.dataset.i < cur); }); stepn.textContent = "step " + cur + " / " + total; }
    function step() { if (cur < total) { cur++; paint(); } if (cur >= total) stop(); }
    function play() { if (timer) { stop(); return; } playBtn.textContent = "❚❚ Pause"; if (cur >= total) cur = 0; timer = setInterval(step, 1100); }
    function stop() { clearInterval(timer); timer = null; playBtn.textContent = "▶ Play"; }
    playBtn.onclick = play;
    byId("tm-trace-step").onclick = function () { stop(); step(); };
    byId("tm-trace-reset").onclick = function () { stop(); cur = 0; paint(); };
    paint();
  })();
})();
