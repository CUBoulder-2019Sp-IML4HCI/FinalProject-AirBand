# Final Proposal
Our idea is to give students and faculty the ability to play music together without any instruments. This project will expand upon the concept of the air guitar to a full air band: guitar, drumset, and keyboard. We will use various sensors and feature extraction techniques to make the air instruments sound authentic, corresponding to the users’ motions.

## Mission Statement
Our goal is to give people an embodied and interactive way to perform in an air band without the need for any musical instrument experience.  

## Challenges
Since we want to provide an authentic band experience for everyone, we aim to integrate all of the sensors into clothing, which will allow the users to embrace rock n roll fashion while tracking their motion. This introduces several challenges, however, since we will need to make the clothing adaptable to and comfortable for different body types. With regards to keeping people comfortable while they are performing, we will need to make the sensors as non-intrusive as we can with careful placement and fabrication. Along with this, we will also need to control all of the technical components wirelessly, so the users are not getting tangled up while they are playing. This will pose challenges specifically with wireless communication across various digital and analog elements, which actually coincides with the risks of failure discussed below.

## Technologies
The only technology we need to encompass all of the instruments is a set of speakers, which will most likely come from a computer and be controlled via a web application. Most of the technologies we need, though, depend solely on the instruments we are trying to simulate and are unique to each one.

### Guitar
For users to play the air guitar, we want to provide gloves or wristbands with embedded sensors to measure the acceleration of each hand and the distance between each hand. A Microbit would provide this functionality with its accelerometer and magnetometer, so we would need one for each hand and one to receive the wireless signals.

### Drums
The first thing we need for the air drums is a pair of drumsticks, to which we can attach colored tape or LEDs for position tracking. To track the position of each stick from the user’s own perspective, we want an RGB camera that can be integrated into a hat or pair of sunglasses. To identify the speed/force at which the user is striking the air drums, we also need an accelerometer for each drum stick. In order to include a kick drum in the kit, we also need a pressure sensor to attach to the user’s foot.

### Keyboard
As with the guitar, we will need accelerometers to measure the speed at which the user is moving his or her hands and magnetometers or ultrasonic sensors to measure the distance between hands. To track the horizontal position of the user’s hands, though, we will also want a Myo armband for one arm. We could use this in conjunction with a magnetometer to then measure the position of the other hand. 

### Backup
As a backup, specifically for tracking the motion of the drum and keyboard players, we want a Kinect. This would not be integrated into the users’ clothing but would allow us to monitor motion through a video feed rather than relying on individual wearable sensors.

## Documentation
Because we will creating wearables, we see a necessity in documenting our steps closely. The final project will include a blog post detailing the process and techniques used to create the wearables and also the code on Github. The combination of these materials will allow other people outside of the ATLAS community to make their air band.

## Risks of Failure
The main risks associated with this project are centered around the fabrication of the physical and digital elements of all of the instruments. Since each instrument uses several unique sensors, the data processing required to apply machine learning algorithms to all of the instruments will be intensive. To merely receive accurate data from all of the sensors will be a challenge as well and could determine whether this project is successful or not. 

## Ethical Questions
By creating these embodied interactions through clothing, we are limiting our user base to mobile people. In this way, we are discriminating interactions for those who may not be able to intricately move their fingers or arms. Though we see this as a limiting factor, we think that the work done to create these embodied wearables could lead to provoking ideas around accessibility for future work.


## Timeline
**Week 1:** Exploration of technology for wearables. For the first week we will be looking on the internet for different techniques to gather gesture, motion, and other sensory input within a wearable. Specifically, we will be focusing on techniques that allow the technology to feel fully integrated or hidden from the user. This exploration will also inform the list of materials we will need.

**Week 2-3:** We will start rapidly prototyping different sensors on some garments. Our goals will be to (1) start gathering information from the garment to send to the computer; (2) prototype different ways of integrating the sensors into the rock n roll outfits; and (3) analyze the data being received and start looking for trends that will be useful in future engineering.

**Week 4:** Choosing the instrument that seems to have the most reliable input data, we will start feature engineering to get our classes and regressions working reliably. At this point we will also discuss the interactive system that will accompany the project and play the instrument. A goal will just be it to play a couple different sounds based on the output.

**Week 5-7:** At this point team members will split up work to : (1) the tweaking of the application to have more robust interactions and play a song on the air instrument; (2) working on creating the other instruments and increasing their reliability; and (3) adding functionality to be user-end trainable for boundaries. 

**Week 8:** We reserve the last weeks to fine tune the system and allowing for extra time in case something ends up taking longer than we think.

## Stretch Goals
Some of our stretch goals include providing a modular system for left-handed and right-handed people and implementing a time-dependent audience response element. The modular system will allow left-handed and right-handed people to play the instruments how they are most comfortable playing and the audience element would be a positive or negative response to how well the band is playing together. 
