"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_function_1 = __importDefault(require("is-function"));
const ErrorMessages_1 = require("./ErrorMessages");
function arrayIfThenElse(array, searchElementOrCallback, thenResult = true, elseResult = false) {
    if (!Array.isArray(array)) {
        throw ErrorMessages_1.errorMessages.argumentIsNotAnArray;
    }
    let callback = null;
    if (is_function_1.default(searchElementOrCallback)) {
        callback = searchElementOrCallback;
    }
    else {
        callback = element => element === searchElementOrCallback;
    }
    const meetsCondition = arraySomeWithBooleanCallback(array, callback);
    return meetsCondition ? thenResult : elseResult;
}
exports.default = arrayIfThenElse;
function arraySomeWithBooleanCallback(array, callback) {
    let result = false;
    let element = null;
    let lastCallbackResult = null;
    for (let i = 0; i < array.length; ++i) {
        element = array[i];
        lastCallbackResult = callback(element);
        const isResultStrictBoolean = !(lastCallbackResult === false || lastCallbackResult === true);
        if (isResultStrictBoolean) {
            throw ErrorMessages_1.errorMessages.callbackReturnsNoStrictBoolean;
        }
        if (lastCallbackResult) {
            result = true;
            break;
        }
    }
    return result;
}
//# sourceMappingURL=index.js.map