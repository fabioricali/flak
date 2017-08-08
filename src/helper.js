const helper = {};

/**
 * Get prototype class
 * @param object {*}
 * @param className {string}
 * @returns {boolean}
 */
helper.is = (object, className) => {
    let objectToString = Object.prototype.toString.call(object);
    return objectToString.toLowerCase() === '[object ' + className + ']'.toLowerCase();
};

/**
 * Set default value
 * @param opts {Object} options
 * @param defaultOpts {Object} default options
 * @returns {*}
 */
helper.defaults = (opts, defaultOpts) => {
    for (let i in defaultOpts) {
        if(defaultOpts.hasOwnProperty(i))
            if (!opts.hasOwnProperty(i)) {
                opts[i] = defaultOpts[i];
            } else {
                if (typeof opts[i] === 'object') {
                    helper.defaults(opts[i], defaultOpts[i]);
                }
            }
    }
    return opts;
};

/**
 *
 * @param itemName {string} item that you want find
 * @param array {Array} array where to look
 * @returns {Array}
 */
helper.findArrayIndex = (itemName, array) => {
    let index = [];
    for(let i in array) {
        if(array.hasOwnProperty(i) && array[i] === itemName)
            index.push(Number(i));
    }
    return index;
};

module.exports = helper;