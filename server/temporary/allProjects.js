const rmiProjects = [
  {
    name: "AURA",
    description:
      "The aerial swarm robotics project represents a significant breakthrough in multi-agent systems, designed to execute complex tasks through precise coordination and synchronization. This project involves a swarm of five drones that ensure reliable operation in diverse environments. The system is anchored by a master drone that handles task allocation, coordination, and real-time communication with the slave drones, ensuring that the entire swarm operates as a unified entity.The drones are designed in an X-shaped quadcopter configuration, providing stability and maneuverability. Each drone is equipped with a flight controller, integrated with IMU and GPS sensors, along with ESP32S3 as a companion microcontroller. The communication between drones is handled through the ESP-NOW protocol, ensuring robust and reliable coordination.For localization, the swarm uses Extended Kalman Filter (EKF) algorithm that fuses IMU and GPS data, with the potential for differential GPS integration to enhance accuracy. The control strategy revolves around continuous position updates, velocity command computations, and real-time adjustments, allowing the drones to maintain formation and avoid collisions.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761130932/aura_rmi_qcdjmo.png",
        filename:"aura_rmi_qcdjmo"
    }
  },
  {
    name: "AURA_contd",
    description:
      "The swarm robots capability to adapt and coordinate makes them ideal for various applications, including search and rescue, 3D reconstruction, and smart agriculture.Aerial Swarm of five autonomous drones equipped with advanced sensor fusion and real-time communication, designed for seamless coordination and precision in complex task execution across diverse environments.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761131676/aura_rmi1_ey5bbq.png",
        filename:"aura_rmi1_ey5bbq"
    }
  },
  {
    name: "Medvisor",
    description:
      "MedVisor represents a groundbreaking advancement in healthcare technology, offering an innovative Augmented Reality (AR) solution in the form of smart glasses. Through the integration of Speech-to-Text conversion and a sophisticated Large Language Model (LLM), MedVisor empowers patients with access to precise and comprehensive answers to any medical query they may have. A voice recognition system using the Porcupine Wake Word engine and Assembly AI STT engine allows the user to ask questions, converting text to speech in real time. The text is transmitted over a socket connection to a server running locally on a smartphone, where a response is generated using the Gemini Large Language Model. By leveraging AR technology, MedVisor revolutionizes patient education by providing individuals with a dynamic and immersive learning experience.Through the use of smart glasses, patients can visualize organs superimposed on the human body, allowing for a deeper understanding of their medical conditions. This visual representation facilitates clearer communication between healthcare providers and patients, enabling individuals to make more informed decisions about their health and treatment options.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761131785/medvisor_rmi_r7n0qe.png",
        filename:"medvisor_rmi_r7n0qe"
    }
  },
  {
    name: "Medvisor_contd",
    description:
      "In the realm of immersive healthcare, MedVisor transforms the patient experience by offering real-time insights and visualizations of medical data directly within their field of view. This immersive approach fosters greater engagement and understanding, ultimately leading to improved patient outcomes and satisfaction.The applications of MedVisor extend beyond patient education, encompassing immersive healthcare experiences and enhancing surgical accuracy. MedVisor plays a pivotal role in improving surgical accuracy by providing surgeons with augmented visualizations and real-time information during procedures. By superimposing vital data onto the surgical field, MedVisor enhances situational awareness and decision-making, ultimately contributing to safer and more precise surgical interventions. In essence, MedVisor represents a transformative tool at the intersection of technology and healthcare, empowering both patients and healthcare providers with unprecedented capabilities for education, engagement, and procedural excellence.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761131939/medvisor_rmi1_yfs23p.png",
        filename:"medvisor_rmi1_yfs23p"
    }
  },
  {
    name: "Amphibian Bot",
    description:
      "Amphibious four-wheeled thruster robot capable of navigating both submerged environments and remote landscapes with the combination of robust design, advanced propulsion systems, and integrated sensor technologies.The multi-mode locomotion bot represents a groundbreaking advancement in robotic technology, offering unparalleled adaptability for disaster response, mapping, and exploration missions. Its modular design seamlessly integrates wheels and thrusters, allowing for effortless customization with peripheral modules tailored to specific tasks. Equipped with actuators at each joint, the bot dynamically configures its thrusters for fluid navigation across diverse environments, from land to water. Its precise control system enables seamless movement in any direction, ensuring precise maneuverability during critical missions.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761132135/amphibianBot_rmi_vzzxrc.png",
        filename:"amphibianBot_rmi_vzzxrc"
    }
  },
  {
    name: "Amphibian Bot _contd",
    description:
      "Utilizing four wheels for terrestrial traversal and four thrusters powered by high torque BLDC motors, the bot effortlessly transitions between land and water. A sophisticated engagement-disengagement mechanism, coupled with servo motors, facilitates smooth transmission, enhancing efficiency and speed. Engineered to withstand the rigors of underwater exploration, the bots robust body frame ensures durability and reliability at depth. The synergy between its propulsion system, actuation system, and transition mechanisms ensures seamless operation across varied terrains.In conclusion, the multi-mode locomotion bot offers unmatched versatility and efficiency, revolutionizing disaster response, mapping, and exploration endeavors with its groundbreaking capabilities.",

    year:2023,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761132199/amphibianBot_rmi1_oh9qrq.png",
        filename:"amphibianBot_rmi1_oh9qrq"
    }
  },
  {
    name: "ROV (Remotely operated underwater vehicle)",
    description:
      "Underwater robotic vehicle platform with optional ground control, designed to execute tests and missions at different levels of autonomy including testing of specialized payloads.This project aims to develop an underwater robotic vehicle platform with optional ground control to execute tests and missions at different levels of autonomy. This platform will be a testbed for hardware, algorithms, and specialized payloads to perform various underwater operations.An open-frame configuration is adopted for the vehicle structure to have better control authority at low speeds and allow modularity for a wide range of payloads. The vehicle structure was designed in SolidWorks, considering the resulting weight, buoyancy, and center of mass of all components and the assembly to ensure the vehicle is stable and slightly positively buoyant to make recovery easier in case of any major system malfunction. The vehicles frame was constructed using 0.75-inch UPVC pipes and fittings, and the joints were secured using fasteners",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761132683/rov_rmi_ljcbjc.png",
        filename:"rov_rmi_ljcbjc"
    }
  },
  {
    name: "ROV (Remotely operated underwater vehicle) _contd",
    description:
      "In the current design, there are 6 thrusters - 2 oriented in the vertical direction and 4 along the horizontal in a vector configuration. This provides the vehicle to perform translation along all 3 principal axes and rotation about two axes (roll and yaw). Pitch control can be achieved by adding 2 more thrusters in the vertical direction, and the vehicle frame was designed to consider this improvement. The propellers of the vehicle were adapted to be used with the available motors and were fabricated using fused deposition modeling (FDM).The hull (acrylic tube) houses all the onboard electronics and provides most of the vehicles buoyant force. Machined aluminum end caps and laser-cut acrylic end plates seal the hull. A watertight seal is achieved by machining appropriate grooves in the aluminum end caps to support O-rings. On the forward side, a clear dome provides a better field of view for the forward-facing camera. The camera feed implements computer vision algorithms on the Raspberry Pi for obstacle detection and collision avoidance, visual inspection of critical infrastructure to detect oil leaks and corrosion, and monitoring the marine ecosystem. The pan and tilt mechanism for the camera provides better control over the capture area.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761132683/rov_rmi2_lgb0vr.png",
        filename:"rov_rmi2_lgb0vr"
    }
  },
  {
    name: "ROV (Remotely operated underwater vehicle) _contd..",
    description:
      "The vehicle has an array of sensors including IMU, compass, and pressure sensor using which position and heading information can be obtained. This is used for the PID control algorithm for holding the depth and heading during manual operation. This system also allows to hold the position during the absence of any inputs from the operator to counteract any water currents. The battery, power electronics, motor drivers, and the processing units are the other important electronic components inside the hull.Since water is impervious to 2.4 GHz radio waves, a tether connects the vehicle to a floating buoy with a transceiver module for wireless communication with the ground station. This is however not needed for fully autonomous missions. The vehicle has a variety of safety features in case of any anomalies such as loss of signal, or leak in the hull, etc.The vehicle can perform a wide range of operations depending upon the payloads it carries. For instance, it can be used in conducting intelligence, surveillance, and reconnaissance operations. In addition to that, the vehicle can be equipped with mine countermeasure systems to detect, classify, and neutralize underwater mines.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761132855/rov_rmi1_ot7a3l.png",
        filename:"rov_rmi1_ot7a3l"
    }
  },
  {
    name: "VIRYA",
    description:
      "Mapping the terrain of an extra-terrestrial surface is crucial to the mission of space exploration. Unmanned vehicles are first sent to those surfaces to get information and determine if the outer body is a human exploration fit. Rovers are the go-to robots for space exploration,equipped with advanced navigation and manipulation capabilities.The proposed rover is a fully autonomous system traversing an unknown environment with the help of its sensors. Since the terrain of the extra-terrestrial surface is unfamiliar, the rover must be able to maneuver such terrains, making sure the main housing containing all the electronics is safe. This is achieved by designing and implementing a Rocker-Bogie suspension system that ensures the contact of 4-wheels at any point in time. The independence between the left and right wheels adds to the bots dynamic capabilities.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133073/virya_rmi_cgcoxa.png",
        filename:"virya_rmi_cgcoxa"
    }
  },
  {
    name: "VIRYA _contd",
    description:
      "Realsense depth camera, it can detect obstacles and craters along its path, traversing through them , depending on the size. Powered by Nvidia Jetson Orin, the rovers algorithms for crater and object detection, navigation, and pick-and-place operations are executed. These algorithms provide instructions to the microcontrollers within the arm system and drive system, which control motors,sensors and other components to execute tasks efficiently.The surface of outer space bodies can be mapped to a certain degree of accuracy with the help of Inertial Measurement Units (IMU), these measure linear and angular accelerations. The hardware filter DMP present in the IMU sensor is responsible for converting the acceleration values to displacement values. When placed on the wheels and the main chassis, these sensors can be compared to give the change in the depth of the terrain. The usage of LIDAR for terrain mapping is a future goal.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133072/virya_rmi.1png_nqi7rk.png",
        filename:"virya_rmi.1png_nqi7rk"
    }
  },
  {
    name: "Hexapod",
    description:
      "A six-legged bio-inspired bot with 18 DOF that can intelligently maneuver over harsh terrains and perform different analysis. The project aims to keep pace with current unmanned developments by using the potential of the hexapod due to its adaptability, versatility, mobility, and sensor integration capabilities in defense applications and planetary exploration by traversing challenging terrains on celestial bodies as well as in commercialization.Hexapod is a bio-inspired, six-legged multi-directional robot with 18 degrees of freedom capable of dynamic movement with precision. The bot has better maneuverability in rough, uneven terrains, and even climbs inclined surfaces with ease compared to conventional wheeled robots due to its stability and fault-tolerant ability. The basic design of a hexapod has a central body/chassis and six legs with eighteen servo motors.The method of inverse kinematics and Jacobian-based coordinate transformation are employed for movement of the bot. Various gait algorithms like tripod, ripple and wave are used depending on the kind of movement such as yaw, walk, climb, etc., The interchangeability in gait patterns depending on various terrains helps for smoother and steadier motion of the bot.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133294/hexapod_rmi_vbjtlv.png",
        filename:"hexapod_rmi_vbjtlv"
    }
  },
  {
    name: "Hexapod _contd",
    description:
      "Hexapod V1 (upgraded version) is designed in Fusion 360 considering the structural analysis and fabricated entirely by 3D printing using PLA material. V1 is made almost three times bigger than V0 in order to overcome the shortcomings of V0 such as high payload capacity, faster movement, and climb larger obstacles easily. V1 is equipped with Arduino MEGA, 60 kg cm RDS5160 servo motors, two Pololu mini-maestro servo controllers, a 20A buck converter, and a 22.2V, 5200mAh Li-Po battery. Digital touch feedback by attaching the contact switches to tips of the leg for dynamic obstacle climbing. A custom-made single layer PCB remote controller with NRF24L01 module is used for wireless communication with the bot with better user control for various navigation modes. Autonomous version of V1 is integrated with a KINECT camera to scan and create a 3D map of the surrounding environment, Jetson NANO for processing RGB data, and an LCD touch display. The step size of V1 is 8-24 cm, maximum speed is around 17 cm/s, and a run-time of 53 mins with a payload capacity of 15kgs.The capabilities of hexapods can be enhanced by integrating numerous peripheral modules for various tasks to achieve desired functionalities.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133294/hexapod_rmi1_znbz4k.png",
        filename:"hexapod_rmi1_znbz4k"
    }
  },
  {
    name: "QuaDro",
    description:
      "QuaDro is a fully automated quadcopter with capabilities of carrying out last-mile delivery using vision-based position control.Our solution proposes a fully automated quadcopter with capabilities of carrying out last-mile delivery in hard-to-reach regions. The drone shall be capable of carrying first aid kits, health and other medical supplies, with a maximum payload carrying capacity of about 700 grams.QuaDro uses location guided flight by means of GPS that will enable outdoor point-to-point navigation, that is, motion from one point to another without any remote controls.The drone also contains LiDAR capabilities for obstacle detection and altitude lock, to maintain a specific altitude from ground. 3-D space location lock using image processing functionalities to assist vision-guided position-control will be enabled in the drone. This feature is the most important feature in making the drone entirely autonomous. The visual guidance solely controls precise landing of the drone on an aruco marker and helps the drone position and orient itself accurately.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133431/QuaDro_rmi_sebegn.png",
        filename:"QuaDro_rmi_sebegn"
    }
  },
  {
    name: "Balancing bot",
    description:
      "The two-wheel self-balancing bot is a robotic platform that can be used in hospitals to assist medical staff in maneuvering through tight spaces and reduce the load on healthcare providers. The robot is designed to be lightweight, easy to operate, and equipped with advanced sensors and algorithms that allow it to maintain balance while moving around.In the medical sector, the self-balancing bot can be used to transport medical equipment and supplies,reducing the risk of injury to both the patient and the healthcare provider.The robot can be programmed to perform a range of tasks, such as monitoring patient vitals, delivering medications, and assisting with patient care.",

    year:2022,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133538/BalancingBot_rmi_ucdku1.png",
        filename:"BalancingBot_rmi_ucdku1"
    }
  },
  {
    name: "ANVI (Assistance in Navigation for the Visually Impaired)",
    description:
      "We developed this project to address the needs of millions of visually impaired people. The prototype provides audio instructions to the users based on the environment to enable them to understand better. It uses Deep learning models CLIP and LXMERT for image captioning and visual question answering. The models take an input image from a camera and output a text explaining the environment or answering the question posed by the user.This text is converted to audio and played in the headphone worn by the user. The image is captured from the wireless camera located on the headband and sent to the computation platform where the process mentioned above takes place. Several safety features are implemented via onboard sensors: fall detection, GPS tracking, and Obstacle detection.The MPU6050 is used to detect falls, and an email is sent to emergency contacts. The email contains the GPS coordinates of the person obtained from the GPS sensor. A Li-Po battery powers the entire system.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133735/anvi_rmi_fypw8m.png",
        filename:"anvi_rmi_fypw8m"
    }
  },
  {
    name: "ARIBOT (Autonomous Rail Inspection Bot)",
    description:
      "We propose a prototype that is a fully autonomous 4-wheeled robot, flexible in usage and installation, capable of detecting railway defects by performing various tests such as ultrasonic Nondestructive Test (NDT) for internal crack detection in rails and a 3D-laser profiling system for surface cracks, gauge length, and ballast profile inspection. The robot is also equipped with a machine vision system (camera) for anomaly detection in fasters and sleepers. Once inspection mode is turned on, our proposed system will autonomously inspect the track for defects, mainly in 4 profiles: Ballast, Rails, Sleepers, and Fasteners, checking for deviation from a standard profile by implementing the aforementioned methods.The bot is equipped with modules like GPS, odometer, and IMU sensors to locate and know the robots position and status respectively at any given time. All the inspection data, including ongoing data capture and defect location details, are constantly being sent and updated to a user-friendly web server. If any defect or anomaly is detected, the nearby base station is alerted in the webserver mentioned, and the Spatio-temporal coordinates, that is, time and location of defect and type of defect, are shared.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133854/aribot_rmi_sdaww7.png",
        filename:"aribot_rmi_sdaww7"
    }
  },
  {
    name: "LEWI (Localization and mapping of Enclosed space using Wi-Fi signals)",
    description:
      "we use the new theory of compressive sampling (also known by other terms such as compressed sensing, compressive sensing or sparse sensing) shows that under certain conditions, it is possible to reconstruct a signal from a considerably incomplete set of observations, i.e., with a number of measurements much less than predicted by the Nyquist-Shannon theorem.Hence, we propose our project LEWI, which stands for “Localization and mapping of Enclosed space using Wi-Fi signals”. Since the Wi-Fi signal has the ability to pass through objects and also decays through objects, we use this property to map the occluded objects. We use the new algorithm of compressive sensing to do the mapping by collecting only very little data. We can also determine the accurate position and shape of the obstacles, which helps in localization of occluded objects inside the enclosed space. Hence our proposed project does the mapping efficiently with minimum amount of measurements and also maps the objects occluded from the view.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761133971/lewi_rmi_zqtndj.png",
        filename:"lewi_rmi_zqtndj"
    }
  },
  {
    name: "SPARO (Spatial Augmentation and Reconstruction of Objects)",
    description:
      "3D reconstruction of real-world objects in virtual space finds various applications in scene rendering and self-driving cars for scene building and perception. This project aims to create editable 3D models of real-world objects using only a few images of the desired object. The project uses the concepts of Structure from Motion and Neural Radiance Fields to recreate the selected object in virtual space.The user inputs the images of the object. Structure from Motion is a concept that determines the relative position of the camera from the entity in consideration. The relative poses of the camera are calculated, and then the data is fed into the neural radiance network. The network outputs the colour RGB and opacity alpha of every voxel in the space. This data is used in the rendering equation, which renders the items volume in the 3D space.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134125/sparo_rmi_i6c4hm.png",
        filename:"sparo_rmi_i6c4hm"
    }
  },
  {
    name: "SPS (Smart Parking System)",
    description:
      "Parking has always been an issue in metropolitan cities. This calls for a streamlined approach through which people can easily find and park their vehicles close to their destinations.Our Smart Parking System (SPS) uses low-cost camera modules installed at multiple parking lots across the city and streams live images to the corresponding remote server. The remote server processes the data from the camera module and decides on the number of vacant parking spaces available in the parking lot.The remote server updates the number of vacant and filled parking slots in a cloud database. The number of vacant parking slots and their location are displayed in a web application accessible to the general public and free to use. The database is updated continuously, ensuring a pristine user experience.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134337/sps_rmi_ya2xcm.png",
        filename:"sps_rmi_ya2xcm"
    }
  },
  {
    name: "SSC (Sign to Speech Convertor)",
    description:
      "People with speech disabilities and or who have difficulties talking rely on sign language and gestures to communicate. Our solution to this involves a sign language-to-speech converter device that can read the signs and gestures of a person and convert them to simple speech. Most people with speech disabilities are acquainted with sign language, which acts as the systems input. Based on finger movements and the angular position of the hands, the signs can be decoded into specific words and fed to a speaker with a custom voice set.Our device uses signs and gestures as input. We use flex sensors and inertial measurement units (IMU) to obtain the input signals properly. These input signals are used to decode the word/content for communication. For tracking gestures, the IMU data is used to predict the angle of the hand. The indicated data/content is then fed to audio output based on the pre-set voice. The entire system is battery powered, which makes it mobile and unrestrictive.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134454/ssc_rmi_jwaeua.png",
        filename:"ssc_rmi_jwaeua"
    }
  },
  {
    name: "STAR (System for Tracking Animals using Radar)",
    description:
      "This project proposes the use of Frequency Modulated Continuous Wave radar to send and analyze signals to detect and estimate respiration and heartbeat frequencies. Being capable of measuring vital signs(through non-contact methods) and having a wider ﬁeld, it is more advantageous than the existing alternatives.Simulations for heartbeat and respiration rate were modelled in MATLAB. It was also figured out that this radar technology also had applications in motion tracking, contour detection, area scanning, etc. The hardware from Texas Instruments, IWR6843AOPEVM, was utilized in this project. Many guides, videos and articles were referred for understanding its working and the potential it holds.Works are still being held by RMI members in this project.",

    year:2021,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134574/star_rmi_osbxls.png",
        filename:"star_rmi_osbxls"
    }
  },
  {
    name: "Automated Trolley",
    description:
      "The availability of trolleys at the right place in airports and shopping centres is a big concern for authorities today. It often requires a substantial human force and energy to have a smooth running system at all times.The automated trolley is a computerised system that returns to its parking point without any human intervention after being used by a customer. This project involves a tensor-based approach with machine learning to predict and track population in an indoor environment to detect locations with lesser population densities across space and time to achieve a more reliable navigation mechanism in a dynamic environment like an airport.A bird-eye camera is used both during the offline (data collection) and online phases to obtain population distribution at a particular instant in time.",

    year:2020,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134829/automatedTrolley_rmi_uhc0d9.png",
        filename:"automatedTrolley_rmi_uhc0d9"
    }
  },
  {
    name: "CHAOS (Crop Harvesting Automated and Optimal Solution)",
    description:
      "Automation is an important current trend and development in the field of agriculture. Like the manufacturing industry, agriculture also involves routine and monotonous tasks.CHAOS is an intelligent and efficient robotic system that uses a camera feed to identify ripe crops using Image Processing algorithms. A Robotic manipulator (4DOF) with a soft gripper as its end effector is then used to pluck the crop using Inverse Kinematics.",

    year:2020,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761134922/chaor_rmi_znmgy7.png",
        filename:"chaor_rmi_znmgy7"
    }
  },
  {
    name: "HIDQ (Hybrid Inspection Drive Quadcopter)",
    description:
      "This project focuses on building an efficient and innovative solution to this inspection problem. A convertible hybrid drive quadcopter is manually controlled to move across inaccessible places as a drone or a 4-wheeler convertible using a self-transforming mechanism. It is equipped with a camera to inspect various industrial systems and check for defects and anomalies using Machine Learning and Image Processing algorithms on the controller side. BLDC motors are used to power both the wheels and the propellers in each mode.Variable sprawl angles using self-locking gears are put to use to change the dimension of the bot to the required arena/space. Automated crack and rust detection is also performed using integrated Image processing and Deep Learning using Convolutional Neural Networks.The convertible bot can be used to inspect various systems of industries like a chimney, ventilation systems, HVAC, pressurized tanks, boilers, or any confined space to detect leakage, corrosion, cracks and other structural defects and anomalies.",

    year:2020,
    image:{url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761135041/hidq_rmi_zr2hfg.png",
        filename:"hidq_rmi_zr2hfg"
    }
  },



];

