# Foxcast
Making a Chromecast work on Firefox with this extension

## Goals:
- [x] Show name of Chromecast if exist on ip.
- [ ] Auto send youtube video if connected using a request like `curl -X POST -d 'v=yerwwZWXtdQ' http://ip:8008/apps/YouTube`.
- [ ] Create a similair layout/style as [this](https://lh3.googleusercontent.com/EkTIaGSPLZHBuEv9Dk7fDDG_Lt3kjJ1u9stXLvaZqMQsaMqbSp1-Gg06HC6UPALQFuBPypkimKo=s640-h400-e365).
- [ ] Autosearch for Chromecasts in network by implementing something similar like [this](https://github.com/xat/chromecast-scanner/blob/master/index.js).
- [ ] Add cast button to youtube player using a content script.
- [ ] Implementing better way for sending video's to youtube.
- [ ] Implementing support for more services.
- [ ] Implementing support for the Chromecast SDK.



## Build
Build with: 
``npm install & bower install`` 

To debug run:
``grunt run``

## Development
For development of this add-on you should also install the [Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).
Make sure to ``source bin/active`` in the add-on directory to activate paths to executables in your current terminal session.
  
  

### [Chromecast Implementation Documentation](https://github.com/jloutsenhizer/CR-Cast/wiki/Chromecast-Implementation-Documentation-WIP)
