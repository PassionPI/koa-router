"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isString(str) {
    if (typeof str !== 'string')
        throw new Error(`${str} is not String!`);
    return str;
}
exports.isString = isString;
function isFunction(fn) {
    if (typeof fn !== 'function')
        throw new Error(`${fn} is not Function!`);
    return fn;
}
exports.isFunction = isFunction;
function isKeyValArr(arr) {
    if (Array.isArray(arr)) {
        arr.forEach(([key, val]) => (isString(key), isString(val)));
        return arr;
    }
    else if (arr === undefined) {
        return [];
    }
    else {
        throw new Error(`${arr} is not Array!`);
    }
}
exports.isKeyValArr = isKeyValArr;
