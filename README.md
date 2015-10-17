# SelectionSpeaker
Read selected text out loud.

Text to speak functionality is already built in Chrome and no extension is needed. It's surprising that there's no keyboard shortcut just to read out loud what's selected. This micro project allows you to take your eyes off the screen.

Source: I stole the code from Stack Overflow and wrapped it to make a bookmark

1. In Chrome open your bookmarks tab (Command / Ctrl + Shift + B)

2. Select the long text below and drag it to your bookmarks tab - a new bookmark 'READ SELECTED' will appear

3. Go to any website and select some text

4. Click on the new bookmark to read the text out loud

# Select and drag this to your bookmarks bar

javascript:'READ SELECTED';(function() {    'use strict';    var voices = window.speechSynthesis.getVoices();    var sayit = function() {        var msg = new SpeechSynthesisUtterance();        msg.voice = voices[2];        msg.voiceURI = 'native';        msg.volume = 1;        msg.rate = 1.25;        msg.pitch = 0.7;        msg.lang = 'en-GB';        msg.onstart = function(event) {            console.log('started');        };        msg.onend = function(event) {            console.log('Finished in ' + event.elapsedTime + ' seconds.');        };        msg.onerror = function(event) {            console.log('Errored ' + event);        };        msg.onpause = function(event) {            console.log('paused ' + event);        };        msg.onboundary = function(event) {            console.log('onboundary ' + event);        };        return msg;    };    var speekResponse = function(text) {        window.speechSynthesis.cancel();        var sentences = text.split('.');        for (var i = 0; i < sentences.length; i++) {            var toSay = sayit();            toSay.text = sentences[i];            window.speechSynthesis.speak(toSay);        }    };    speekResponse(window.getSelection().toString());})();

# A secret tip to make the magic happen

To select an entire article which is a few pages long you don't have to drag your cursor all the way down through it.

1. Click where you want your selection to start (nothing will happen, that's OK)
2. Scroll down the page
3. Hold Shift and click where the selection should end
4. Boom! The selection has been made without dragging