const threeDProjects=[
    {
        name:"VTOL",
        description:"We have analysed and categorised existing VTOL solutions. Using this knowledge we are in the design phase of our own VTOL aircraft with the major objectives of payload operations (point to point delivery/drop zone delivery) and surveillance operations (Search and rescue, Mapping, Land monitoring, filming/photography, photogrammetry etc.).We aim to achieve these objectives by making our aircraft efficient in hover, transition and horizontal flight combined.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761138581/vtol_3d_ewkpnh.png",
            filename:"vtol_3d_ewkpnh"
        }
    },
    {
        name:"VKAT (Von Karman Aeroelastic Turbine)",
        description:"We designed a bladeless turbine using the principles of Fluid-Structure Interaction to extract clean energy from the Vortex-Induced Vibration of a bluff body in a low-velocity fluid (Von Karman Effect). We determined the ideal dimensions and working conditions of the bluff body by fluid simulation.We designed the method of energy extraction and the final product with multiple smaller units to scale up the energy output",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761138581/vkat_3d_zxjb3m.png",
            filename:"vkat_3d_zxjb3m"
        }
    },
    {
        name:"Mid Flight Reconfiguration Drone",
        description:"The main limitations of a drone is the flight time of the drone, ie the time taken for the power source (usually a battery) to reduce from its full capacity to the minimum required to land the drone without any damage. Any alteration or modification that is imparted in the drone is done so keeping in mind to solely increase this parameter called flight time.The drone that we have proposed here also has a similar goal. The proposed drone would be one that can be configured between a quad(4 rotors) , hexa(6 rotors) and octa(8 rotors). These varying configurations would enable the drone to carry payloads of varying capacity and accordingly increase flight time.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761138581/midFlightReconfigurationDrone_gwbotn.png",
            filename:"midFlightReconfigurationDrone_gwbotn"
        }
    },
    {
        name:"Stationary glider",
        description:"The primary Aim of the project is to build a vertical Take-off and Landing (VTOL) craft specifically targeted for usage in the military purposes of surveillance and transportation of medical goods.In this project we seek to eliminate the standard limitations faced by existing UAVs and to extend the boundaries of its usage.Unlike other VTOLs this product is detachable and detachable which helps in de-centralised manufacturing. This Product uses only a pair of motors which cut downs the power consumption.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761138581/stationaryGlider_3d_dntqpz.png",
            filename:"stationaryGlider_3d_dntqpz"
        }
    },

]

