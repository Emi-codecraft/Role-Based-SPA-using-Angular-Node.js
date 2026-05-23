"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayMiddleware = void 0;
const delayMiddleware = (_req, _res, next) => {
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    console.log(`⏳ Simulating ${delay}ms API delay...`);
    setTimeout(() => next(), delay);
};
exports.delayMiddleware = delayMiddleware;
//# sourceMappingURL=delay.middleware.js.map