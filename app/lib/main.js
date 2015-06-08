'use strict';

/**
 * Enable dubug mode
 * This allow to console.log in a firefox default configuration
 */
require('sdk/preferences/service').set('extensions.sdk.console.logLevel', 'debug');

var data = require('sdk/self').data;
var { ToggleButton } = require('sdk/ui/button/toggle');
var { PageMod } = require('sdk/page-mod');
var { Panel } = require('sdk/panel');

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

popup.port.on("text-entered", function (text) {
  console.log(text);
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
    contentScriptWhen : 'start',
});