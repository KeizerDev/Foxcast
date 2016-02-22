'use strict';

/**
 * Enable dubug mode
 * This allow to console.log in a firefox default configuration
 */

// var data = require('sdk/self').data;
// var {Cc, Ci} = require('chrome');
// var { ToggleButton } = require('sdk/ui/button/toggle');
// var { PageMod } = require('sdk/page-mod');
// var { Panel } = require('sdk/panel');
// var Request = require("sdk/request").Request;
var thisIp;

// Structure of https://github.com/lejenome/html5-video-everywhere/blob/master/lib/main.js

var popup = Panel({
    contentURL: data.url('popup.html'),
    contentScriptFile: data.url('popup.js'),
    onHide: function () {
        button.state('window', {checked: false});
    }
});

// Show the popup when the user clicks the button.
function handleClick(state) {
    Request({
        content: "v=jlHZ_Z8sUMs",
        contentType: "application/json",
        url: "http://192.168.0.134:8008/apps/YouTube",
        onComplete: function (response) {
            console.log("request done" + response.status + " - " + response.statusText + " - " + JSON.stringify(response.headers));
        }
    }).post();

    if (state.checked) {
        popup.show({
            position: button,
            width: 330,
            height: 200
        });
    }
}

// Create a button
var button = ToggleButton({
    id: 'show-popup',
    label: 'Foxcast',
    icon: {
        '16': './images/icon-16.png',
        '32': './images/icon-32.png',
        '64': './images/icon-64.png'
    },
    onClick: handleClick
});


popup.port.on("text-entered", function(ip) {
    Request({
        url: "http://" + ip + ":8008/ssdp/device-desc.xml",
        content: {q: "test"},
        onComplete: function (response) {
            thisIp = ip;
            var doc = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser).parseFromString(response.text, "application/xml");
            console.log(doc.getElementsByTagName("device")[0].getElementsByTagName("friendlyName")[0].childNodes[0].nodeValue);
            popup.port.emit("getChromeInformation", doc.getElementsByTagName("device")[0].getElementsByTagName("friendlyName")[0].childNodes[0].nodeValue);
        }
    }).get();
});

popup.port.on("chromecast-connect", function(connected) {
    if (connected == true) {
        chromecastConnection = true;
        button.icon = {
            '16': './icons/icon48.png',
            '32': './icons/icon128.png',
            '64': './icons/icon128.png'
        };
    } else {
        chromecastConnection = false;
        button.icon = {
            '16': './images/icon-16.png',
            '32': './images/icon-32.png',
            '64': './images/icon-64.png'
        };
    }
});
