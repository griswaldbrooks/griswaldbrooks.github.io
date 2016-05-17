---
title:  "General Mobile Manipulator"
nobility: home
permalink: /projects/gmm/
image: gmm_cropped.jpg
image_desc: "GMM"
project_desc: "Unmanned ground vehicle for experimentation with localization and mapping."
---

{% include home_picture.html picture_path='/_projects/gmm/gmm.jpg' picture_desc='GMM without arm.'%}

The General Mobile Manipulator was a project started during my graduate research by 
[Brian Cairl](https://www.linkedin.com/in/briancairl), [Agraj Jain](https://www.linkedin.com/in/agrajjain), and myself at NYU School of Engineering.
It was an autonomous ground vehicle with multi-degree-of-freedom arm and gripper.
I was responsible for the hardware design and implementation. 
The vehicle consisted of:

  - Differential 4WD base
  - Two passive wheels with position encoders
  - Quad-core computer
  - [Dual-processor autopilot]({{site.baseurl}}/projects/autopilot)
  - Hokoyu Lidar
  - IMU
  - GPS
  - 4 DoF Arm (not pictured)
  - Intel Depth Sense camera (not pictured)

The aim was to build a vehicle that we could use to explore different simultaneous and localization (SLAM)
and mobile manipulation algorthims.

Agraj Jain based his Master's Thesis on doing [EKF SLAM with the vehicle](https://lnkd.in/etjQuDS).

It is now available as a [UGV product](http://www.farcotech.com/?q=content/ground-vehicles) at [Farco Technologies](http://www.farcotech.com).
