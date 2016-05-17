---
layout: page
title:  "Projects"
categories: topmost
permalink: /projects/
---


<ul>
{% for page in site.projects %}
  {% if page.nobility == 'home' %}
<li>
    {% if page.image %}
<a href="{{ site.baseurl }}{{ page.url }}">
<img style="float: right; padding: 5px 0px 0px 25px" 
     src="{{site.baseurl}}{{page.permalink}}{{page.image}}" 
     alt="{{page.image_desc}}"
     height="75">  
</a>
    {% endif %}
  
<h1><a href="{{ site.baseurl }}{{ page.url }}">{{page.title}}</a></h1>
<p>{{page.project_desc}}</p>

<hr>
</li>
    
  {% endif %}
{% endfor %}
</ul>

