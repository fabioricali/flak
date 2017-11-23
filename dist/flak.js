// [AIV]  Flak Build version: 1.0.0  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("flak", [], factory);
	else if(typeof exports === 'object')
		exports["flak"] = factory();
	else
		root["flak"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helper = __webpack_require__(2);
var error = __webpack_require__(3);

var Flak = function () {
    //TODO add support to cross-domain through postMessage, see: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
    /**
     * Constructor
     * @param [opts] {Object} options
     * @param [opts.maxListeners=10] {number} Max number listeners per event
     * @param [opts.asyncDelay=10] {number} Delay in ms for async method `fireAsync`
     * @example
     * const emitter = new Flak();
     */
    function Flak() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Flak);

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


    _createClass(Flak, [{
        key: '_createEvent',
        value: function _createEvent(eventName, listener, opts) {

            if (!this.events[eventName]) this.events[eventName] = [];

            if (this.opts.maxListeners) {
                var maxListeners = this.opts.maxListeners;
                var listenersCount = this.events[eventName].length;
                if (listenersCount >= maxListeners) throw new Error(error[3] + maxListeners);
            }

            listener.opts = helper.defaults(opts, this.defaultListenerOpts);

            listener.state = {
                suspended: false,
                calls: 0
            };

            if (opts.prepend) this.events[eventName].unshift(listener);else this.events[eventName].push(listener);

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

    }, {
        key: '_callEvent',
        value: function _callEvent(eventName, eventListener, args) {
            if (eventListener.state.suspended) return;

            if (eventListener.opts.maxCalls && eventListener.state.calls++ >= eventListener.opts.maxCalls) {
                this.off(eventName, eventListener);
                return;
            }

            this._catchAll.call(this, args);
            return eventListener.apply(this, args);
        }

        /**
         *
         * @param events {Array} event list
         * @param suspended {boolean}
         * @returns {Flak}
         * @private
         * @ignore
         */

    }, {
        key: '_suspendEvent',
        value: function _suspendEvent() {
            var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var suspended = arguments[1];

            var eventName = void 0;

            for (var event in events) {
                eventName = events[event];
                if (this.events[eventName]) {
                    this.events[eventName].forEach(function (e) {
                        e.state.suspended = suspended;
                    });
                }
            }

            return this;
        }

        /**
         * Callback on create
         * @private
         * @ignore
         */

    }, {
        key: '_created',
        value: function _created() {}

        /**
         * Callback on remove
         * @private
         * @ignore
         */

    }, {
        key: '_removed',
        value: function _removed() {}

        /**
         * Callback catch all
         * @private
         * @ignore
         */

    }, {
        key: '_catchAll',
        value: function _catchAll() {}

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
         * });
         */

    }, {
        key: 'on',
        value: function on(eventName, listener) {
            var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            eventName = eventName.trim();

            if (!eventName.length) throw new Error(error[4]);

            if (helper.is(listener, 'array')) {
                for (var i in listener) {
                    if (listener.hasOwnProperty(i)) {
                        if (!helper.is(listener[i], 'function')) throw new Error(error[1]);
                        this._createEvent(eventName, listener[i], opts);
                    }
                }
            } else {
                if (!helper.is(listener, 'function')) throw new Error(error[1]);
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
         * });
         */

    }, {
        key: 'once',
        value: function once(eventName, listener) {
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

    }, {
        key: 'fire',
        value: function fire(eventName) {

            if (this.exists(eventName)) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                for (var j = 0; j < this.events[eventName].length; j++) {
                    this._callEvent(eventName, this.events[eventName][j], args);
                }
            }return this;
        }

        /**
         * Calls the first of the listeners registered for the event and return it
         * @param eventName {string} event name
         * @param [args] {*} ...arguments
         * @returns {*}
         * @since 0.3.0
         * @example
         * emitter.on('myEvent', (param1, param2)=>{
         *      return param1 + '-' + param2;
         * });
         * console.log('foo-bar' === emitter.fireTheFirst('myEvent', 'foo', 'bar')) //=> true;
         */

    }, {
        key: 'fireTheFirst',
        value: function fireTheFirst(eventName) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            /* istanbul ignore else  */
            if (this.exists(eventName)) return this._callEvent(eventName, this.events[eventName][0], args);
        }

        /**
         * Calls each of the listeners registered for the event, this method is async
         * @param eventName {string} event name
         * @param args {*} ...arguments
         * @example
         * emitter.fireAsync('myEvent', param1, param2, ...);
         */

    }, {
        key: 'fireAsync',
        value: function fireAsync(eventName) {
            var _this = this;

            for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
            }

            args.unshift(eventName);
            setTimeout(function () {
                _this.fire.apply(_this, args);
            }, this.opts.asyncDelay);
        }

        /**
         * Remove event/listener
         * @param eventName {string} event name
         * @param [listener] {Function} listener function, if is set remove listener only for this event
         * @returns {Flak}
         * @example
         * emitter.off('myEvent'); // remove event
         * emitter.off('myEvent', listener); // remove specific listener
         */

    }, {
        key: 'off',
        value: function off(eventName, listener) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            /* istanbul ignore else  */
            if (this.events[eventName]) if (typeof listener === 'function') {
                for (var i = 0; i < this.events[eventName].length; i++) {
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
         * Adds the listener function to the beginning of the listeners array for the event named eventName.
         * This is a wrapper method of `on` that set to `opts.prepend = true`
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @returns {Flak}
         */

    }, {
        key: 'prependListener',
        value: function prependListener(eventName, listener) {
            return this.on(eventName, listener, {
                prepend: true
            });
        }

        /**
         * Adds a one time listener function to the beginning of the listeners array for the event named eventName.
         * This is a wrapper method of `on` that set to `opts.maxCalls = 1` and `opts.prepend = true`
         * @param eventName {string} event name
         * @param listener {(Function|Function[])} listener function
         * @returns {Flak}
         */

    }, {
        key: 'prependOnceListener',
        value: function prependOnceListener(eventName, listener) {
            return this.on(eventName, listener, {
                maxCalls: 1,
                prepend: true
            });
        }

        /**
         * Suspends firing of the named event(s).
         * @param eventName {...string} multiple event names to suspend
         * @returns {Flak}
         */

    }, {
        key: 'suspendEvent',
        value: function suspendEvent() {
            for (var _len4 = arguments.length, eventName = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                eventName[_key4] = arguments[_key4];
            }

            return this._suspendEvent(eventName, true);
        }

        /**
         * Resumes firing of the named event(s).
         * @param eventName {...string} multiple event names to resume.
         * @returns {Flak}
         */

    }, {
        key: 'resumeEvent',
        value: function resumeEvent() {
            for (var _len5 = arguments.length, eventName = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                eventName[_key5] = arguments[_key5];
            }

            return this._suspendEvent(eventName, false);
        }

        /**
         * Suspends all events.
         * @returns {Flak}
         */

    }, {
        key: 'suspendEvents',
        value: function suspendEvents() {
            return this._suspendEvent(Object.keys(this.events), true);
        }

        /**
         * Resume all events.
         * @returns {Flak}
         */

    }, {
        key: 'resumeEvents',
        value: function resumeEvents() {
            return this._suspendEvent(Object.keys(this.events), false);
        }

        /**
         * Check if an event is suspended
         * @param eventName {string}
         * @returns {boolean}
         */

    }, {
        key: 'isSuspended',
        value: function isSuspended(eventName) {
            /* istanbul ignore else  */
            if (!this.exists(eventName)) return false;
            return this.events[eventName][0].state.suspended;
        }

        /**
         * Remove all events
         * @returns {Flak}
         * @example
         * emitter.clear();
         */

    }, {
        key: 'clear',
        value: function clear() {
            this.events = [];
            return this;
        }

        /**
         * Get listeners count
         * @param eventName {string} event name
         * @returns {number}
         * @example
         * emitter.on('event', listener1);
         * emitter.on('event', listener2);
         * emitter.on('event1', listener3);
         *
         * emitter.getListenersCount('event'); // 2
         */

    }, {
        key: 'getListenersCount',
        value: function getListenersCount(eventName) {
            return this.getListeners(eventName).length;
        }

        /**
         * Get listeners list of event
         * @param eventName {string} event name
         * @returns {Array}
         */

    }, {
        key: 'getListeners',
        value: function getListeners(eventName) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            if (!this.exists(eventName)) throw new Error(error[5]);

            return this.events[eventName];
        }

        /**
         * Get events list
         * @returns {Object}
         */

    }, {
        key: 'getEvents',
        value: function getEvents() {
            return this.events;
        }

        /**
         * Check if event exists
         * @param eventName {string} event name
         * @returns {boolean}
         */

    }, {
        key: 'exists',
        value: function exists(eventName) {
            if (!helper.is(eventName, 'string')) throw new Error(error[0]);

            return !helper.is(this.events[eventName], 'undefined');
        }

        /**
         * Get max number of listeners per event
         * @returns {number}
         */

    }, {
        key: 'getMaxListeners',
        value: function getMaxListeners() {
            return this.opts.maxListeners;
        }

        /**
         * Set max number of listeners per event
         * @param value {int} number max listeners
         * @returns {Flak}
         */

    }, {
        key: 'setMaxListeners',
        value: function setMaxListeners(value) {
            if (!helper.is(value, 'number')) throw new Error(error[2]);

            this.opts.maxListeners = value;
            return this;
        }

        /**
         * Triggered when an event is fired
         * @param callback {Function} callback function
         * @returns {Flak}
         * @since 0.2.0
         * @example
         * emitter.onCatchAll(args=>{
         *      // args is an array of params
         *      console.log(args);
         * });
         *
         * emitter.on('myEvent', param=>{
         *      console.log(param);
         * });
         *
         * emitter.fire('myEvent');
         */

    }, {
        key: 'onCatchAll',
        value: function onCatchAll(callback) {
            this._catchAll = callback;
            return this;
        }

        /**
         * Triggered when an event is created
         * @param callback {Function} callback function
         * @returns {Flak}
         * @example
         * emitter.onCreated(obj=>{
         *      console.log(obj); //-> eventName, listener, opts
         * });
         *
         * emitter.on('myEvent', (param)=>{
         *      console.log(param);
         * });
         */

    }, {
        key: 'onCreated',
        value: function onCreated(callback) {
            this._created = callback;
            return this;
        }

        /**
         * Triggered when an event is removed
         * @param callback {Function} callback function
         * @returns {Flak}
         * @example
         * emitter.onRemoved(obj=>{
         *      console.log(obj); //-> eventName, (listener)
         * });
         *
         * emitter.off('myEvent');
         */

    }, {
        key: 'onRemoved',
        value: function onRemoved(callback) {
            this._removed = callback;
            return this;
        }
    }]);

    return Flak;
}();

module.exports = Flak;
module.exports._error = error;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var helper = {};

/**
 * Get object type
 * @param object {*}
 * @param type {string}
 * @returns {boolean}
 */
helper.is = function (object, type) {
    var objectToString = Object.prototype.toString.call(object);
    return objectToString.toLowerCase() === '[object ' + type + ']'.toLowerCase();
};

/**
 * Set default value
 * @param opts {Object} options
 * @param defaultOpts {Object} default options
 * @returns {*}
 */
helper.defaults = function (opts, defaultOpts) {
    for (var i in defaultOpts) {
        if (defaultOpts.hasOwnProperty(i)) if (!opts.hasOwnProperty(i)) {
            opts[i] = defaultOpts[i];
        } else {
            if (_typeof(opts[i]) === 'object') {
                helper.defaults(opts[i], defaultOpts[i]);
            }
        }
    }
    return opts;
};

module.exports = helper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ['event name is required and must be a string', 'listener is required and must be a function or an array of function', 'value must be a number', 'increase maxListeners per event: ', 'event name not valid', 'event not found'];

/***/ })
/******/ ]);
}); 