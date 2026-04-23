import prisma from '../config/prisma.js';

/**
 * Check database connection health
 */
export async function checkDatabaseHealth() {
  try {
    console.log('🔍 Checking Supabase database connection...');
    
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1`;
    
    console.log('✅ Supabase database is healthy and ready!');
    return true;
  } catch (error) {
    console.error('❌ Supabase database health check failed:', error.message);
    throw new Error('Database connection failed. Please check your Supabase dashboard.');
  }
}

/**
 * Middleware to ensure database is connected before handling requests
 */
export function ensureDatabaseAwake() {
  return async (req, res, next) => {
    try {
      // Quick connection test
      await prisma.$queryRaw`SELECT 1`;
      next();
    } catch (error) {
      console.error('❌ Database connection error:', error.message);
      res.status(503).json({
        error: 'Database temporarily unavailable',
        message: 'Unable to connect to database. Please try again.',
      });
    }
  };
}
