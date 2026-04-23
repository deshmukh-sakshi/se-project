import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import pricingRoutes from './routes/pricing.routes.js';
import marketRateRoutes from './routes/marketRate.routes.js';
import { checkDatabaseHealth, ensureDatabaseAwake } from './utils/dbHealthCheck.js';
import { startMarketRateCron } from './services/cronJobs.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route (no DB required)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'BMMS Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Database health check route
app.get('/api/health/db', async (req, res) => {
  try {
    await checkDatabaseHealth();
    res.json({
      status: 'ok',
      message: 'Database connection is healthy',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Apply database wake-up middleware to all API routes
app.use('/api', ensureDatabaseAwake());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/market-rates', marketRateRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with database health check
async function startServer() {
  try {
    console.log('🚀 Starting BMMS Backend...');
    console.log('📊 Environment:', process.env.NODE_ENV || 'development');
    
    // Check database connection on startup
    console.log('\n🔍 Checking database connection...');
    await checkDatabaseHealth();
    
    app.listen(PORT, () => {
      console.log(`\n✅ Server running on http://localhost:${PORT}`);
      console.log('💡 Supabase database connected and ready');
      
      // Start cron jobs
      console.log('\n⏰ Starting scheduled tasks...');
      startMarketRateCron();
      console.log('');
    });
  } catch (error) {
    console.error('\n❌ Failed to start server:', error.message);
    console.error('💡 Please check your Supabase database connection and try again\n');
    process.exit(1);
  }
}

startServer();
