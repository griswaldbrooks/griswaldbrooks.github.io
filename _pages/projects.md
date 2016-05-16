---
layout: page
title:  "Projects"
categories: topmost
permalink: /projects/
---


{% for page in site.projects %}
  [{{ page.title }}]({{ page.url | prepend: site.baseurl }})
{% endfor %}