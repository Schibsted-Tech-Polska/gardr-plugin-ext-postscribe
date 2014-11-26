/*global describe, beforeEach, it */

'use strict';

// window mock for xde
global.eventHandlers = {};
global.parent = {};
global.gardr = {};

global.addEventListener = function(name, handler) {
    if(!Array.isArray(this.eventHandlers[name])) {
        this.eventHandlers[name] = [];
    }
    this.eventHandlers[name].push(handler);
};

global.triggerEvent = function(name, data) {
    if(Array.isArray(this.eventHandlers[name])) {
        this.eventHandlers[name].forEach(function(handler) {
            handler(data);
        });
    }
};


var assert = require('assert'),
    gardrPostscribe = require('./index.js'),
    PluginApi = require('gardr-core-plugin').PluginApi,
    sinon = require('sinon');


describe('gardr-postscribe', function() {
    var pluginApi;

    beforeEach(function() {
        pluginApi = new PluginApi();
        global.parent.postMessage = sinon.spy();
        global.gardr.id = '' + Math.random();
        delete global._gardrPostscribe;
        global._gardrRunPostscribe = function(getHTML) {
            global._gardrRunPostscribe.getHTML = getHTML;
        };
    });
    
    it('should be a function', function() {
        assert.equal(typeof gardrPostscribe, 'function');
    });

    it('should listen for DOMContentLoaded event for checks', function() {
        assert(!global.eventHandlers.hasOwnProperty('DOMContentLoaded'), 'DOMContentLoaded set');
        gardrPostscribe(pluginApi);
        assert(global.eventHandlers.hasOwnProperty('DOMContentLoaded'), 'DOMContentLoaded unset');
    });

    it('should not call postMessage (via xde) when _gardrPostscribe var is not true', function(done) {
        gardrPostscribe(pluginApi);
        assert(!global.parent.postMessage.called, 'parent.postMessage was called');
        global.triggerEvent('DOMContentLoaded');
        setTimeout(function() {
            assert(!global.parent.postMessage.called, 'parent.postMessage was called');
            done();
        }, 10);
    });

    it('should call postMessage (via xde) when _gardrPostscribe var is true', function(done) {
        global._gardrPostscribe = true;
        gardrPostscribe(pluginApi);
        assert(!global.parent.postMessage.called, 'parent.postMessage was called');
        global.triggerEvent('DOMContentLoaded');
        setTimeout(function() {
            assert(global.parent.postMessage.called, 'parent.postMessage was not called');
            done();
        }, 10);
    });

    it('should call postMessage (via xde) when _gardrRunPostscribe callback was set', function(done) {
        global._gardrRunPostscribe(function() {
            return '<script src="yeah"></script>';
        });
        gardrPostscribe(pluginApi);
        assert(!global.parent.postMessage.called, 'parent.postMessage was called');
        global.triggerEvent('DOMContentLoaded');
        setTimeout(function() {
            assert(global.parent.postMessage.called, 'parent.postMessage was not called');
            done();
        }, 10);
    });
});
