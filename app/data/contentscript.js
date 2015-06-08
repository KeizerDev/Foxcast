'use strict';

var notification;
self.port.emit("update");


notification = document.createElement('div');
notification.textContent = 'Firefox Extension says: \'Allo \'Allo!';
notification.classList.add('hello-world');

document.body.appendChild(notification);

// stuff called on each udpate
self.port.on('include', function(){
  window.alert('injected');
});