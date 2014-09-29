# Gardr Postscribe Plugin (Ext)

Gardr plugin to enable content rendering with [Postscribe](https://github.com/krux/postscribe) from inside of an iframe.
It sends message to parent window which sould be caught [gardr-plugin-host-postscribe](https://github.com/Schibsted-Tech-Polska/gardr-plugin-host-postscribe).


## Install

```
npm install gardr-plugin-ext-postscribe --save
```

## Bundle

In your ext bundle file:
```javascript
    var gardrExt = require('gardr-ext');
    var postscribe = require('gardr-plugin-ext-postscribe');

    gardrExt.plugin(postscribe);

    module.exports = gardrExt;
```

## Usage

Set global variable ```_gardrPostscribe``` to ```true``` anywhere in script pointed by options.url

In host window:
```javascript
var gardr = gardrHost(...);
gardr.queue('ad', {
    url: 'my-adserver.com/ad.js',
    ...
});
```

In my-adserver.com/ad.js:
```javascript
window._gardrPostscribe = true;
```
