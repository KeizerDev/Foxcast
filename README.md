# Foxcast
Use your chromecast within firefox with this extension. It uses the restfull [Chromecast-api](https://github.com/KeizerDev/Chromecast-api) to talk to the chromecast protocol, so you need to have that turned on in order to make this work. 

## Goals:
- [x] List chromecasts.
- [ ] Create a similair layout/style as [this](https://lh3.googleusercontent.com/EkTIaGSPLZHBuEv9Dk7fDDG_Lt3kjJ1u9stXLvaZqMQsaMqbSp1-Gg06HC6UPALQFuBPypkimKo=s640-h400-e365).
- [ ] Add a cast button to the youtube player using a content script.
- [ ] Implementing support for the Chromecast SDK so you can use javascript apps. Now this must be implemented in the api AND in the extension.
- [ ] Make *Foxcast* standalone without [Chromecast-api](https://github.com/KeizerDev/Chromecast-api) 


## Build

First you need to have the [Chromecast-api](https://github.com/KeizerDev/Chromecast-api) started and running.

Then start with installing the dependencies for this project using:
```
$ npm install 
```

And serve the app with:
```
$ grunt
```
