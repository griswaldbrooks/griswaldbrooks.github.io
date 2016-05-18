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

The robot consisted of:

  - Two degree-of-freedom PWM servo arm
  - Arduino
  - XBee
  - Laser distance sensor (1D)

The report on the project can be seen [here]({{site.baseurl}}/downloads/EL9223_Project2_Report_GriswaldBrooks.pdf).

The project code can be viewed [here](https://github.com/griswaldbrooks/rl-crawler).

This video shows a simulated crawler robot learning how to crawl via the Value Iteration algorithm with Epsilon Greedy exploration. The robot has no model of itself or its environment. It has a 2 degree-of-freedom arm to actuate itself and a sensor to detect how far it has traveled with the goal of travelling as far as it can.
The robot builds a value and policy map and eventually crawls off screen.

<iframe width="420" height="315" src="https://www.youtube.com/embed/h9N98rvSuw4" frameborder="0" allowfullscreen></iframe>