const psiProjects=[
    {
    name:"ATV Electric",
    description:"We are a team of students spanning all four years of college education and all departments united by a shared love: the love for automobiles. This results in a close-knit team that is as efficient as it is excellent and we are the official motorsports team of NIT Trichy. This has led us to be part of the top teams in India and we are among the top 5 teams in Baja SAEINDIA and Enduro Student India for the past 2 years. We have also achieved multiple podium place finishes in Enduro Student India.\nSUSPENSION: The suspension and steering subsystem evaluates, analyses and designs the suspension arms, shock absorber settings, wheel mounting knuckles and the steering-related components. The suspension subsystem is needed to ensure that the maximum power and torque is transmitted to the ground. The steering subsystem gives the driver directional control.\nBRAKES: The brakes subsystem calculates, designs, and fabricates the brakes that are needed to stop the vehicle or to maintain control in the off-road driving scenario. The brakes are designed taking into account the tire pressure, wheel speed and acceleration and must completely lock the wheels as part of the technical inspection.",
    year:2023,
    image:{
        url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761147413/atv_electric_psi.py_fanr30.png",
        filename:"atv_electric_psi.py_fanr30"
    }
    },
    {
    name:"ATV Electric _contd ",
    description:"CHASIS: The chassis subsystem evaluates, designs and fabricates a tubular frame chassis that serves two purposes; it provides a stable and secure mounting for all the other components that are designed by the other subsystems and protects the driver in case of a rollover or accident. The chassis design is a fine balance between achieving the required safety conditions while also keeping weight to a minimum.\nData Acquisition: The data acquisition (DAQ) subsystem prototypes and tests different sensors and telemetry systems that continuously monitor and evaluate the performance and condition of the vehicle. This is used during both the testing and evaluation phase and during the competition itself to maintain various parameters at the optimal working range.\nPowertrain: The powertrain subsystem is responsible for the design and the elements that put down the engine power to the road. The source is a standardized 10HP engine that is connected to the wheels through a CVT and a fixed-ratio reduction gearbox. The CVT allows the driver to concentrate fully on the track by automatically shifting and acts as a clutch at idle.",
    year:2023,
    image:{
        url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761147534/atv_electric_psi1_jdttuz.png",
        filename:"atv_electric_psi1_jdttuz"
    }
    },

]

