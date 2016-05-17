---
title: "Trinity Simulator"
nobility: home
permalink: /projects/trinity_simulator/
image: sim_fig1_cropped.jpg
image_desc: "Simulation of Nao using sonars to reach goal."
project_desc: "MATLAB simulator for vehicles in planar environments."
---

{% include home_picture.html picture_path='/_projects/trinity_simulator/sim_fig1.jpg' picture_desc=''%}

In my undergrad, I wrote a MATLAB simulator to tests various algorithms for the 
[Trinity College Fire Fighting Home Robot Contest](http://www.trincoll.edu/events/robot/).
It is a kinematic simulation of a planar mobile robot that can receive linear and angular
velocity commands. The robot navigates a parameterically constructed environment and
uses its beam model virtual sensors to understand the world. The beam number, width,
and ranges are all configurable.

While originally intended for use with the Trinity Fire Fighting contest, is was also
used in my undergraduate research to test potential field navigation algorithms for
the [Nao]({{site.baseurl}}/projects/nao).

Videos of various simulations can be seen [here]({{site.baseurl}}/projects/trinity_simulator/videos)

The last stable release can be found [here](https://github.com/griswaldbrooks/TrinitySimulator/tree/master/Stable%20Release%202.0).