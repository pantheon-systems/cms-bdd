"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = info;
exports.error = error;
exports.warn = warn;
exports.debug = debug;
function formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
}
function info(message) {
    console.log(formatMessage('INFO', message));
}
function error(message) {
    console.error(formatMessage('ERROR', message));
}
function warn(message) {
    console.warn(formatMessage('WARN', message));
}
function debug(message) {
    console.debug(formatMessage('DEBUG', message));
}
//# sourceMappingURL=logger.js.map