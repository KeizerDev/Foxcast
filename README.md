# Foxcast
Use your chromecast within firefox with this extension. It uses the restfull [Chromecast-api](https://github.com/KeizerDev/Chromecast-api) to talk to the chromecast protocol, so you need to have that turned on in order to make this work. 

## Goals:
- [x] List chromecasts.
- [ ] Search one opening Foxcast
- [ ] Auto send YT video if connected using a request like `curl -X POST -d 'v=yerwwZWXtdQ' http://ip:8008/apps/YouTube`.
- [ ] Create a similair layout/style as [this](https://lh3.googleusercontent.com/EkTIaGSPLZHBuEv9Dk7fDDG_Lt3kjJ1u9stXLvaZqMQsaMqbSp1-Gg06HC6UPALQFuBPypkimKo=s640-h400-e365).
- [ ] Add cast button to youtube player using a content script.
- [ ] Implementing better way for sending video's to youtube.
- [ ] Implementing support for more services.
- [ ] Implementing support for the Chromecast SDK so you can use javascript apps. Now this must be implemented in the api AND in the extension.
- [ ] Make *Foxcast* standalone without [Chromecast-api](https://github.com/KeizerDev/Chromecast-api) 



## Build
Build with: 
``npm install & bower install`` 

To debug run:
``grunt run``

## Development
For development of this add-on you should also install the [Mozilla Add-on SDK](https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Installation).
Make sure to execute ``source bin/activate`` in the add-on directory to activate paths to executables in your current terminal session.
