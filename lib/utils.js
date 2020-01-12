module.exports = {
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'DEL'],
    isString: function (str) {
        if (typeof str !== 'string')
            throw new Error(str + " is not String!");
    },
    isFunction: function (fn) {
        if (typeof fn !== 'function')
            throw new Error(fn + " is not Function!");
    }
};
