"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Keys = exports.MIDDLE_KEYS = void 0;
var common_1 = require("@nestjs/common");
exports.MIDDLE_KEYS = 'middle keys';
var Keys = function () {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return common_1.SetMetadata(exports.MIDDLE_KEYS, __spreadArray(__spreadArray([], keys), ['iat']));
};
exports.Keys = Keys;
