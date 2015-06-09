var connected = false;
var chromeip = document.getElementById("chromecast-ip");
chromeip.addEventListener('keyup', function onkeyup(event) {
  if (event.keyCode == 13) {
    // Remove the newline.
    text = chromeip.value.replace(/(\r\n|\n|\r)/gm,"");
    self.port.emit("text-entered", text);
    chromeip.value = '';
  }
}, false);
// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing

self.port.on("show", function onShow() {
	chromeip.focus();
});

self.port.on("getChromeInformation", function getChromeInformation(data) {
	container = document.getElementsByClassName("chromecast-container")[0];
	
	container.innerHTML = '<li class="chromecast-item"><div class="chromecast-icon"></div><span class="chromecast-name">'+ data +'</span></li>';
	document.getElementsByClassName("chromecast-item")[0].addEventListener('click', function() { 
		connectToggle();
	}, false);
});

function connectToggle() {
    if (connected == false) {
       	connected = true;
        self.port.emit("chromecast-connect", true);
    } else {
    	connected = false;
        self.port.emit("chromecast-connect", false);
    }
}