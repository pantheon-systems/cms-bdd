"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = generateRandomString;
exports.generateRandomEmail = generateRandomEmail;
exports.wait = wait;
exports.getCurrentTimestamp = getCurrentTimestamp;
exports.formatDate = formatDate;
function generateRandomString(length = 10) {
    return Math.random()
        .toString(36)
        .substring(2, length + 2);
}
function generateRandomEmail() {
    return `test_${generateRandomString()}@example.com`;
}
async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function getCurrentTimestamp() {
    return new Date().toISOString();
}
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', day);
}
//# sourceMappingURL=helpers.js.map