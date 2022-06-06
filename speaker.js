javascript:'READ SELECTED';
(function () {
    'use strict';
    var sayit = function () {
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[0];
        msg.volume = 1;
        msg.rate = 1.15;
        msg.pitch = 1;
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
        if (!window.speechSynthesis.getVoices().length)  {
            setTimeout(() => speekResponse(text), 1000);
            return;
        }
        window.speechSynthesis.cancel();
        var sentences = text.split('.');
        for (var i = 0; i < sentences.length; i++) {
            var toSay = sayit();
            toSay.text = sentences[i];
            window.speechSynthesis.speak(toSay);
        }
    };

    function addPauses(sel) {
        var el = document.createElement('div');
        el.appendChild(sel.getRangeAt(0).cloneContents());
        for (var i = 0; i < 10; i++) {
            addMissingDots(el);
        }
        return el;
    }

    function addMissingDots(el) {
        var els = el.querySelectorAll('p, li, ol, h1, h2, h3, h4, h5, h6, h7, div');
        for (var i = 0; i < els.length; i++) {
            var cont = els[i].textContent;
            if (cont.length && cont.substr(cont.length - 1) !== '.') {
                els[i].innerHTML += '.';
            }
        }
        return el;
    }

    function getPDFSelection(callback) {
        var embed = document.querySelector('embed');
        if (!embed) return;

        function handler(event) {
          if (event.data.type !== 'getSelectedTextReply') return;
          window.removeEventListener('message', handler);
          console.log(event.data.selectedText);
          callback(event.data.selectedText.split(String.fromCharCode(10)).join(' '));
        }
        window.addEventListener('message', handler);
        embed.postMessage({type: 'getSelectedText'}, String.fromCharCode(42));
    }

    if (window.getSelection().rangeCount) speekResponse(addPauses(window.getSelection()).textContent);
    getPDFSelection(speekResponse);
})();
