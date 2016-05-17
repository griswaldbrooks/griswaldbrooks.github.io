---
title:  "MINQ"
nobility: home
permalink: /projects/minq/
image: minq_cropped.jpg
image_desc: "Mini Quadrotor"
project_desc: "Small quadrotor platform for experimentation with estimation and control algorithms."
---

{% include home_picture.html picture_path='/_projects/minq/minq.jpg' picture_desc='MINQ'%}

The miniature quadrotor (MINQ) was an undergraduate quadrotor project by
[Anderson Zago](https://www.linkedin.com/in/anderson-zago-3779b499/en) that I advised.
I was also responsible for hardware integration.
The quadrotor was built as a platform to develop control and estimation algorithms.
The vehicle was equipped with:

  - [Miniature autopilot]({{site.baseurl}}/projects/autopilot)
  - Optical flow camera
  - Sonar
  - IMU
  - Bluetooth

The vehicle was controlled via bluetooth and used a gain scheduled PID controller in conjunction with its
IMU to stabilize flight. It also used its downward facing sonar to control its height and optical flow
sensor to control linear velocity.

A report on the project written by Anderson Zago can be viewed [here](https://www.dropbox.com/sh/spw4l4zrakuchyr/AADre1Aa0g3NoMs2XDog1j9za/MINQ%20Final%20Report.pdf?dl=0).

It is now available as a [UAV product](http://www.farcotech.com/?q=content/aerial-vehicles) at [Farco Technologies](http://www.farcotech.com).
