# (H)Air Band: A Proposal
By: Gabe Chapel, Jack DeMay, Mikhaila Friske, Bridget Murphy

Our idea is to give students and faculty the ability to play music together without any instruments. This project will expand upon the concept of the air guitar to a full air band: guitar, drumset, and keyboard. We will use various sensors and feature extraction techniques to make the air instruments sound authentic, corresponding to the users’ motions. 

## Mission Statement
Our goal is to give people an embodied and interactive way to perform in an air band without the need for any musical instrument experience. We want the user to feel as if the music is coming out of thin air via their playing of their air instrument. Thus, we want to create wearables where the technology is as integrated as possible, to keep the experience as authentic as possible.

## Challenges
Since we want to provide an authentic band experience for everyone, we aim to integrate all of the sensors into clothing, which will allow the users to embrace rock n roll fashion while tracking their motion. This will also allow the project to take place anywhere, since not static equipment is required. However, this also introduces several challenges, since we will need to make the clothing adaptable to and comfortable for different body types. With regards to keeping people comfortable while they are performing, we will need to make the sensors as non-intrusive as we can with careful placement and fabrication. Along with this, we will also need to control all of the technical components wirelessly, so the users are not getting tangled up while they are playing. This will pose challenges specifically with wireless communication across various digital and analog elements, which actually coincides with the risks of failure discussed below.

## Scenarios
Three friends are waiting for class to start in the ATLAS lobby. They decide to pass the time by performing an air concert for themselves and their fellow students. 

![band members](/images/bandmembers.png "Band Members")
From left to right: Joe is an avid guitar player and volunteers to play the guitar; Katie doesn't know how to play any instruments but that's okay, her friend Joe suggests she play the keyboard; Travis is a big music fan and a beginner drummer, so he decides he will play the drums; And together, the three friends will play a show in the ATLAS lobby to entertain themselves and the other students.

![wearables](/images/wearables.png "Band Wearables")
Joe and Katie will use gloves embedded with micro:bits and flew sensors to track their movements. Travis will wear a cool vest with RGB cameras installed in it to track his movements while he wears colorful gloves.

## Technologies
The only technology we need to encompass all of the instruments is a set of speakers, which will most likely come from a computer and be controlled via a web application. To make the sound louder, a user can connect bluetooth speakers to their computer and the web application. Due to the large quantity of data that we will receive from each instrument, we also plan to provide a computer per instrument. Most of the technologies we need, though, depend solely on the instruments we are trying to simulate and are unique to each one.

### Guitar
The first instrument we aim to construct is the air guitar. For users to play the air guitar, we want to provide gloves or wristbands with embedded sensors to measure the acceleration of each hand and the distance between each hand. A Microbit would provide this functionality with its accelerometer and magnetometer, so we would need one for each hand and one to receive the wireless signals through radio frequencies. To measure finger motions, we also want to test flex sensors to determine how precise the output is. These flex sensors can be connected to the pins on the Microbit on the user’s left hand.

### Keyboard
Since the sensors used to create an air keyboard are similar to the guitar, we will move to the keys after ensuring the air guitar works correctly. As with the guitar, we will need accelerometers to measure the speed at which the user is moving his or her hands and magnetometers or ultrasonic sensors to measure the distance between hands. This functionality can, once again, be provided by a pair of Microbits, plus a third to receive data over radio connection. To track the horizontal position of the user’s hands, we will first try to use one of the Microbits, but if this is not accurate enough, we will use a Myo armband for one arm. We could use this in conjunction with a magnetometer to then measure the position of the other hand.

### Drums
Since drums involve a larger space and more varied motions, they will require a sensor dissimilar to those used with the guitar and keys, so we will approach this instrument last, once the other two are functional. To remain faithful to the nature of air instruments, we will not use drumsticks, but instead provide a pair of gloves, to which we can attach colored tape or LEDs for position tracking. To track the position of each glove from the user’s own perspective, we want an RGB camera that can be integrated into a hat or pair of sunglasses and track to the colors attached to the gloves. We have found a camera with this functionality called the Pixy 2, which can be connected to a Raspberry Pi via USB for wireless communication across a WiFi network. This will also help with processing efficiency, since the camera and the Pi can perform some of the image processing before sending data to the computer. To identify the speed/force at which the user is striking the air drums, we also need an accelerometer for each glove. These can, again, be Microbits, so we can send data over radio frequencies. In order to include a kick drum in the kit, we will use another Microbit strapped to a user’s foot.

### Backup
As a backup, aside from a Myo armband and specifically for tracking the motion of the drum and keyboard players, we want a Kinect. This would not be integrated into the users’ clothing but would allow us to monitor motion through a video feed rather than relying on individual wearable sensors. Additionally, if we cannot get the flex sensors to work with the guitar gloves, we will try to use magnets.


## Documentation
Because we will creating wearables, we see a necessity in documenting our steps closely. The final project will include a blog post detailing the process and techniques used to create the wearables. The link to the blog post as well as the code will be on a public facing Github repository (in addition to the IML4HCI repository). The combination of these materials will allow other people outside of the ATLAS community to make their air band.

## Risks of Failure
The main risks associated with this project are centered around the fabrication of the physical and digital elements of all of the instruments. Since each instrument uses several unique sensors, the data processing required to apply machine learning algorithms to all of the instruments will be intensive. We see these possible risks of failure:

1. Reading this much data into separate computers will cause a challenge in producing output that appears synced up and allows the band to play together.
2. Since we are looking for specific motions and relying on consistent placement of the sensors within the wearables. Dealing with noise from users wearing the equipment slightly differently will mean our system will need to be robust to work for multiple users. 
3. Using the compass/magnetometer in the micro:bit comes with challenges due to its placement on the device. This means we will have to put in work with feature engineering to minimize noise from those readings.
 

## Ethical Questions
By creating these embodied interactions through clothing, we are limiting our user base to mobile people. In this way, we are discriminating interactions for those who may not be able to intricately move their fingers or arms. Though we see this as a limiting factor, we think that the work done to create these embodied wearables could lead to provoking ideas around accessibility for future work.


## Timeline
**Week 8:** Exploration of technology for wearables. For the first week we will be looking on the internet for different techniques to gather gesture, motion, and other sensory input within a wearable. Specifically, we will be focusing on techniques that allow the technology to feel fully integrated or hidden from the user. This exploration will also inform the list of materials we will need.

**Week 9-10:** We will start rapidly prototyping different sensors on some garments. Our goals will be to (1) start gathering information from the garment to send to the computer; (2) prototype different ways of integrating the sensors into the rock n roll outfits; and (3) analyze the data being received and start looking for trends that will be useful in future engineering.

**Week 11-12:** Choosing the instrument that seems to have the most reliable input data, we will start feature engineering to get our classes and regressions working reliably. At this point we will also discuss the interactive system that will accompany the project and play the instrument. A goal will just be it to play a couple different sounds based on the output.

**Week 13-14:** At this point team members will split up work to : (1) the tweaking of the application to have more robust interactions and play a song on the air instrument; (2) working on creating the other instruments and increasing their reliability; and (3) adding functionality to be user-end trainable for boundaries. 

**Week 15:** We reserve the last week to fine tune the system and allowing for extra time in case something ends up taking longer than we think.

## Stretch Goals
Some of our stretch goals include providing a modular system for left-handed and right-handed people and implementing a time-dependent audience response element. The modular system will allow left-handed and right-handed people to play the instruments how they are most comfortable playing and the audience element would be a positive or negative response to how well the band is playing together. We may also add more fidelity into the motion of the air guitarist’s fingers.
