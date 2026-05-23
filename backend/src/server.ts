import express from 'express';
import cors from 'cors';
import { delayMiddleware } from './middleware/delay.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

// Add artificial delay to simulate real API behavior
app.use('/api', delayMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
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
