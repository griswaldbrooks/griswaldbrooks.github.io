+++
title = "📖 cv"
+++
[Download Resume](/files/Griswald-Brooks-Resume.pdf)

* [Education](#education)
* [Skills](#skills)
* [Experience](#experience)
* [Research](#research)

# Education <a name="education"></a>
---

## [NYU School of Engineering](http://engineering.nyu.edu/)

Masters of Science in Electrical Engineering
May 2015 | Brooklyn, NY
Concentration in Controls and Robotics

Bachelors of Science in Computer Engineering
May 2013 | Brooklyn, NY
Cum Laude

## [Lakes Region Community College](http://www.lrcc.edu/)
Associate of Science in Computer Technologies
Dec 2009 |  Laconia, NH
President's List


# Skills <a name="skills"></a>
---

## Programming
C/C++, Python, Rust, Javascript, Matlab

## Build Systems
Colcon, CMake, Github Actions, JFrog, Bitbucket, Jenkins

## Operating Systems
ROS2, Linux, QNX, FreeRTOS

## Electronic Design
EagleCAD, Circuit Design, PCB Design, SMD Soldering

## Mechanical Design
Solidworks, 3D Printing, Machining, Plastic Casting

## Misc
Rviz, V-REP, Stage, Gtest, Catch2, Git, Github, Stash, Conan, Docker, Virtualbox, LaTeX, AWS, inOrbit, Optitrack

# Conferences and Professional Development
---

## CppCon Robotics and AI Track Chair (2023-2025)
Chaired track. Responsibilities included soliciting talks, advising speakers, reviewing submissions, and scheduling the track.

# Patents & Intellectual Property

- **Conversion of cleaning robot camera images to floorplan for user interaction**  
  *U.S. Patent No. 10,638,906 B2 (Granted May 5, 2020)*  
  Method for projecting and stitching images captured from robot vacuum onto a map of a user's floor.

- **Asynchronous Image Classification**  
  *Patent Application Pending, US 2018/0348783 A1 (Filed May 31, 2017)*  
  Method for using off-robot processing to classify unidentified obstacles which are later added to the map. 

# Experience <a name="experience"></a>
---

## [**PickNik Robotics**](https://picknik.ai/) | Senior Robotics Engineer
Boulder, CO | Fully Remote | Feb 2021 - Present

- Led internal teams and individually contributed to multiple client contracts, including
    - Technical lead for poultry monitoring mobile robot, improving navigation stack performance and reliability. Creating simulation testing infrastructure integrated into CI to prevent regression.
    - Technical lead for medical patient tracking app. Integrated prototype indoor ultra-wideband positioning system.
    - Developed terrain profile switching system for [Guanaquerx quadruped robot](https://www.guanaquerx.com/).
    - Implemented image stitching node for stereo camera system on quadruped robot.
    - Onsite support for strawberry picking robot. Travelled to client site and helped remote team with testing and collecting data. Troubleshot state machine and concurrency issues.
    - Implemented continuous integration systems for autonomous truck unloading, medical robotics, construction robotics.
- Mentored junior engineers on best practices and software design. Solicted CppCon Robotics Track submissions and assisted with presentation development.
- Attended ROSCon (2022/2023) and promoted PickNik's runtime and developer platform, MoveIt Pro.
- Technologies used: C++, Python, Rust, ROS2, MoveIt2, Nav2, Git, Gtest, Catch2, GitHub Actions, Jfrog, Bitbucket, Gazebo

## [**Bossa Nova Robotics**](http://bossanova.com/) | Senior Robotics Engineer
Mountain View, CA | May 2018 - Feb 2021
- Led navigation stack refactor, improving test coverage and code quality. Formalized ROS-less programming strategies, producing faster and more robust tests.
- Migrated next generation robot to more robust local planner, avoiding robot stuck situations and allowing navigation closer to obstacles.
- Solved navigation field issues stemming from costmap race conditions, lingering state, goal mismatches, and trajectory critics. This supported the scaling of the fleet from 50 to 350 robots.
- Designed and implemented navigation traceability and observability monitors enabling engineers to get targeted bag data of an event quickly, obviating the large downloads and manual correlation previously required.
- Built ground truth label collection system, used to compare results to robot scans for experimental label detector. Reduced collection time from 30 to 8 minutes per aisle, requiring only one operator from two.
- Technologies used: TOF/LIDAR, C++, Python, ROS, Git, Gtest, Jenkins, inOrbit, Optitrack

## [**Neato Robotics**](https://www.neatorobotics.com/) | Robotics Software Engineer
Newark, CA | July 2016 – May 2018

- Improved docking reliability. Refactored infrastructure producing documented unit tested code. Implemented new features.
- Evaluated multiple tof/stereo cameras. Recorded sample datasets used for technology selection. Interfaced with vendors on requirements.
- Spearheaded automated on-robot testing program. Built infrastructure for fleet command and monitoring using existing cloud infrastructure.
- Fulfilled team level release engineering duties. Tested incremental builds using testing on-robot program. Released builds to SQA, beta testers, and production.
- Technologies used: LIDAR, C++, Python, Javascript, QNX, Git, Stash (Bitbucket), Jenkins, AWS, Gtest.

## [**Fetch Robotics**](http://fetchrobotics.com/) | Robotics Engineer
San Jose, CA | July 2015 – Apr 2016

- Developed algorithms for LIDAR-based tracking of people and mobile robots using EKF.
- Authored dynamically loadable modular EKF library using ROS pluginlib.
- Increased robustness of robot charge docking system through improvements in perception, navigation, and recovery behaviors.
- Conducted peer code reviews and maintained code base using git and github tools.
- Technologies used: Computational Geometry, EKF, C++, Python, ROS, Git, LIDAR.

## [**Farco Technologies**](http://www.farcotech.com/) | Robotics Engineer
Brooklyn, NY | May 2012 – Jun 2015

  - Wrote unit testing code and peripheral driver libraries in C.
  - Designed proprietary autopilot systems using EDA software used for multiple autonomous vehicles.
  - Designed chassis, shells, and housings in Solidworks and had them produced using multiple rapid prototyping and traditional machining techniques.
  - Integrated and tested autonomous vehicle electronics and mechanisms.
  - Technologies used: Linear Filters, C, EDA, CAD, ARM, IMU, UART, I2C, CAN, Op Amps.

## [**Control/Robotics Research Lab at NYU**](http://crrl.poly.edu/) | Lab Manager
Brooklyn, NY | Jan 2014 – Jun 2015

  - Managed teaching and research lab equipment selection and purchasing.
  - Assembled and repaired lab electronics related to robotics research.
  - Coordinated lab availabilities, presented lab to prospective students/parents, and operated equipment demos.
  - Technologies used: Nao, LIDAR, Quadrotors, Quadrupeds, 4DoF Arm, Depth Camera.

## [**Control/Robotics Research Lab at NYU**](http://crrl.poly.edu/) | Teaching Assistant
Brooklyn, NY | Jan 2014 – Dec 2014

  - Planned and delivered student lectures on experimental procedures and theory.
  - Administered experiments, graded student reports, and wrote lab final examinations.
  - Conducted Feedback Control and Embedded Systems lab courses.
  - Technologies used: PID, Lead-Lag Controllers, C, Motors, Amplifiers, Encoders.

## [**City of Laconia**](http://www.cityoflaconianh.org/) | Junior Network Administrator
Laconia, NH | Oct 2008 – Dec 2009

  - Administered, supported, and troubleshot Active Directory policy and permissions for local and remote sites.
  - Successfully managed full life cycle design and development of new City website.
  - Spearheaded development and implementation of policies, procedures and guidelines providing instruction on operation and usage of Web site’s content management system.

## [**US Navy**](http://www.navy.com/) | Electronics Technician
Various Locations | Sep 2001 – Dec 2007

  - Performed installation, repair, and maintenance of communications equipment while supervising and mentoring teams of junior technicians.
  - Drove design and development of wireless LAN comprised of seven access points and three gateways.
  - Played crucial role in design, testing and implementation of unicast and multicast protocols via a satellite WAN.

# Research <a name="research"></a>
---

## [**Control/Robotics Research Lab at NYU**](http://crrl.poly.edu/) | Brooklyn, NY
Graduate Research Assistant | Jan 2014 – Jul 2015

  - Developed novel inverse kinematics crawling gait for Nao Humanoid Platform.
  - Implemented cost-based potential field navigation using LIDAR mounted on Nao.
  - Wrote gradient descent-based inverse kinematics solver for out-of-workspace end effector pose objectives.
  - Implemented basic object detection and classification regressors using low-cost LIDAR.
  - Technologies used: Inverse Kinematics, Numerical Optimization, Potential Field Navigation, Linear Regression, C++, Matlab, Python, LIDAR, Sonar, Nao.
