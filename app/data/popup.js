var connected = false,
    devicesContainer = document.getElementsByClassName("chromecast-container")[0];

// var chromeip = document.getElementById("chromecast-ip");
// chromeip.addEventListener('keyup', function onkeyup(event) {
//   if (event.keyCode == 13) {
//     // Remove the newline.
//     text = chromeip.value.replace(/(\r\n|\n|\r)/gm,"");
//     self.port.emit("text-entered", text);
//     chromeip.value = '';
//   }
// }, false);
// Listen for the "show" event being sent from the
// main add-on code. It means that the panel's about
// to be shown.
//
// Set the focus to the text area so the user can
// just start typing

self.port.on("show", function onShow() {
	chromeip.focus();
});

function connectToggle() {
    if (connected == !connected) {
        connected = !connected;
        self.port.emit("chromecast-connect", true);
    } else {
      connected = !connected;
        self.port.emit("chromecast-connect", false);
    }
}

/*
* Some listeners
*/

// Search for chromecasts
document.getElementById("search-chromecasts").onclick = function() {
  self.port.emit("search_chromecasts");
  devicesContainer.innerHTML = '<li>Loading...</li>';
}

// Search for chromecasts
document.getElementById("search-chromecasts").onclick = function() {
  self.port.emit("search_chromecasts");
  devicesContainer.innerHTML = '<li>Loading...</li>';
}

self.port.on("search_chromecasts", function getChromecasts(data) {
  data.list.forEach(function(chromecast){
    devicesContainer.innerHTML = '<li class="chromecast-item"><div class="chromecast-icon"></div><span class="chromecast-name">'+ chromecast +'</span></li>';
    document.getElementsByClassName("chromecast-item")[0].onclick = function(e) {
      console.log(e)
    };
  });
});

