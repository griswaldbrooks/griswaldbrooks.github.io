---
title:  "Actaeon"
nobility: home
permalink: /projects/actaeon/
image: actaeon_cropped.jpg
image_desc: "Actaeon v2"
project_desc: "Mobile robot built for the Trinity College Fire Fighting Home Robot Contest."
---

{{page.categories}}

<img style="float: right; padding: 0px 0px 0px 25px" 
     src="{{site.baseurl}}/_projects/actaeon/actaeon_cropped.jpg" 
     alt="Actaeon v2 and Trinity College Fire Fighting Home Robot Contest 2011"
     width="375">

Actaeon was an autonomous mobile robot I built as an undergraduate for the
[Trinity College Fire Fighting Home Robot Contest](http://www.trincoll.edu/events/robot/).
It was a small mobile robot designed to autonomously navigate a simulated miniature house to 
find and extinguish a candle, representing a house fire.

The robot included:  

 - Hardware
    - Differential drive mobile base
    - Quadrature wheel encoders
    - 5 Sharp IR analog distance sensors
    - 5 UV photodetectors
    - 2 Servo actuated sprayer arms
    - LiFePO<sub>4</sub> batteries.
  - Software
    - PI controller for wheel speed
    - Potential field navigation
    - Simple right wall follow exploration logic

[Actaeon](https://en.wikipedia.org/wiki/Actaeon) was a famous Greek hero and hunter.
He was trained by [Chiron](https://en.wikipedia.org/wiki/Chiron), and killed by [Artemis](https://en.wikipedia.org/wiki/Artemis).
Chiron was the name of my previous quadupedal robot, and Artemis was the name of a Trinity Robot 
I collaborated with [Bilal Gill](https://www.linkedin.com/in/bilal-gill-4a30b058) on in 2013.

Code for the project can be found [here](https://github.com/griswaldbrooks/Actaeon-Project).


Videos can be found [here]({{ site.baseurl }}/projects/actaeon/videos/).

Images can be found [here]({{ site.baseurl }}/projects/actaeon/images/).

# Trinity Simulator
---

I wrote a simulator for the project in MATLAB that was used to test algorithms.
The last stable release can be found [here](https://github.com/griswaldbrooks/TrinitySimulator/tree/master/Stable%20Release%202.0).

Here's the [project page]({{site.baseurl}}/projects/trinity_simulator).

Three IR beam model.
<iframe width="420" height="315" src="https://www.youtube.com/embed/_f_l_9nRHDo" frameborder="0" allowfullscreen></iframe>