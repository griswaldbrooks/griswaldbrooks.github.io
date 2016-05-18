---
title: "Nao"
nobility: home
permalink: /projects/nao/
image: cool_nao2_cropped.jpg
image_desc: "Cool Nao"
project_desc: "Nao Humanoid Platform used for experimentation with navigation and crawling."
---

{% include home_picture.html picture_path='/_projects/nao/cool_nao2.jpg' picture_desc='Cool Nao'%}

For my graduate research and Master's Thesis I worked with the 
[Nao Humanoid Platform](https://www.aldebaran.com/en/cool-robots/nao) to implement 
[GODZILA](http://dx.doi.org/10.1109/CCDC.2014.6852631), a potential field based 
navigation algorithm, and the [Projected Profile crawling algorithm](http://dx.doi.org/10.1109/IROS.2015.7354220)
which I developed.

In 2015, I presented [my work](https://www.youtube.com/embed/leQpX1VDJok) on the Projected Profile algorithm at 
[IROS 2015](http://www.iros2015.org/).

The paper on the work can be viewed [here]({{site.baseurl}}/downloads/IROS_2015_paper.pdf).

Videos of my work with Nao can be viewed [here]({{ site.baseurl }}/projects/nao/videos/).

# GODZILA Navigation

[GODZILA](http://dx.doi.org/10.1007/s10846-006-9090-0)
(Game-theoretic Optimal Deformable Zone with Inertia and Local Approach) is a local 
continuous navigation algorithm based on the potential field idea. In contrast to some potential field formulations
which work on the range and bearing of objects in the environment, GODZILA uses the sensor information about occlusion
locations directly in order to formulate navigation commands. It is a memoryless algorithm and does not attempt to
build a map of the environment making it very lightweight in terms of both computation and memory.
It can be implemented
on a variety of vehicles and is suited for the cases where a low computational power microcontroller is utilized.
It has three components which are an optimization cost, a straight line planner, 
and a stochastic local minima escape strategy.

Code from the project can be viewed [here](https://github.com/griswaldbrooks/naonav).

# Projected Profile Crawl Gait

The Projected Profile crawling algorithm is a kinematic gait based on the idea that
a can be gaited executed in a two mode process, viewing the robot as a single closed
chain manipulator for moving the center of mass, and as an open chain manipulator
for positioning the arms and legs. This allowed an analytical solution to the problem of
crawling to be developed for a 25 degree-of-freedom system.
Later, taking advantage under-utilized degrees-of-freedom, a genetic algorithm was used
to improve the energy efficiency of the nominal gait by a factor of six.


Code from the project can be viewed [here](https://github.com/griswaldbrooks/naocrawl).
