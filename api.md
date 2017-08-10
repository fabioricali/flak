<a name="Flak"></a>

## Flak
**Kind**: global class  

* [Flak](#Flak)
    * [new Flak(opts)](#new_Flak_new)
    * [.defaultClassOpts](#Flak+defaultClassOpts) : <code>Object</code>
    * [.defaultListenerOpts](#Flak+defaultListenerOpts) : <code>Object</code>
    * [.onCreated(callback)](#Flak+onCreated)
    * [.onRemoved(callback)](#Flak+onRemoved)
    * [.on(eventName, listener, opts)](#Flak+on) ⇒ [<code>Flak</code>](#Flak)
    * [.prependListener(eventName, listener)](#Flak+prependListener) ⇒ [<code>Flak</code>](#Flak)
    * [.prependOnceListener(eventName, listener)](#Flak+prependOnceListener) ⇒ [<code>Flak</code>](#Flak)
    * [.once(eventName, listener)](#Flak+once) ⇒ [<code>Flak</code>](#Flak)
    * [.off(eventName, listener)](#Flak+off) ⇒ [<code>Flak</code>](#Flak)
    * [.clear()](#Flak+clear) ⇒ [<code>Flak</code>](#Flak)
    * [.getListenersCount(eventName)](#Flak+getListenersCount) ⇒ <code>number</code>
    * [.getListeners(eventName)](#Flak+getListeners) ⇒ <code>Array</code>
    * [.getEvents()](#Flak+getEvents) ⇒ <code>\*</code> \| <code>Array</code>
    * [.exists(eventName)](#Flak+exists) ⇒ <code>boolean</code>
    * [.getMaxListeners()](#Flak+getMaxListeners) ⇒ <code>number</code>
    * [.setMaxListeners(value)](#Flak+setMaxListeners) ⇒ [<code>Flak</code>](#Flak)
    * [.fire(eventName, ...args)](#Flak+fire) ⇒ [<code>Flak</code>](#Flak)
    * [.fireAsync(eventName, ...args)](#Flak+fireAsync)

<a name="new_Flak_new"></a>

### new Flak(opts)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| opts | <code>Object</code> | options |

**Example**  
```js
const emitter = new Flak();
```
<a name="Flak+defaultClassOpts"></a>

### flak.defaultClassOpts : <code>Object</code>
Class options

**Kind**: instance property of [<code>Flak</code>](#Flak)  
<a name="Flak+defaultListenerOpts"></a>

### flak.defaultListenerOpts : <code>Object</code>
Event options

**Kind**: instance property of [<code>Flak</code>](#Flak)  
<a name="Flak+onCreated"></a>

### flak.onCreated(callback)
This event is triggered when an event is created

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback |

<a name="Flak+onRemoved"></a>

### flak.onRemoved(callback)
This event is triggered when an event is created

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | callback |

<a name="Flak+on"></a>

### flak.on(eventName, listener, opts) ⇒ [<code>Flak</code>](#Flak)
Adds event listener for eventName

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |
| listener | <code>function</code> | listener function |
| opts | <code>Object</code> | option object |

**Example**  
```js
emitter.on('myEvent', (param)=>{     console.log(param);})
```
<a name="Flak+prependListener"></a>

### flak.prependListener(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds the listener function to the beginning of the listeners array for the event named eventNameThis is a wrapper method of `on` that set to `opts.prepend = true`

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |
| listener | <code>function</code> | listener function |

<a name="Flak+prependOnceListener"></a>

### flak.prependOnceListener(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds a one time listener function to the beginning of the listeners array for the event named eventNameThis is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |
| listener | <code>function</code> | listener function |

<a name="Flak+once"></a>

### flak.once(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Adds a one time listener function for the event named eventName.This is a wrapper method of `on` that set to `opts.maxCalls = 1`

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |
| listener | <code>function</code> | listener function |

**Example**  
```js
emitter.once('myEvent', (param)=>{     console.log(param);})
```
<a name="Flak+off"></a>

### flak.off(eventName, listener) ⇒ [<code>Flak</code>](#Flak)
Remove event listener

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |
| listener | <code>function</code> | listener function |

**Example**  
```js
emitter.off('myEvent') // remove all listener with same nameemitter.off('myEvent', listener) // remove specific listener
```
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

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name is optional |

**Example**  
```js
emitter.on('event1', listener1);emitter.on('event2', listener2);emitter.on('event3', listener3);emitter.getListenersCount() // 3
```
<a name="Flak+getListeners"></a>

### flak.getListeners(eventName) ⇒ <code>Array</code>
Get listeners list of event

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |

<a name="Flak+getEvents"></a>

### flak.getEvents() ⇒ <code>\*</code> \| <code>Array</code>
Get listeners list of event

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<a name="Flak+exists"></a>

### flak.exists(eventName) ⇒ <code>boolean</code>
Check if event exists

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | event name |

<a name="Flak+getMaxListeners"></a>

### flak.getMaxListeners() ⇒ <code>number</code>
Get max number of listeners

**Kind**: instance method of [<code>Flak</code>](#Flak)  
<a name="Flak+setMaxListeners"></a>

### flak.setMaxListeners(value) ⇒ [<code>Flak</code>](#Flak)
Set max number of listeners

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>int</code> | number max listeners |

<a name="Flak+fire"></a>

### flak.fire(eventName, ...args) ⇒ [<code>Flak</code>](#Flak)
Calls each of the listeners registered for the event

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | ...arguments |
| ...args | <code>\*</code> | ...arguments |

**Example**  
```js
emitter.fire('myEvent', param1, param2, ...);
```
<a name="Flak+fireAsync"></a>

### flak.fireAsync(eventName, ...args)
Calls each of the listeners registered for the event, this method is async

**Kind**: instance method of [<code>Flak</code>](#Flak)  

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | ...arguments |
| ...args | <code>\*</code> | ...arguments |

