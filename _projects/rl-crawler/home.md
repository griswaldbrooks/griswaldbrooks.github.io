---
title:  "Reinforcement Learning Crawler"
nobility: home
permalink: /projects/rl-crawler/
image: rl-crawler_cropped.jpg
image_desc: "Crawler"
project_desc: "Basic Reinforcement Learing Crawling Robot."
---

{% include home_picture.html picture_path='/_projects/rl-crawler/rl-crawler.jpg' picture_desc='Crawler'%}

As a graduate project for my Reinforcement Learning class, I decided to build the 
[classical reinforcement learning crawling robot](http://www.tokic.com/www/tokicm/crawlingrobot.php.html).
The canonical system consists of a two-degree-of-freedom arm, a passive base, and some sensor
that can be used to tell the robot if it has moved and generally in what direction.
The robot has an arm with such low degrees of freedom in order to keep the dimensionality
of the state-space low and make trivial RL algorithms tractable.

The robot I build had:

  - Two degree-of-freedom PWM servo arm
  - Arduino
  - XBee
  - Laser distance sensor (1D)

The report on the project can be seen [here]({{site.baseurl}}/downloads/EL9223_Project2_Report_GriswaldBrooks.pdf).

The project code can be viewed [here](https://github.com/griswaldbrooks/rl-crawler).
