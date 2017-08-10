const helper = require('./helper');
const error = require('./error');

class Flak {

    /**
     * Constructor
     * @param [opts] {Object} options
     * @param [opts.maxListeners=10] {number} Max number listeners per event
     * @param [opts.asyncDelay=10] {number} Delay in ms for async method `fireAsync`
     * @example
     * const emitter = new Flak();
     */
    constructor(opts = {}) {

        /**
         * Class options
         * @type {{maxListeners: number, asyncDelay: number}}
         * @ignore
         */
        this.defaultClassOpts = {
            maxListeners: 10,
            asyncDelay: 10 // ms
        };

        /**
         * Event options
         * @type {{maxCalls: number, prepend: boolean}}
         * @ignore
         */
        this.defaultListenerOpts = {
            maxCalls: 0,
            prepend: false
        };

        this.opts = helper.defaults(opts, this.defaultClassOpts);
        this.events = {};

    }

    /**
     * Create event and add listener
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param [opts] {Object} option object
     * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
     * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
     * @private
     * @ignore
     */
    _createEvent(eventName, listener, opts) {

        if (!this.events[eventName])
            this.events[eventName] = [];

        if (this.opts.maxListeners) {
            let maxListeners = this.opts.maxListeners;
            let listenersCount = this.events[eventName].length;
            if (listenersCount >= maxListeners)
                throw new Error(error[3] + maxListeners);
        }

        listener.opts = helper.defaults(opts, this.defaultListenerOpts);

        listener.info = {
            calls: 0
        };

        if (opts.prepend)
            this.events[eventName].unshift(listener);
        else
            this.events[eventName].push(listener);

        this._created.call(this, eventName, listener, opts);
    }

    /**
     * Call event
     * @param eventName {string} event name
     * @param eventListener {Function} event listener
     * @param args args {*} ...arguments
     * @private
     * @ignore
     */
    _callEvent(eventName, eventListener, args) {
        if (eventListener.opts.maxCalls) {
            if (eventListener.info.calls++ >= eventListener.opts.maxCalls) {
                this.off(eventName, eventListener);
                return;
            }
            eventListener.apply(this, args);
        } else {
            eventListener.apply(this, args);
        }
    }

    /**
     * Callback on create
     * @private
     * @ignore
     */
    _created() {}

    /**
     * Callback on remove
     * @private
     * @ignore
     */
    _removed() {}

    /**
     * Adds event listener for eventName
     * @param eventName {string} event name
     * @param listener {(Function|Function[])} listener function
     * @param [opts] {Object} option object
     * @param [opts.maxCalls=0] {number} Max calls for event created, disabled if is `0`
     * @param [opts.prepend=false] {boolean} Adds the listener function to the beginning of the listeners array for the event named `eventName`
     * @returns {Flak}
     * @example
     * emitter.on('myEvent', (param)=>{
     *      console.log(param);
     * })
     */
    on(eventName, listener, opts = {}) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        eventName = eventName.trim();

        if (!eventName.length)
            throw new Error(error[4]);

        if (helper.is(listener, 'array')) {
            for (let i in listener) {
                if (listener.hasOwnProperty(i)) {
                    if (!helper.is(listener[i], 'function'))
                        throw new Error(error[1]);
                    this._createEvent(eventName, listener[i], opts);
                }
            }
        } else {
            if (!helper.is(listener, 'function'))
                throw new Error(error[1]);
            this._createEvent(eventName, listener, opts);
        }

