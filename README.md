<div align="center">
<br/><br/>
<img width="320" src="https://raw.githubusercontent.com/fabioricali/flak/master/extra/logo.png" title="flak"/>
<br/><br/>
JavaScript event emitter for browser and server.
<br/><br/>
<a href="https://travis-ci.org/fabioricali/flak" target="_blank"><img src="https://travis-ci.org/fabioricali/flak.svg?branch=master" title="Build Status"/></a>
<a href="https://coveralls.io/github/fabioricali/flak?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/fabioricali/flak/badge.svg?branch=master" title="Coverage Status"/></a>
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

emitter.on('myEvent', (param1, param2)=>{
    console.log(param1, param2);
})

emitter.fire('myEvent', true, {a: 1});
```

### Browser

#### Local
```html
<script src="node_modules/flak/dist/katch.min.js"></script>
```

#### CDN unpkg
```html
<script src="https://unpkg.com/flak/dist/katch.min.js"></script>
```

#### CDN jsDeliver
```html
<script src="https://cdn.jsdelivr.net/npm/flak/dist/flak.min.js"></script>
```

### API Documentation
See <a href="api.md">here</a>

## Changelog
You can view the changelog <a target="_blank" href="https://github.com/fabioricali/flak/blob/master/CHANGELOG.md">here</a>

## License
Flak is open-sourced software licensed under the <a target="_blank" href="http://opensource.org/licenses/MIT">MIT license</a>

## Author
<a target="_blank" href="http://rica.li">Fabio Ricali</a>