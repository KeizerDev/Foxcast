'use strict';

/**
 * Enable dubug mode
 * This allow to console.log in a firefox default configuration
 */

var data = require('sdk/self').data;
var ToggleButton = require('sdk/ui/button/toggle').ToggleButton;
var Panel = require('sdk/panel').Panel;
var Request = require("sdk/request").Request;
var thisIp, chromecastConnection;
/*
* Elements
*/
var popup = Panel({
    contentURL: data.url('./popup.html'),
    contentScriptFile: data.url('./popup.js'),
    onHide: function () {
        button.state('window', {checked: false});
    }
});

var button = ToggleButton({
    id: 'show-popup',
    label: 'Foxcast',
    icon: {
        '16': './images/icon-16.png',
        '32': './images/icon-32.png',
        '64': './images/icon-64.png'
    },
    onClick: openPopup
});


/*
* Listeners
*/
function openPopup(state) {
    if (state.checked) {
        popup.show({
            position: button,
            width: 330,
            height: 200
        });
    }
}

var api = {
    searchEndpoint: function() {
        return "/devices"
    },
    searchCallback: function(response) {
        popup.port.emit("search_chromecasts", response.json);
    },
    mediaEndpoint: function(chromecast, url) {
        return "/devices/" + chromecast + "/media/" + url
    },
    mediaCallback: function(url) {
        console.log(response.json)
    }
}

popup.port.on("search_chromecasts", function() {
    Request({
        url: "http://127.0.0.1:5000" + api.searchEndpoint(),
        onComplete: api.searchCallback
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
