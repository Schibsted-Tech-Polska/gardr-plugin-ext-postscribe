'use strict';

var xde = require('cross-domain-events');

var gardrPostscribe = function() {

    global.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() { // wait for other DOMContentLoaded handlers code to execute
            if(typeof global._gardrRunPostscribe === 'function' && typeof global._gardrRunPostscribe.getUrl === 'function') {
                xde.sendTo(global.parent, 'plugin:postscribe', {
                    id: global.gardr.id,
                    url: global._gardrRunPostscribe.getUrl()
                });
            }
            else if(global._gardrPostscribe === true) {
                xde.sendTo(global.parent, 'plugin:postscribe', {
                    id: global.gardr.id
                });
            }
        }, 0);
    });

};

module.exports = gardrPostscribe;
