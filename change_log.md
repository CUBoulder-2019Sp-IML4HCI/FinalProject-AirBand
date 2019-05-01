# Change Log

## Gabe Chapel
#### Week 10
I experimented with the Microbit's radio signal strength measurement to see if this is a reasonable option for measuring distance between hands. I adjusted the transmit power to 2 (out of 7) to provide a more variable response and connected it to Wekinator through Processing. I used a linear regression model to train the data, and found that the signal strength is very noisy and very touchy. It depends heavily on the orientation of both Microbits and only changes reliably within about a foot. We could implement a filter to amplify the deviation in the high end of the results, or we could just try to use a Kinect.

#### Week 11
I began constructing the flex sensor glove to be used with the air guitar and keyboard. I organized the circuitry to be as unintrusive as possible and tested a single flex sensor. When soldering the first sensor, I made one mistake, so I should be able to make the protoboard about half the size it currently is.

#### Week 12
I finalized the prototype for the flex sensor glove, which has four flex sensors connected to a Microbit. Everything is currently taped to a glove, but we will need to implement a more secure fastening method to ensure that the sensors do not shift. We will also need to get gloves that form to the user's hand better, which may mean we need to design a more modular way to attach the sensors.

Connecting the Microbit to Wekinator yielded pretty reliable results, which I then transferred to the web app. We are using classification to determine whether the user's four fingers are up or down, so we can then attempt to play distinct notes.

#### Week 13
I constructed another flex sensor glove so we can begin testing an air keyboard. I plan to run the output through Wekinator to determine whether or not we can reliably identify finger motion for two hands with minimal latency. I can then begin relating specific finger motions to specific sounds.

## Jack DeMay
#### Week 10
I took another group's suggestion of using a 3 Microbit set up with 2 Microbits acting as transmitters and the third Microbit acting as a receiver connected to the computer via USB. While this is a viable configuration, using the radio signal strength to determine distance between the 2 transmitters is simply too noisy and we will most likely end up having to use a Kinect. I also started to modify the jean jacket we purchased on Saturday and am figuring out the best parts of it to incorporate sensors. This will likely be used for the air drummer and could potentially use a camera or an ultrasonic sensor attached to the chest to keep track of the drummer's arm position and movement.

#### Week 11
Once we obtained the Microsoft Kinect we ordered, I began attempting to connect to it and operate it through Mac OSX. Although we were advised to use this feature extractor on Windows, every member of our group has a Mac and also another team in our class already had success with Kinect + OSX leading me to believe it is feasible. After a lot of trial and error and the installation of various drivers and MacPorts, I was successful in getting live video from the Kinect on my desktop. This was done with a command 'freenect-glview' in the terminal once I had cloned and installed the repo from an open-sourced Kinect project called 'Open Kinect'. The Kinect can do IR video as well as depth view. I now need to figure out how to generate/read OSC messages from the Kinect video stream and also how to get it to recognize human figures so we can start integrating it into the Air Band. 

#### Week 12

After updating my computer I am no longer able to get a live video stream from the Kinect. I had OSC messages briefly figured out prior to this happening but I need to get this fixed ASAP if we are to move forward with the Kinect.

## Mikhaila Friske
#### Week 9
Microbit for keyboard work. I started trying to use the acceleration from the micro:bit to try and get the point where the it would know when you are moving down. However, because it is acceleration and not velocity it was not working as well as I hoped (or really at all). I started to play around with the events of the micro:bit (like on shake) and messing around with putting a delay so it would "flip a switch" when it is shook to trigger a class in wekinator.

I got shake to work a little bit, messing with the delay to get it so there is time for a second shake but that the number will flip to 1 long enough to send a message.

#### Week 10
The on shake event made me think that the drum kick could use one of those events to flip a switch. I used the on 3g event and it seemed to work very well. (Included in the video)

#### Week 11
Working on the web application. Got a simple MVC set up using javascript and Ben's OSC to SocketIO code from github and a tutorial on MVC in javascript. Tested with a simple XY plane classification. Currently plays a sound when class is 1. Functionality tested: wekinator communicating with the application. The communication between model, view, and controller in /drum. TODO: communication to wekinator from the app for training purposes.

#### Week 12
Connected the application to the kick drum wekinator project. Worked on debriefing teammates with the application and how it works. Goals for the weekend: look into getting the application to communicate with wekinator for training data.

#### Week 13
Got the application talking with wekinator and also got serial port to read into the node server. Worked on having a micro:bit being read and sent to wekinator from app and then having app update based on output data. You may now play the A and B buttons as well as the 3G event on a micro:bit that is plugged in.

Next steps: Look into setting up the way the user will train the models and working on making one instrument viable for showcase. 

#### Week 14
Getting the application in a working state with the webcam. Work on manipulating the webcam data to have it be able to pick out the colors of the finger sweaters. I also crocheted a bunch of finger sweaters for the gloves.

#### Week 15
Work through the write up and put some final touches on the application to make it work a little more reliably (and fixing some of the bugs with the space, left, right controls)

## Bridget Murphy
#### Week 10
Last week I created some storyboards and scenarios to go along with our final proposal we turned in last week. I think it paints a good picture of what we want the experience to be like.  This week I messed around with Annie's signal strength library for the microbit. After talking with another group, we figured out we should change the signal strength, which defaults to a pretty high setting. I also emailed Annie and got an example for the library, which should help us moving forward. Next I would like to come up with a design to incorporate the microbits and gloves we purchased this weekend.

#### Week 11 and 12
I worked on creating a drum kit with three microbits, one for each stick as well as the kick drum we already had. Originally I tried to create a regression model for all three of the microbits so we could use it to control the volume at which each drum sound plays, however since we didn't have the specifics of the sounds figured out, I decided to just create a classification project which indicates when a drum has been hit. I wasn't able to accomplish this just yet because of some issues with the three microbits communicating at the same time. I did not have the correct code on the microbit and was trying to send messages from all three without prefixes which made them hard to interpret.

I also put together the demo video for week 11

#### Week 13
I was able to solve my microbit problems with some help from Gabe, who did something similar for his gloves. We were abe to get the microbits to only send signals when they sense the 3g motion which should help with the speed of the overall app. The next step is to connect what I have with the app and javascript file and then see if I can get some sound going. I also put the video together for week 13.

#### Week 14
This week I shifted focus to help with setup for the expo and to work on documentation for the final report. I helped edit some of the proposal to make it final report ready and then proofread after Gabe's edits. The whole group presented at the ATLAS Expo, which went well. We had lots of people visit and try out the project. I created a graphic to show how all of our technologies connect to one another. I demonstrated the gloves for our demo video and did some voice over for the final demo.

## Team
#### Week 9
We tested the Microbit magnetometer to determine whether it is a feasible option for measuring distance between hands and found that it is not strong enough to measure the distance we need. We also took a trip to Goodwill to pick up some rock-n-roll atire, including gloves and a denim jacket, which we will cut into a vest to fit various body types.

#### Week 10
We decided that we should start testing with a Kinect to detect larger, less abrupt motions that cannot be picked up by the Microbits, such as hand position for each instrument. We still plan to use embedded sensors, though for finger motion, kicks, and hand rotation.
#### YouTube: https://youtu.be/9BtmYQ0wrJI

#### Week 11

#### Youtube: https://youtu.be/31yHij-xtwE

#### Week 12
We decided to focus on just one instrument for the Expo, either the drums or the keyboard. Since these both use the Kinect in similar ways, we can start with either one and then narrow it down after solidifying Kinect functionality.
#### Youtube: https://www.youtube.com/watch?v=NQNC5pPA1v8
