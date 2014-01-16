/**
 * @fileOverview
 * Get an a set a properties by a path with optional separator character.
 */
'use strict';
var is = require('is2');
var inspect = require('util').inspect;

/**
 * Given an object and a char-separated path, return the value at the path
 * or false if no such value can be found.
 * @param {Object} obj An object upon which to apply the path.
 * @param {String} path The path to traverse the object, e.g 'a.b.c'
 * @param {String} [sep] The separator char to delimit the properties in the path. Optional. If not specified, '.' is assumed.
 * @return {Undefined|Any} returns the value, if found or undefined otherwise.
 */
module.exports.get = function(obj, path, sep) {

    if (!is.nonEmptyStr(sep))
        sep = '.';

    if (!is.obj(obj))
        throw new Error('reveived bad parameter for obj: '+inspect(obj));

    if (!is.nonEmptyString(path))
        throw new Error('reveived bad parameter for path: '+inspect(obj));

    var properties = path.split(sep);
    var currVal = obj;

    for (var i=0; i<properties.length; i++) {
        var currPropertyName = properties[i];
        if (!currVal.hasOwnProperty(currPropertyName)) {
            return undefined;
        }
        currVal = currVal[currPropertyName];
    }

    return currVal;
};

/**
 * Given an object and a '/' separated path, return the value at the path
 * or false if no such value can be found.
 *  FIXME: If you try to set a value that does not exist, it silently fails
 * @param {Object} obj An object upon which to apply the path.
 * @param {String} path The path to traverse the object, e.g 'a.b.c'
 * @param {Any} value The value to set the property to.
 * @param {String} [sep] The separator char to delimit the properties in the path. Optional. If not specified, '.' is assumed.
 * @return {Undefined|Any} returns the value set, if the property is found or undefined otherwise.
 */
module.exports.set = function(obj, path, value, sep) {

    if (!is.nonEmptyStr(sep))
        sep = '.';

    if (!is.obj(obj))
        throw new Error('reveived bad parameter for obj: '+inspect(obj));

    if (!is.nonEmptyString(path))
        throw new Error('reveived bad parameter for path: '+inspect(obj));

    var arr = path.split(sep);

    var currVal = obj;
    for (var i=0, max=arr.length-1; i<max; i++) {
        // make sure the key exists
        currVal[arr[i]] = currVal[arr[i]] || {};
        if (!currVal)
            return undefined;

        // move one level deeper
        currVal = currVal[arr[i]];
    }

    // set the value in the last level
    currVal[arr[arr.length-1]] = value;
    return currVal[arr[arr.length-1]];
};