const dataByteProjects=[
    {
        name:"Question and answer generation",
        description:"DataByte is the data science and business analytics club at NIT Trichy. The team is dedicated to fostering a deep interest in specialized fields such as business analysis and computational finance. Through active discussions and the facilitation of advanced data handling techniques, DataByte cultivates a rich environment for students to explore and excel in these niche areas.\nThis project focuses on developing AI models that can automatically generate relevant questions and accurate answers from textual data. It explores natural language processing techniques to enhance educational tools and customer support systems.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155745/qn_and_ans_generation_db.py_pf0ty5.png",
            filename:"qn_and_ans_generation_db.py_pf0ty5",
        }
    },
    {
        name:"AI interviewer",
        description:"This initiative aims to create an AI-driven interviewer that can simulate realistic interview scenarios, assess candidate responses, and provide feedback. It combines machine learning and natural language processing to assist in recruitment and skill assessment.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155730/aiInterviewer_baro35.png",
            filename:"aiInterviewer_baro35",
        }
    },
    {
        name:"Protecting children from hateful content",
        description:"This project is dedicated to building AI systems that detect and filter out hateful or inappropriate content from online platforms to protect children. It leverages sentiment analysis and content moderation algorithms to create safer digital environments",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155744/protectingChildren_mcbjvt.png",
            filename:"protectingChildren_mcbjvt",
        }
    },
    {
        name:"Image background removal",
        description:"This project focuses on developing machine learning models that can accurately remove backgrounds from images, enabling applications in e-commerce, graphic design, and virtual reality. It explores computer vision techniques for seamless background extraction.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155730/bagroundRemoval_m9saec.png",
            filename:"bagroundRemoval_m9saec",
        }
    },
    {
        name:"India case studies",
        description:"This initiative analyzes various business and societal challenges within India using data analytics and machine learning. It provides insights into case studies across sectors like healthcare, finance, and education to drive informed decision-making.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155729/indiaCaseStudies_a52nbi.png",
            filename:"indiaCaseStudies_a52nbi",
        }
    },
    {
        name:"Practical DSA",
        description:"This project is aimed at applying data structures and algorithms (DSA) to real-world problems, enhancing coding efficiency and problem-solving skills. It offers hands-on experience with practical coding challenges to prepare for competitive programming and technical interviews.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761155744/practicalDSA_db_eeiziq.png",
            filename:"practicalDSA_db_eeiziq",
        }
    },
    
]

