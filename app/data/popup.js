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
	exports.main = function() {
	    var Request = require("request").Request;
	    Request({
	      url: "http://google.com/",
	      content: {q: "test"},
	      onComplete: function (response) {
	        console.log(response.text);
	        
	      }
	    }).get();
	};
});

