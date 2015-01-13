/**
 * @fileOverview qr-links.js
 */

/* global QRCode: false */
/* global console: false */

(function () {

    'use strict';

    var tipEl;

    function getPos(el) {
        var res = {};
        var pos = el.getBoundingClientRect();
        res.left = pos.left + Math.max(
            document.documentElement.scrollLeft,
            document.body.scrollLeft
        );
        res.top = pos.top + Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
        );

        return res;
    }

    function openTip() {
        /*jshint validthis:true */
        var aEl = this;
        tipEl.innerHTML = aEl.href;
        new QRCode(tipEl, aEl.href);
        var pos = getPos(aEl);
        var top = pos.top + 20;
        if (aEl.getBoundingClientRect().top + 20 + 256 - window.innerHeight > 0) {
            top = pos.top - 20 - 256;
        }

        tipEl.style.left = (pos.left) + 'px';
        tipEl.style.top = top + 'px';
    }

    function closeTip() {
        tipEl.style.top = '-9999px';
        tipEl.style.left = '-9999px';
    }

    function bindTip(el) {
        el.addEventListener('mouseover', openTip);
        el.addEventListener('mouseout', closeTip);
    }

    function unbindTip(el) {
        el.removeEventListener('mouseover', openTip);
        el.removeEventListener('mouseout', closeTip);
    }

    function initTip() {

        if (tipEl) {
            return console.log('inited');
        }
        else {
            tipEl = document.createElement('div');
            tipEl.style.position = 'absolute';
            tipEl.style.zIndex = 9999;
            tipEl.style.padding = '20px';
            tipEl.style.background = '#fff';
            document.body.appendChild(tipEl);
            closeTip();
        }

        var links = document.querySelectorAll('a');
        [].forEach.call(links, function(el) {
            unbindTip(el);
            bindTip(el);
        });

    }

    initTip();

}());
