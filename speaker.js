javascript: (function () {
    'use strict';
    var voices = window.speechSynthesis.getVoices();
    var sayit = function () {
        var msg = new SpeechSynthesisUtterance();
        msg.voice = voices[2];
        msg.voiceURI = 'native';
        msg.volume = 1;
        msg.rate = 1.25;
        msg.pitch = 0.7;
        msg.lang = 'en-GB';
        msg.onstart = function (event) {
            console.log('started');
        };
        msg.onend = function (event) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };
        msg.onerror = function (event) {
            console.log('Errored ' + event);
        };
        msg.onpause = function (event) {
            console.log('paused ' + event);
        };
        msg.onboundary = function (event) {
            console.log('onboundary ' + event);
        };
        return msg;
    };
    var speekResponse = function (text) {
        window.speechSynthesis.cancel();
        var sentences = text.split('.');
        for (var i = 0; i < sentences.length; i++) {
            var toSay = sayit();
            toSay.text = sentences[i];
            window.speechSynthesis.speak(toSay);
        }
    };
    speekResponse(window.getSelection().toString());
})();