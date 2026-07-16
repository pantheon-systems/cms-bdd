"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHelpers = void 0;
class TestHelpers {
    static generateRandomString(length = 10) {
        return Math.random().toString(36).substring(2, length + 2);
    }
    static generateRandomEmail() {
        return `test_${this.generateRandomString()}@example.com`;
    }
    static async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static getCurrentTimestamp() {
        return new Date().toISOString();
    }
    static formatDate(date, format = 'YYYY-MM-DD') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return format
            .replace('YYYY', String(year))
            .replace('MM', month)
            .replace('DD', day);
    }
}
exports.TestHelpers = TestHelpers;
//# sourceMappingURL=helpers.js.map