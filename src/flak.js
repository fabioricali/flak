const helper = require('./helper');

const error = [
    'event name is required and must be a string',
    'listener is required and must be a function or an array of function'
];

class flak {

    constructor() {
        this.events = [];
    }

    on(eventName, listener) {
        if (!helper.is(eventName, 'string'))
            throw new Error(error[0]);

        if (helper.is(listener, 'array')) {
            for(let i in listener) {
                if (listener.hasOwnProperty(i) && !helper.is(listener[i], 'function'))
                    throw new Error(error[1]);
            }
        } else if (!helper.is(listener, 'function'))
            throw new Error(error[1]);

        this.events.push(eventName, listener);

        return this;
    }

    once() {

    }

    off(eventName, listener) {

    }

    getListeners() {
        return this.events;
    }

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
    }

}

module.exports = flak;
module.exports._error = error;