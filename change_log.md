# Change Log

## Gabe Chapel
#### Week 10
I experimented with the Microbit's radio signal strength measurement to see if this is a reasonable option for measuring distance between hands. I adjusted the transmit power to 2 (out of 7) to provide a more variable response and connected it to Wekinator through Processing. I used a linear regression model to train the data, and found that the signal strength is very noisy and very touchy. It depends heavily on the orientation of both Microbits and only changes reliably within about a foot. We could implement a filter to amplify the deviation in the high end of the results, or we could just try to use a Kinect.

## Jack DeMay
#### Week 10
I took another group's suggestion of using a 3 Microbit set up with 2 Microbits acting as transmitters and the third Microbit acting as a receiver connected to the computer via USB. While this is a viable configuration, using the radio signal strength to determine distance between the 2 transmitters is simply too noisy and we will most likely end up having to use a Kinect. I also started to modify the jean jacket we purchased on Saturday and am figuring out the best parts of it to incorporate sensors.

## Mikhaila Friske
#### Week 9
Microbit for keyboard work. I started trying to use the acceleration from the micro:bit to try and get the point where the it would know when you are moving down. However, because it is acceleration and not velocity it was not working as well as I hoped (or really at all). I started to play around with the events of the micro:bit (like on shake) and messing around with putting a delay so it would "flip a switch" when it is shook to trigger a class in wekinator.

I got shake to work a little bit, messing with the delay to get it so there is time for a second shake but that the number will flip to 1 long enough to send a message.

The on shake event made me think that the drum kick could use one of those events to flip a switch. I used the on 3g event and it seemed to work very well. (Included in the video)

## Bridget Murphy

## Team
#### Week 9
We tested the Microbit magnetometer to determine whether it is a feasible option for measuring distance between hands and found that it is not strong enough to measure the distance we need. We also took a trip to Goodwill to pick up some rock-n-roll atire, including gloves and a denim jacket, which we will cut into a vest to fit various body types.

#### Week 10
We decided that we should start testing with a Kinect to detect larger, less abrupt motions that cannot be picked up by the Microbits, such as hand position for each instrument. We still plan to use embedded sensors, though for finger motion, kicks, and hand rotation.
