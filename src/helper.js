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

module.exports = helper;