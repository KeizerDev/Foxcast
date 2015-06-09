self.port.emit("update");

var notification;

notification = document.createElement('div');
notification.textContent = 'Firefox Extension says: \'Allo \'Allo!';
notification.classList.add('hello-world');

document.body.appendChild(notification);



// stuff called on each udpate
self.port.on('include', function(){
  	window.alert('injected');
	window.onpopstate = function(event) {
	  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
	};
});