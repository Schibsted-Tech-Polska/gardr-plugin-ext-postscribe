'use strict';

var xde = require('cross-domain-events');

var gardrPostscribe = function() {

    global.addEventListener('DOMContentLoaded', function() {
        if(global._gardrPostscribe === true) {
            xde.sendTo(global.parent, 'plugin:postscribe', {
                id: global.gardr.id
            });
        }
    });

};

module.exports = gardrPostscribe;
