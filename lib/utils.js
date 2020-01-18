"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isString(str) {
    if (typeof str !== 'string')
        throw new Error(`${str} is not String!`);
}
exports.isString = isString;
function isFunction(fn) {
    if (typeof fn !== 'function')
        throw new Error(`${fn} is not Function!`);
}
exports.isFunction = isFunction;