        return this;
    }

    /**
     * Adds a one time listener function for the event named eventName.
     * This is a wrapper method of `on` that set to `opts.maxCalls = 1`
     * @param eventName {string} event name
     * @param listener {(Function|Function[])} listener function
     * @returns {Flak}
     * @example
     * emitter.once('myEvent', (param)=>{
     *      console.log(param);
     * })
     */
    once(eventName, listener) {
        return this.on(eventName, listener, {
            maxCalls: 1
        });
    }

    /**
     * Calls each of the listeners registered for the event
     * @param eventName {string} event name
     * @param [args] {*} ...arguments
     * @returns {Flak}
     * @example
     * emitter.fire('myEvent', param1, param2, ...);
     */
    fire(eventName, ...args) {

        if(this.exists(eventName))
            for (let j = 0; j < this.events[eventName].length; j++) {
                this._callEvent(eventName, this.events[eventName][j], args);
            }

        return this;
    }

    /**
     * Calls each of the listeners registered for the event, this method is async
     * @param eventName {string} event name
     * @param [args] {*} ...arguments
     * @example
     * emitter.fireAsync('myEvent', param1, param2, ...);
     */
    fireAsync(eventName, ...args) {
        setTimeout(() => {
            this.fire(eventName, args);
        }, this.opts.asyncDelay);
    }

    /**
     * Remove event/listener
     * @param eventName {string} event name
     * @param [listener] {Function} listener function, if is set remove listener only for this event
     * @returns {Flak}
     * @example
     * emitter.off('myEvent') // remove event
     * emitter.off('myEvent', listener) // remove specific listener
     */
    off(eventName, listener) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        if (this.events[eventName])
            if (typeof listener === 'function') {
                for (let i = 0; i < this.events[eventName].length; i++) {
                    if (this.events[eventName][i] === listener) {
                        this.events[eventName].splice(i, 1);
                        this._removed.call(this, eventName, listener);
                    }
                }
            } else {
                delete this.events[eventName];
                this._removed.call(this, eventName);
            }

        return this;
    }

    /**
     * Adds the listener function to the beginning of the listeners array for the event named eventName
     * This is a wrapper method of `on` that set to `opts.prepend = true`
     * @param eventName {string} event name
     * @param listener {(Function|Function[])} listener function
     * @returns {Flak}
     */
    prependListener(eventName, listener) {
        return this.on(eventName, listener, {
            prepend: true
        });
    }

    /**
     * Adds a one time listener function to the beginning of the listeners array for the event named eventName
     * This is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`
     * @param eventName {string} event name
     * @param listener {(Function|Function[])} listener function
     * @returns {Flak}
     */
    prependOnceListener(eventName, listener) {
        return this.on(eventName, listener, {
            maxCalls: 1,
            prepend: true
        });
    }

    /**
     * Remove all events
     * @returns {Flak}
     * @example
     * emitter.clear();
     */
    clear() {
        this.events = [];
        return this;
    }

    /**
     * Get listeners count
     * @param eventName {string} event name
     * @returns {number}
     * @example
     * emitter.on('event1', listener1);
     * emitter.on('event2', listener2);
     * emitter.on('event3', listener3);
     *
     * emitter.getListenersCount() // 3
     */
    getListenersCount(eventName) {
        return this.getListeners(eventName).length
    }

    /**
     * Get listeners list of event
     * @param eventName {string} event name
     * @returns {Array}
     */
    getListeners(eventName) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        if (!this.exists(eventName))
            throw new Error(error[5]);

        return this.events[eventName];
    }

    /**
     * Get events list
     * @returns {Array}
     */
    getEvents() {
        return this.events;
    }

    /**
     * Check if event exists
     * @param eventName {string} event name
     * @returns {boolean}
     */
    exists(eventName) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        return !helper.is(this.events[eventName], 'undefined');
    }

    /**
     * Get max number of listeners per event
     * @returns {number}
     */
    getMaxListeners() {
        return this.opts.maxListeners;
    }

    /**
     * Set max number of listeners per event
     * @param value {int} number max listeners
     * @returns {Flak}
     */
    setMaxListeners(value) {
        if (!helper.is(value, 'number'))
            throw new Error(error[2]);

        this.opts.maxListeners = value;
        return this;
    }

    /**
     * This event is triggered when an event is created
     * @param callback {Function} callback function
     * @example
     * emitter.onCreated(obj=>{
     *      console.log(obj) //-> eventName, listener, opts
     * })
     *
     * emitter.on('myEvent', (param)=>{
     *      console.log(param)
     * })
     */
    onCreated(callback) {
        this._created = callback;
    }

    /**
     * This event is triggered when an event is removed
     * @param callback {Function} callback function
     * @example
     * emitter.onRemoved(obj=>{
     *      console.log(obj) //-> eventName, (listener)
     * })
     *
     * emitter.off('myEvent')
     */
    onRemoved(callback) {
        this._removed = callback;
    }
}

module.exports = Flak;
module.exports._error = error;