"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL'],
    isString(str) {
        if (typeof str !== 'string')
            throw new Error(`${str} is not String!`);
    },
    isFunction(fn) {
        if (typeof fn !== 'function')
            throw new Error(`${fn} is not Function!`);
    },
};
