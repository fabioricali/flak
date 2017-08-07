const helper = require('./helper');

/**
 * Errors list
 * @type {[]}
 */
const error = [
    'event name is required and must be a string',
    'listener is required and must be a function or an array of function',
    'value must be a number'
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
        this.defOpts = {
            maxListeners: 10
        };
        this.opts = helper.defaults(opts, this.defOpts);
        this.events = [];
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
                if (listener.hasOwnProperty(i) && !helper.is(listener[i], 'function'))
                    throw new Error(error[1]);
            }
        } else if (!helper.is(listener, 'function'))
            throw new Error(error[1]);

        // append options
        listener.opts = opts;

        this.events.push(eventName, listener);

        return this;
    }

    /**
     * Adds a one time listener function for the event named eventName
     * @param eventName {string} event name
     * @param listener {Function} listener function
     * @returns {flak}
     */
    once(eventName, listener) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

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
                if(helper.is(eventListener, 'array')) {
                    for(let e in eventListener)
                        if(eventListener.hasOwnProperty(e))
                            eventListener[e].apply(this, _args.slice(1));
                } else {
                    eventListener.apply(this, _args.slice(1));
                }
            }
        }

        return this;
    }

}

module.exports = flak;
module.exports._error = error;