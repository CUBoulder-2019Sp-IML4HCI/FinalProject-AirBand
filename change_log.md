# Change Log

## Gabe Chapel
#### Week 10
I experimented with the Microbit's radio signal strength measurement to see if this is a reasonable option for measuring distance between hands. I adjusted the transmit power to 2 (out of 7) to provide a more variable response and connected it to Wekinator through Processing. I used a linear regression model to train the data, and found that the signal strength is very noisy and very touchy. It depends heavily on the orientation of both Microbits and only changes reliably within about a foot. We could implement a filter to amplify the deviation in the high end of the results, or we could just try to use a Kinect.

#### Week 11
I began constructing the flex sensor glove to be used with the air guitar and keyboard. I organized the circuitry to be as unintrusive as possible and tested a single flex sensor. When soldering the first sensor, I made one mistake, so I should be able to make the protoboard about half the size it currently is.

#### Week 12
I finalized the prototype for the flex sensor glove, which has four flex sensors connected to a Microbit. Everything is currently taped to a glove, but we will need to implement a more secure fastening method to ensure that the sensors do not shift. We will also need to get gloves that form to the user's hand better, which may mean we need to design a more modular way to attach the sensors.

Connecting the Microbit to Wekinator yielded pretty reliable results, which I then transferred to the web app. We are using classification to determine whether the user's four fingers are up or down, so we can then attempt to play distinct notes.

## Jack DeMay
#### Week 10
I took another group's suggestion of using a 3 Microbit set up with 2 Microbits acting as transmitters and the third Microbit acting as a receiver connected to the computer via USB. While this is a viable configuration, using the radio signal strength to determine distance between the 2 transmitters is simply too noisy and we will most likely end up having to use a Kinect. I also started to modify the jean jacket we purchased on Saturday and am figuring out the best parts of it to incorporate sensors. This will likely be used for the air drummer and could potentially use a camera or an ultrasonic sensor attached to the chest to keep track of the drummer's arm position and movement.

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

## Bridget Murphy
#### Week 10
Last week I created some storyboards and scenarios to go along with our final proposal we turned in last week. I think it paints a good picture of what we want the experience to be like.  This week I messed around with Annie's signal strength library for the microbit. After talking with another group, we figured out we should change the signal strength, which defaults to a pretty high setting. I also emailed Annie and got an example for the library, which should help us moving forward. Next I would like to come up with a design to incorporate the microbits and gloves we purchased this weekend.

## Team
#### Week 9
We tested the Microbit magnetometer to determine whether it is a feasible option for measuring distance between hands and found that it is not strong enough to measure the distance we need. We also took a trip to Goodwill to pick up some rock-n-roll atire, including gloves and a denim jacket, which we will cut into a vest to fit various body types.

#### Week 10
We decided that we should start testing with a Kinect to detect larger, less abrupt motions that cannot be picked up by the Microbits, such as hand position for each instrument. We still plan to use embedded sensors, though for finger motion, kicks, and hand rotation.
#### YouTube: https://youtu.be/9BtmYQ0wrJI
