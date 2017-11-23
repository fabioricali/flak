<div align="center">
<br/><br/>
<img width="250" src="https://raw.githubusercontent.com/fabioricali/flak/master/extra/logo.png" title="flak"/>
<br/><br/>
Powerfull universal JavaScript event emitter for browser and server.
<br/><br/>
<a href="https://travis-ci.org/fabioricali/flak" target="_blank"><img src="https://travis-ci.org/fabioricali/flak.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/flak?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/flak/badge.svg?branch=master&1" title="Coverage Status"/></a>
<a href="https://opensource.org/licenses/MIT" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" title="License: MIT"/></a>
<img src="https://img.shields.io/badge/team-terrons-orange.svg" title="Team Terrons"/>
</div>

## Installation

### Node.js
```
npm install flak --save
```

## Example
```javascript
const Flak = require('flak');
const emitter = new Flak();

// Adds listener for the event
emitter.on('myEvent1', (param1, param2)=>{
    console.log(param1, param2);
});

// Adds a one time listener function for the event 
emitter.once('myEvent2', (param1, param2)=>{
    console.log(param1, param2);
});

// Adds listener for the event that can be call just 4 time
emitter.on('myEvent3', (param1, param2)=>{
    console.log(param1, param2);
}, {
    maxCalls: 4
});

// Adds the listener function to the beginning of the listeners array for the event named myEvent1
emitter.on('myEvent1', (param1, param2)=>{
    console.log(param1, param2);
}, {
    prepend: true
});

// Catch all events
emitter.onCatchAll(params=>{
    console.log(params);
});

// Fire event
emitter.fire('myEvent1', true, {a: 1});

// Fire async method
emitter.fireAsync('myEvent2', true, {a: 1});

// Remove all listeners for myEvent1
emitter.off('myEvent1');

// Returning data using "fireTheFirst"
emitter.on('myEvent', (param1, param2)=>{
    return param1 + '-' + param2;
});
console.log('foo-bar' === emitter.fireTheFirst('myEvent', 'foo', 'bar')) //=> true;

// Suspend event
emitter.suspendEvent('myEvent');
emitter.fire('myEvent'); // will not be fired!

// Resume event
emitter.resumeEvent('myEvent');
```

### API Documentation
See <a href="https://github.com/fabioricali/flak/blob/master/api.md">full documentation here</a>

### Browser

#### Local
```html
<script src="node_modules/flak/dist/flak.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/flak/dist/flak.min.js"></script>
```

#### CDN jsDeliver
```html
<script src="https://cdn.jsdelivr.net/npm/flak/dist/flak.min.js"></script>
```

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/flak/blob/master/CHANGELOG.md">here</a>

## License
Flak is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>