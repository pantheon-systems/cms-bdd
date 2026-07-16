"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }
    static info(message) {
        console.log(this.formatMessage('INFO', message));
    }
    static error(message) {
        console.error(this.formatMessage('ERROR', message));
    }
    static warn(message) {
        console.warn(this.formatMessage('WARN', message));
    }
    static debug(message) {
        console.debug(this.formatMessage('DEBUG', message));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map