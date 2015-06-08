'use strict';

/**
 * Enable dubug mode
 * This allow to console.log in a firefox default configuration
 */

 // 192.168.0.134
require('sdk/preferences/service').set('extensions.sdk.console.logLevel', 'all');

var data = require('sdk/self').data;
var {Cc, Ci} = require('chrome');
var { ToggleButton } = require('sdk/ui/button/toggle');
var { PageMod } = require('sdk/page-mod');
var { Panel } = require('sdk/panel');
var Request = require("sdk/request").Request;
// var parser = Cc.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.interfaces.nsIDOMParser);

var popup = Panel({
    contentURL: data.url('popup.html'),
    contentScriptFile: data.url('popup.js'),
    onHide: function () {
        button.state('window', {checked: false});
    }
});

// Show the popup when the user clicks the button.
function handleClick(state) {
    if (state.checked) {
        popup.show({
            position: button,
            width: 250,
            height: 150
        });
    }
}

popup.port.on("text-entered", function (ip) {
    Request({
        // url: "http://" + ip + ":8008/ssdp/device-desc.xml",
        url: "http://www.w3schools.com/dom/books.xml",
        content: {q: "test"},
        onComplete: function (response) {
            var doc = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser).parseFromString(response.text, "application/xml");
            console.log(doc.getElementsByTagName("title")[0].childNodes[0].nodeValue);
        }
    }).get();
});

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

// Create a content script
var pageMod = PageMod({
    include: /^http[s]*\:\/\/.*youtube.com\/.*/, // all urls
    contentScriptFile: [data.url('contentscript.js')],
    contentStyleFile: [data.url('contentstyle.css')], 
    onAttach: function(worker){
        worker.port.on('update', function(){
            console.log('update from contentscript');
            worker.port.emit('include'); // call the script update
        });
    },
    contentScriptWhen : 'start'
});