const forceHyperloopProject=[{
    name:"name1",
    description:"Force Hyperloop is the official Hyperloop team of the National Institute of Technology, Tiruchirappalli (NIT Trichy). Driven by innovation and the vision to revolutionize transportation in India, the team consists of dedicated students from various disciplines. With a focus on cutting-edge technology, interdisciplinary collaboration, and hands-on experience, Force Hyperloop is at the forefront of developing high-speed transportation solutions.\nThe team actively participates in global competitions and research initiatives, pushing the boundaries of engineering and design to make sustainable, energy-efficient, and rapid transit systems a reality in India.",
    year:2023,
    image:{
        url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761156038/name1_forceHyperloop_rn8dj4.png",
        filename:"name1_forceHyperloop_rn8dj4"
    }
}]

const ecellProjects=[
    {
        name:"Social media education project",
        description:"There is a lack of awareness on our campus on basic startup-related topics. By making the basic management concepts easy and understandable by everyone, We hope to make starting up accessible to everyone.\nAs such we are using different social media and experimenting with different forms of content to reach as many students as possible and to enable them to understand complex business topics. We have received positive feedback from various stakeholders including college students, professional managers from the industry and the luminaries we highlight in our posts.\nThe following are some of the examples of how we leveraged social media and meme culture to teach the basics of business management and entrepreneurship.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761156417/socialMediaEduc_ecell_peta87.png",
            filename:"socialMediaEduc_ecell_peta87"
        }
    }
]

