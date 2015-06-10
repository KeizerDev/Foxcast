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
var thisIp;

const drivers = [
    require("./youtube")
];
// Structure of https://github.com/lejenome/html5-video-everywhere/blob/master/lib/main.js

var chromecastConnection = false;

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
        url: "http://192.168.0.134:8008/apps/YouTube",
        content: "v=jlHZ_Z8sUMs",
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




for (let driver of drivers) {
    if (driver.match === void(0))
        continue;
    var pageMod = PageMod({
        include: driver.match,
        contentScriptFile: driver.inject.map(i => data.url(i)),
        contentScriptWhen: driver.when || "ready",
        onAttach: onWorkerAttach
    });
}

function listener(event) {
    var channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
    var url = event.subject.URI.spec;
    for (let driver of drivers) {
        for (let redirect of(driver.redirect || [])) {
            if (redirect.src.test(url)) {
                channel.redirectTo(Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService).newURI(
                    String.replace(url, redirect.src, redirect.funct),
                    null,
                    null));
                console.log("Redirect:", url);
                return;
            }
        }
        for (let block of(driver.block || [])) {
            if (block.test(url)) {
                channel.cancel(Cr.NS_BINDING_ABORTED);
                console.log("Block:", url);
                return;
            }
        }
    }
}



function onWorkerAttach(worker) {
    console.log("onAttach", worker);
    //send current Addon preferences to content-script


    // Why isn't this the same as curl -d "v=g93mz_eZ5N4" http://192.168.0.134:8008/apps/YouTube
    worker.port.on("yt-castvid", function(id) {
        console.log(id + " - " + thisIp + "'v="+ id + "'");
        if (chromecastConnection == true) {
            Request({
                url: "http://" + thisIp + ":8008/apps/YouTube",
                content: "v="+ id,
                contentType: "Content-Type: application/x-www-form-urlencoded",
                onComplete: function (response) {
                    console.log("request done" + response.status + " - " + response.statusText + " - " + JSON.stringify(response.headers));
                }
            }).post();
        }
    });




    let _prefs = {};
    for (let pref in prefs)
        _prefs[pref] = prefs[pref];
    worker.port.emit("preferences", _prefs);
    add(workers, worker);
    worker.on("detach", function(e) {
        remove(workers, this);
    });
}

