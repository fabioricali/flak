<a name="Flak"></a>

## Flak
**Kind**: global class  

* [Flak](#Flak)
    * [new Flak([opts])](#new_Flak_new)
    * [.on(eventName, listener, [opts])](#Flak+on) ⇒ [<code>Flak</code>](#Flak)
    * [.once(eventName, listener)](#Flak+once) ⇒ [<code>Flak</code>](#Flak)
    * [.fire(eventName, [...args])](#Flak+fire) ⇒ [<code>Flak</code>](#Flak)
    * [.fireAsync(eventName, [...args])](#Flak+fireAsync)
    * [.off(eventName, [listener])](#Flak+off) ⇒ [<code>Flak</code>](#Flak)
    * [.prependListener(eventName, listener)](#Flak+prependListener) ⇒ [<code>Flak</code>](#Flak)
    * [.prependOnceListener(eventName, listener)](#Flak+prependOnceListener) ⇒ [<code>Flak</code>](#Flak)
    * [.clear()](#Flak+clear) ⇒ [<code>Flak</code>](#Flak)
    * [.getListenersCount(eventName)](#Flak+getListenersCount) ⇒ <code>number</code>
    * [.getListeners(eventName)](#Flak+getListeners) ⇒ <code>Array</code>
    * [.getEvents()](#Flak+getEvents) ⇒ <code>Array</code>
    * [.exists(eventName)](#Flak+exists) ⇒ <code>boolean</code>
    * [.getMaxListeners()](#Flak+getMaxListeners) ⇒ <code>number</code>
    * [.setMaxListeners(value)](#Flak+setMaxListeners) ⇒ [<code>Flak</code>](#Flak)
    * [.onCreated(callback)](#Flak+onCreated) ⇒ [<code>Flak</code>](#Flak)
    * [.onRemoved(callback)](#Flak+onRemoved) ⇒ [<code>Flak</code>](#Flak)

<a name="new_Flak_new"></a>

### new Flak([opts])
Constructor

<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>options</p>
</td>
    </tr><tr>
    <td>[opts.maxListeners]</td><td><code>number</code></td><td><code>10</code></td><td><p>Max number listeners per event</p>
</td>
    </tr><tr>
    <td>[opts.asyncDelay]</td><td><code>number</code></td><td><code>10</code></td><td><p>Delay in ms for async method <code>fireAsync</code></p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
const emitter = new Flak();
```
<a name="Flak+on"></a>

### flak.on(eventName, listener, [opts]) ⇒ [<code>Flak</code>](#Flak)
Adds event listener for eventName

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Default</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code> | <code>Array.&lt;function()&gt;</code></td><td></td><td><p>listener function</p>
</td>
    </tr><tr>
    <td>[opts]</td><td><code>Object</code></td><td></td><td><p>option object</p>
</td>
    </tr><tr>
    <td>[opts.maxCalls]</td><td><code>number</code></td><td><code>0</code></td><td><p>Max calls for event created, disabled if is <code>0</code></p>
</td>
    </tr><tr>
    <td>[opts.prepend]</td><td><code>boolean</code></td><td><code>false</code></td><td><p>Adds the listener function to the beginning of the listeners array for the event named <code>eventName</code></p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.on('myEvent', (param)=>{     console.log(param);})
```
<a name="Flak+once"></a>

### flak.once(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds a one time listener function for the event named eventName.This is a wrapper method of `on` that set to `opts.maxCalls = 1`

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code> | <code>Array.&lt;function()&gt;</code></td><td><p>listener function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.once('myEvent', (param)=>{     console.log(param);})
```
<a name="Flak+fire"></a>

### flak.fire(eventName, [...args]) ⇒ [<code>Flak</code>](#Flak)
Calls each of the listeners registered for the event

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>[...args]</td><td><code>*</code></td><td><p>...arguments</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.fire('myEvent', param1, param2, ...);
```
<a name="Flak+fireAsync"></a>

### flak.fireAsync(eventName, [...args])
Calls each of the listeners registered for the event, this method is async

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>[...args]</td><td><code>*</code></td><td><p>...arguments</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.fireAsync('myEvent', param1, param2, ...);
```
<a name="Flak+off"></a>

### flak.off(eventName, [listener]) ⇒ [<code>Flak</code>](#Flak)
Remove event/listener

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>[listener]</td><td><code>function</code></td><td><p>listener function, if is set remove listener only for this event</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.off('myEvent') // remove eventemitter.off('myEvent', listener) // remove specific listener
```
<a name="Flak+prependListener"></a>

### flak.prependListener(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds the listener function to the beginning of the listeners array for the event named eventNameThis is a wrapper method of `on` that set to `opts.prepend = true`

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code> | <code>Array.&lt;function()&gt;</code></td><td><p>listener function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Flak+prependOnceListener"></a>

### flak.prependOnceListener(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds a one time listener function to the beginning of the listeners array for the event named eventNameThis is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr><tr>
    <td>listener</td><td><code>function</code> | <code>Array.&lt;function()&gt;</code></td><td><p>listener function</p>
</td>
    </tr>  </tbody>
</table>

<a name="Flak+clear"></a>

### flak.clear() ⇒ [<code>Flak</code>](#Flak)
Remove all events

**Kind**: instance method of [<code>Flak</code>](#Flak)  
**Example**  
```js
emitter.clear();
```
<a name="Flak+getListenersCount"></a>

### flak.getListenersCount(eventName) ⇒ <code>number</code>
Get listeners count

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.on('event', listener1);emitter.on('event', listener2);emitter.on('event1', listener3);emitter.getListenersCount('event') // 2
```
<a name="Flak+getListeners"></a>

### flak.getListeners(eventName) ⇒ <code>Array</code>
Get listeners list of event

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr>  </tbody>
</table>

<a name="Flak+getEvents"></a>

### flak.getEvents() ⇒ <code>Array</code>
Get events list

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<a name="Flak+exists"></a>

### flak.exists(eventName) ⇒ <code>boolean</code>
Check if event exists

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>eventName</td><td><code>string</code></td><td><p>event name</p>
</td>
    </tr>  </tbody>
</table>

<a name="Flak+getMaxListeners"></a>

### flak.getMaxListeners() ⇒ <code>number</code>
Get max number of listeners per event

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<a name="Flak+setMaxListeners"></a>

### flak.setMaxListeners(value) ⇒ [<code>Flak</code>](#Flak)
Set max number of listeners per event

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>value</td><td><code>int</code></td><td><p>number max listeners</p>
</td>
    </tr>  </tbody>
</table>

<a name="Flak+onCreated"></a>

### flak.onCreated(callback) ⇒ [<code>Flak</code>](#Flak)
This event is triggered when an event is created

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.onCreated(obj=>{     console.log(obj) //-> eventName, listener, opts})emitter.on('myEvent', (param)=>{     console.log(param)})
```
<a name="Flak+onRemoved"></a>

### flak.onRemoved(callback) ⇒ [<code>Flak</code>](#Flak)
This event is triggered when an event is removed

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<table>
  <thead>
    <tr>
      <th>Param</th><th>Type</th><th>Description</th>
    </tr>
  </thead>
  <tbody>
<tr>
    <td>callback</td><td><code>function</code></td><td><p>callback function</p>
</td>
    </tr>  </tbody>
</table>

**Example**  
```js
emitter.onRemoved(obj=>{     console.log(obj) //-> eventName, (listener)})emitter.off('myEvent')
```
