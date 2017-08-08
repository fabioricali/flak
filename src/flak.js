const helper = require('./helper');

/**
 * Errors list
 * @type {[]}
 */
const error = [
    'event name is required and must be a string',
    'listener is required and must be a function or an array of function',
    'value must be a number',
    'increase maxListeners per event: '
];

/**
 * flak :)
 */
class flak {

    /**
     * Constructor
     * @param opts {Object} options
     */
    constructor(opts = {}) {

        this.defaultClassOpts = {
            maxListeners: 10
        };

        this.defaultListenerOpts = {
            maxCalls: 0
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

        if(this.opts.maxListeners) {
            let maxListeners = this.opts.maxListeners;
            let listenersCount = helper.findArrayIndex(eventName, this.events).length;
            console.log(listenersCount);
            if(listenersCount >= maxListeners)
                throw new Error(error[3] + maxListeners);
        }

        listener.opts = helper.defaults(opts, this.defaultListenerOpts);

        listener.info = {
            calls: 0
        };

        this.events.push(eventName, listener);
    }

    /**
     * Call event
     * @param eventListener {Function} event listener
     * @param args args {*} ...arguments
     * @private
     */
    _callEvent(eventListener, args) {
        if(eventListener.opts.maxCalls && eventListener.opts.maxCalls > 0){
            if(++eventListener.info.calls > eventListener.opts.maxCalls){
                this.off(args[0], args[1]);
                return;
            }
        }
        eventListener.apply(this, args.slice(1));
    }

    /**
     * Adds event listener for eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @param opts {Object} option object
     * @returns {flak}
     */
    on(eventName, listener, opts = {}) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        if (helper.is(listener, 'array')) {
            for(let i in listener) {
                if(listener.hasOwnProperty(i)) {
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
     * Adds a one time listener function for the event named eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    once(eventName, listener) {
        this.on(eventName, listener, {
            maxCalls: 1
        });

        return this;
    }

    /**
     * Remove event listener
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    off(eventName, listener) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        let index = helper.findArrayIndex(eventName, this.events);

        if(typeof listener === 'function'){
            for(let i = 0; i < index.length; i++) {
                if(this.events[i + 1] === listener)
                    this.events.splice(i, 2);
            }
        } else {
            for(let i = 0; i < index.length; i++) {
                this.events.splice(i, 2);
            }
        }

        return this;
    }

    /**
     * Remove all events
     * @returns {flak}
     */
    clear() {
        this.events = [];
        return this;
    }

    /**
     * Get listeners list
     * @returns {Array}
     */
    getListeners() {
        return this.events;
    }

    /**
     * Get max number of listeners
     * @returns {number|*}
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
     * Fire event
     * @param args {*} ...arguments
     * @returns {flak}
     */
    fire(...args) {
        let _args = [];
        for (let i = 0; i < args.length; i++) _args.push(args[i]);

        let eventName = _args[0];
        let eventListener;

        for (let j = 0; j <= this.events.length; j += 2) {

            eventListener = this.events[j + 1];

            if (this.events[j] === eventName || this.events[j] === 'catchAll') {
                this._callEvent(eventListener, _args);
            }
        }

        return this;
    }

}

module.exports = flak;
module.exports._error = error;