---
title:  "Autopilot"
nobility: home
permalink: /projects/autopilot/
image: AP_top1_cropped.jpg
image_desc: "Autopilot version 2.3 with case."
project_desc: "Autopilot system designed for use with various mobile vehicles."
---

{% include home_picture.html picture_path='/_projects/autopilot/AP_top1.jpg' picture_desc='Dual processor autopilot.'%}

While working for [Farco Technologies](http://www.farcotech.com), I 
designed and implemented several embedded platforms that acted as the control system
for various mobile robots.
These [autopilots](http://www.farcotech.com/?q=content/autopilot-and-embedded-controls) were used to control 
[aerial]({{site.baseurl}}/projects/minq), [underwater]({{site.baseurl}}/projects/auv), and 
[ground vehicles]({{site.baseurl}}/projects/gmm).

I was responsible for the part selection, schematic design, PCB routing, and SMD fabrication of each system.
In addition to this, I wrote drivers and test software for each of these embedded systems to ensure
they were performing to design specifications.

In all, I produced three autopilot designs with the following features:  

  - [AP](http://www.farcotech.com/sites/default/files/FARCO-2ARM-12-1X.pdf)
    - Two 32-bit ARM processors
    - TTL and RS-232 Serial, I<sup>2</sup>C, CAN, PWM, ADC, DAC, GPIO
    - Configurable Op-Amp ADCs
    - IMU (3-axis Magnetometer, two 3-axis Accelerometer, 3-axis Gyro)
    - Temperature/Humidity Sensor
    - Pressure Sensors
    - SD Card
  - [MAP](http://www.farcotech.com/sites/default/files/FARCO-MAP-14-1X1.pdf)
    - Single 32-bit ARM processor
    - TTL Serial, I<sup>2</sup>C, PWM, ADC, GPIO
    - IMU (3-axis Magnetometer, 3-axis Accelerometer, 3-axis Gyro)
    - Pressure Sensor
    - Small foot print (less than 1 in<sup>2</sup>)
  - Autopilot and Quadcore Computer
    - AP with Quadcore ARM computer running Linux
    - USB, Display port, HDMI
    - Four port Ethernet switch


