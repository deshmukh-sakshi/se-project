import prisma from '../config/prisma.js';

/**
 * Check database connection health
 * Attempts to wake up Neon database if it's sleeping
 */
export async function checkDatabaseHealth() {
  const maxAttempts = 5;
  const delayMs = 3000; // 3 seconds between attempts

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`🔍 Database health check (attempt ${attempt}/${maxAttempts})...`);
      
      // Simple query to test connection
      await prisma.$queryRaw`SELECT 1`;
      
      console.log('✅ Database is healthy and ready!');
      return true;
    } catch (error) {
      console.log(`⚠️  Database not ready (attempt ${attempt}/${maxAttempts})`);
      
      if (attempt < maxAttempts) {
        console.log(`⏳ Waiting ${delayMs / 1000}s for database to wake up...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        console.error('❌ Database health check failed after all attempts');
        console.error('💡 Tip: Your Neon database may be paused. Visit https://console.neon.tech to check.');
        throw new Error('Database connection failed. Please check your Neon dashboard.');
      }
    }
  }
  
  return false;
}

/**
 * Middleware to ensure database is awake before handling requests
 */
export function ensureDatabaseAwake() {
  return async (req, res, next) => {
    try {
      // Quick connection test
      await prisma.$queryRaw`SELECT 1`;
      next();
    } catch (error) {
      if (error.code === 'P1001' || error.message?.includes("Can't reach database")) {
        console.log('🔄 Database sleeping, attempting to wake...');
        
        try {
          await checkDatabaseHealth();
          next();
        } catch (wakeError) {
          res.status(503).json({
            error: 'Database temporarily unavailable',
            message: 'The database is waking up. Please try again in a few seconds.',
            tip: 'Neon free tier databases auto-pause after inactivity'
          });
        }
      } else {
        next(error);
      }
    }
  };
}
