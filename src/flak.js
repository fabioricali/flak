const helper = require('./helper');
const error = require('./error');

/**
 * flak :)
 */
class flak {

    /**
     * Constructor
     * @param opts {Object} options
     * @example
     * const emitter = new flak();
     */
    constructor(opts = {}) {

        /**
         * Class options
         * @type {{maxListeners: number}}
         */
        this.defaultClassOpts = {
            maxListeners: 10,
            asyncDelay: 10 // ms
        };

        /**
         * Event options
         * @type {{maxCalls: number, prepend: boolean}}
         */
        this.defaultListenerOpts = {
            maxCalls: 0,
            prepend: false
        };

        this.opts = helper.defaults(opts, this.defaultClassOpts);
        this.events = {};
    }

    /**
     *
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param opts {Object} option object
     * @private
     */
    _createEvent(eventName, listener, opts) {

        if(!this.events[eventName])
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

        //console.log(this.events);
    }

    /**
     * Call event
     * @param eventName {string} event name
     * @param eventListener {Function} event listener
     * @param args args {*} ...arguments
     * @private
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
     * Adds event listener for eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param opts {Object} option object
     * @returns {flak}
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
     * Alias of `on`
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param opts {Object} option object
     * @returns {flak}
     */
    addListener(eventName, listener, opts = {}) {
        return this.on(eventName, listener, opts);
    }

    /**
     * Adds the listener function to the beginning of the listeners array for the event named eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    prependListener(eventName, listener) {
        return this.on(eventName, listener, {
            prepend: true
        });
    }

    /**
     * Adds a one time listener function to the beginning of the listeners array for the event named eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    prependOnceListener(eventName, listener) {
        return this.on(eventName, listener, {
            maxCalls: 1,
            prepend: true
        });
    }

    /**
     * Adds a one time listener function for the event named eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
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
     * Remove event listener
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     * @example
     * emitter.off('myEvent') // remove all listener with same name
     * emitter.off('myEvent', listener) // remove specific listener
     */
    off(eventName, listener) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        if(this.events[eventName])
            if (typeof listener === 'function') {
                for (let i = 0; i < this.events[eventName].length; i ++) {
                    //console.log(this.events[eventName][i] === listener );
                    if (this.events[eventName][i] === listener) {
                        this.events[eventName].splice(i, 1);
                    }
                }
            } else {
                delete this.events[eventName];
            }

        return this;
    }

    /**
     * Alias of `off`
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    removeListener(eventName, listener) {
        return this.off(eventName, listener);
    }

    /**
     * Remove all events
     * @returns {flak}
     * @example
     * emitter.clear();
     */
    clear() {
        this.events = [];
        return this;
    }

    /**
     * Alias of `clear`
     * @returns {flak}
     */
    removeAllListeners() {
        return this.clear();
    }

    /**
     * Get listeners count
     * @param eventName {string} event name is optional
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

        if (helper.is(this.events[eventName], 'undefined'))
            throw new Error(error[5]);

        return this.events[eventName];
    }

    /**
     * Get listeners list of event
     * @returns {*|Array}
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
     * Get max number of listeners
     * @returns {number}
     */
    getMaxListeners() {
        return this.opts.maxListeners;
    }

    /**
     * Set max number of listeners
     * @param value {int} number max listeners
     * @returns {flak}
     */
    setMaxListeners(value) {
        if (!helper.is(value, 'number'))
            throw new Error(error[2]);

        this.opts.maxListeners = value;
        return this;
    }

    /**
     * Calls each of the listeners registered for the event
     * @param eventName {string} ...arguments
     * @param args {*} ...arguments
     * @returns {flak}
     * @example
     * emitter.fire('myEvent', param1, param2, ...);
     */
    fire(eventName, ...args) {
        let _args = [];
        for (let i = 0; i < args.length; i++) _args.push(args[i]);

        for (let j = 0; j < this.events[eventName].length; j++) {
            this._callEvent(eventName, this.events[eventName][j], _args);
        }

        return this;
    }

    /**
     * Calls each of the listeners registered for the event, this method is async
     * @param eventName {string} ...arguments
     * @param args {*} ...arguments
     */
    fireAsync(eventName, ...args) {
        setTimeout(() => {
            this.fire(eventName, args);
        }, this.opts.asyncDelay);
    }

}

module.exports = flak;
module.exports._error = error;