"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const delay_middleware_1 = require("./middleware/delay.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express_1.default.json());
// Add artificial delay to simulate real API behavior
app.use('/api', delay_middleware_1.delayMiddleware);
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err.message);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
});
app.listen(PORT, () => {
    console.log(`\n🚀 Backend API Server running on http://localhost:${PORT}`);
    console.log(`📡 API Base URL: http://localhost:${PORT}/api`);
    console.log(`\n📋 Available endpoints:`);
    console.log(`   POST /api/auth/login    - Authenticate user`);
    console.log(`   GET  /api/users         - Get users (role-based)`);
    console.log(`   POST /api/users         - Create user (admin only)`);
    console.log(`   PUT  /api/users/:id     - Update user (admin only)`);
    console.log(`   DELETE /api/users/:id   - Delete user (admin only)`);
    console.log(`   GET  /api/health        - Health check`);
    console.log(`\n📝 Test credentials:`);
    console.log(`   Admin:   userId=admin, password=admin123, role=Admin`);
    console.log(`   User:    userId=john.doe, password=password123, role=GeneralUser`);
    console.log(`\n⏳ All API responses have 2-5s artificial delay\n`);
});
//# sourceMappingURL=server.js.map