+++
title = "🦾 Spanny"
description = "Spanny stuff"
date = "2024-12-28"
+++

{% extends "base.html" %}
{% block main %}
  <h1>Spanny Arm Overview</h1>
  <p>...some intro content...</p>

  <h2>Related Blog Posts</h2>
  {% for page in get_taxonomy("tags").get("spanny").pages %}
    <article>
      <h3><a href="{{ page.permalink }}">{{ page.title }}</a></h3>
      <p>Published: {{ page.date | date(format="YYYY-MM-dd") }}</p>
    </article>
  {% endfor %}
{% endblock %}

