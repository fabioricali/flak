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

        this.defaultClassOpts = {
            maxListeners: 10
        };

        this.defaultListenerOpts = {
            maxCalls: 0,
            prepend: false
        };

        this.opts = helper.defaults(opts, this.defaultClassOpts);
        this.events = [];
    }

    /**
     *
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param opts {Object} option object
     * @private
     */
    _createEvent(eventName, listener, opts) {

        if (this.opts.maxListeners) {
            let maxListeners = this.opts.maxListeners;
            let listenersCount = helper.findArrayIndex(eventName, this.events).length;
            if (listenersCount >= maxListeners)
                throw new Error(error[3] + maxListeners);
        }

        listener.opts = helper.defaults(opts, this.defaultListenerOpts);

        listener.info = {
            calls: 0
        };

        if (opts.prepend)
            this.events.unshift(eventName, listener);
        else
            this.events.push(eventName, listener);
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

        let index = helper.findArrayIndex(eventName, this.events);

        if (typeof listener === 'function') {
            for (let i = 0; i <= index.length; i += 2) {
                if (this.events[i + 1] === listener)
                    this.events.splice(i, 2);
            }
        } else {
            for (let i = 0; i < index.length; i++) {
                this.events.splice(i, 2);
            }
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
        if (helper.is(eventName, 'string')) {
            return helper.findArrayIndex(eventName, this.events).length;
        } else {
            return this.events.length / 2;
        }
    }

    /**
     * Get listeners list
     * @returns {Array}
     */
    getListeners() {
        let list = [];
        for (let i = 0; i < this.events.length; i++) {
            if (helper.is(this.events[i], 'string'))
                list.push(this.events[i]);
        }
        return list;
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

        //let eventName = _args[0];
        let eventListener;

        for (let j = 0; j <= this.events.length; j += 2) {

            eventListener = this.events[j + 1];

            if (this.events[j] === eventName || this.events[j] === 'catchAll') {
                this._callEvent(eventName, eventListener, _args);
            }
        }

        return this;
    }

}

module.exports = flak;
module.exports._error = error;