const everProjects=[
    {
        name:"AUTO SELECTION OF AVAILABLE PHASE IN 3- PHASE SUPPLY SYSTEM",
        description:"EVER is a team of NIT Trichy students dedicated to developing Electric Vehicles and promoting Electric Mobility. The team provides a real-world work environment with the goal of racing homegrown EVs in student-level competitions. EVER is more than just a racing team; it's a community. The projects offer a platform to showcase and test innovative ideas and technologies.\nThis project aims at delivering a system that provides uninterrupted power supply to the load even in the absence of any phase in a three phase supply system. In this system auto selection is achieved by using a set of relays interconnected in such a way that if one of the relays is feeding to the load remains energized always.",
        year:2023,
        image:{
            url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761156417/autoSelectionIn3Phase_ever_zkarqc.png",
            filename:"autoSelectionIn3Phase_ever_zkarqc"
        }
    }
]

const dcProjects=[
  {
    name:"WALL-E",
    description:"Our product is a station-based device with has 2 arms on each side which are controlled by 3 motors with encoders. The assembly translates along a lead screw. It is capable of doing a variety of exercises including active and passive exercises. The exercises are regulated using an Arduino Mega unit.\nWALL-E is a one-of-a-kind product in the market. There is no limitation on the age of the user. It can be coded to have various different types of exercise. Also, it can be used independently by the user without any need for external supervision.",

    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207147/wallE_dc_cpttad.png",
      filename:"wallE_dc_cpttad"
    }
  },
  {
    name:"AUTOCATH",
    description:"Our device consists of a pinching valve mechanism which closes and opens the valve based on the pressure measurement of urine in the bladder through a specialised pressure sensor. Some of the major advantages of this product are its retrofit abilities in the existing catheter system and longer uses. Moreover, this device doesn’t need any human intervention which is a major concern with the existing devices",

    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/autoCath_dc_ecaxhr.png",
      filename:"autoCath_dc_ecaxhr"
    }
  },
  {
    name:"RAMP",
    description:"Presenting to you, Retro-Ramp, a low-cost, low effort device for wheelchair users to climb staircases conveniently and effortlessly. Retro-Ramp achieves ascent and descent with the help of a foldable platform, mounted on a set of railings and pulled by a motor-driven chain hoist. The device can be easily retrofitted in existing buildings and public places and can be easily accessed by wheelchair, thus empowering them to move independently and confidently",

    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/ramp_dc_dwwvil.png",
      filename:"ramp_dc_dwwvil"
    }
  },
  {
    name:"The fource",
    description:"An economical and easy-to-use cleansing system to maintain the hygiene level of toilets. The device cleans the bowl and surroundings with minimal human intervention.",

    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/fource_dc_cunioa.png",
      filename:"fource_dc_cunioa"
    }
  },
  {
    name:"Bolts of duty",
    description:"An autonomous landscaping device that adjusts blades according to terrain and collects scrap in a disposable bag.",

    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207145/boltsOfDuty_dc_ntb2jk.png",
      filename:"boltsOfDuty_dc_ntb2jk"
    }
  },
  {
    name:"ATOM",
    description:"An efficient and cost-effective unmanned delivery system capable of transporting goods and services to hostels and other departments in an institute to streamline the process of delivery of such goods and services.",

    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207145/atom_dc_ahc404.png",
      filename:"atom_dc_ahc404"
    }
  },
  {
    name:"Trichy drifters",
    description:"Ideation, design, and fabrication of a robust remote-controlled hovercraft capable of climbing a ramp of 20 deg incline. It also had a ball-picking mechanism retrofitted onto it to pick and drop objects.",

    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207147/trichyDrifters_dc_szaxet.png",
      filename:"trichyDrifters_dc_szaxet"
    }
  },
  {
    name:"Ioniflow",
    description:"Ioniflow is a novel EV battery thermal management solution that optimizes performance and lifetime by leveraging an emerging cooling technology.",

    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/ioniflow_dc_u52iy0.png",
      filename:"ioniflow_dc_u52iy0"
    }
  },
  {
    name:"LeProC",
    description:"Designed with precision grooves and fortified with surface treatments, our clamp for radiator to engine pipes ensures secure locking mechanisms for advanced reliability.",

    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/leProC_dc_j1zsuv.png",
      filename:"leProC_dc_j1zsuv"
    }
  },
  {
    name:"Neogenesis",
    description:"It aims to capture excess carbon emissions from air in urban areas. It uses Selective Pressure Swing Adsorption.",

    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207146/neogenesis_dc_tqb2iz.png",
      filename:"neogenesis_dc_tqb2iz"
    }
  },
  {
    name:"REC-Tube",
    description:"It is a semi automated rubber recycling machine that transformers discarded bicycle inner tubes into practical products such as pouches.",

    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761207147/recTube_dc_qsukqh.png",
      filename:"recTube_dc_qsukqh"
    }
  },

  

]
const spiderProjects=[
  {
    name:"SECURISE",
    description:"Developed an Automatic Number Plate Recognition System for our college campus that logs entrance and exit of vehicles • Designed a vehicle data extraction pipeline from the ground up, using a FasterRCNN implementation with Resnet101 for vehicle data extraction • Working on implementing a frontend and backend to relay data between the camera and the system.",
    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208745/securise_spider_shv6ta.png",
      filename:"securise_spider_shv6ta"
    }

  },
  {
    name:"RECAL UAE Admin portal",
    description:"Admin Portal for the Alumni Association UAE Chapter. Handles data updation, deletion and provides analytics on the data of RecalUAE.",
    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208745/recalUAEAdminPortal_spider_om7v1b.png",
      filename:"recalUAEAdminPortal_spider_om7v1b"
    }

  },
  {
    name:"Document requisition portal",
    description:"The system aims to provide an easy experience for students to request approval on certificates. A unified portal allows both students and administrators to log in using institute credentials to either send or approve requests. The portal handles all the required student information, forms, and receipts to make the process as streamlined as possible for administrators. Functionality is provided for administrators to approve/reject requests in a single click and view student information and required documents on a single interface.",
    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208743/documentRequistionPortal_spider_qdydve.png",
      filename:"documentRequistionPortal_spider_qdydve"
    }

  },
  {
    name:"Happy hunt challenge",
    description:"Happy Hunt Challenge is a PWA React Application built for a Scavenger Hunt game conducted by Event Specials in Pune. The app has 1500+ users who need to solve missions (clues) scattered all over Pune. The website has two portals, one for the Admin and another for end-users. The admin portal has features like auto evaluation, admin evaluation, adding or updating the missions, feed control, etc. The end-user interface consists of a portal to check clues and submit answers to the clues after reaching a particular location. If their submissions are accepted, then the players are awarded points, and their submissions get auto-posted in the feed, where other players can react to it by liking or sharing. The project uses the MERN stack.",
    year:2022,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208744/happyHunt_spider_udf7jx.png",
      filename:"happyHunt_spider_udf7jx"
    }

  },
  {
    name:"WatchTower",
    description:"Watch Tower is an immersive open-world game designed to promote cyber-hygiene. Participants explore NITT's campus and complete tasks that teach real-life cyber-attacks and hone their security skills.",
    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208754/watchTower_spider_bap0p3.png",
      filename:"watchTower_spider_bap0p3"
    }

  },
  {
    name:"Gym and pool registration",
    description:"This is a web project that aims to simplify the registration process for the techno gym and the swimming pool.",
    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208744/gymAndPool_spider_pp7hax.png",
      filename:"gymAndPool_spider_pp7hax"
    }

  },
  {
    name:"Autonomous drone navigation",
    description:"This project focuses on advanced autonomous drone navigation using ArUco markers.",
    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208744/autonomousDroneNav_spider_jg40qc.png",
      filename:"autonomousDroneNav_spider_jg40qc"
    }

  },
  {
    name:"Sportsfete",
    description:"A web project for Sportsfete, an intra-college sports fest.",
    year:2023,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208746/sportsFete_spider_cknz1k.png",
      filename:"sportsFete_spider_cknz1k"
    }

  },
  
  {
    name:"Spider robotic arm",
    description:"Spider Robotic arm is the ultimate teleoperation companion!",
    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208744/roboticArm_spider_nku7of.png",
      filename:"roboticArm_spider_nku7of"
    }

  },
  {
    name:"UHUGV",
    description:"UHUGV is an amphibious robot designed to navigate across both land and underwater environments.",
    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208753/uhugv_spider_wqurfa.png",
      filename:"uhugv_spider_wqurfa"
    }

  },
  {
    name:"90nm 8T Subthreshold SRAM Design",
    description:"A 90nm 8T subthreshold SRAM design for ultra-low power memory operation.",
    year:2024,
    image:{
      url:"https://res.cloudinary.com/dsppzymyc/image/upload/v1761208755/subthresholdSRAM_spider_plsbjg.png",
      filename:"subthresholdSRAM_spider_plsbjg"
    }

  },

  
]
module.exports={
  rmiProjects,
  threeDProjects,
  dataByteProjects,
  psiProjects,
  forceHyperloopProject,
  everProjects,
  ecellProjects,
  spiderProjects,
  dcProjects
}