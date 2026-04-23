import cron from 'node-cron';
import { updateAllMarketRates } from './marketRateScraper.js';

/**
 * Cron Jobs Service
 * Manages scheduled tasks for the application
 */

let marketRateJob = null;

/**
 * Start market rate update cron job
 * Runs daily at 9:00 AM
 */
export function startMarketRateCron() {
  // Schedule: Every day at 9:00 AM
  // Cron format: minute hour day month weekday
  // '0 9 * * *' = At 9:00 AM every day
  
  marketRateJob = cron.schedule('0 9 * * *', async () => {
    console.log('\n⏰ Cron Job: Market Rate Update Triggered');
    console.log('📅 Time:', new Date().toLocaleString());
    
    try {
      const result = await updateAllMarketRates();
      console.log('✅ Cron Job: Market rates updated successfully');
      console.log(`   Updated: ${result.updatedCount} products\n`);
    } catch (error) {
      console.error('❌ Cron Job: Market rate update failed:', error.message);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Indian Standard Time
  });

  console.log('✅ Market rate cron job started (Daily at 9:00 AM IST)');
  return marketRateJob;
}

/**
 * Start market rate update cron job (for testing - runs every minute)
 * Use this for development/testing only
 */
export function startMarketRateCronTest() {
  // Schedule: Every minute for testing
  marketRateJob = cron.schedule('* * * * *', async () => {
    console.log('\n⏰ TEST Cron Job: Market Rate Update Triggered');
    console.log('📅 Time:', new Date().toLocaleString());
    
    try {
      const result = await updateAllMarketRates();
      console.log('✅ TEST Cron Job: Market rates updated successfully');
      console.log(`   Updated: ${result.updatedCount} products\n`);
    } catch (error) {
      console.error('❌ TEST Cron Job: Market rate update failed:', error.message);
    }
  }, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  console.log('✅ TEST Market rate cron job started (Every minute)');
  return marketRateJob;
}

/**
 * Stop market rate cron job
 */
export function stopMarketRateCron() {
  if (marketRateJob) {
    marketRateJob.stop();
    console.log('⏹️  Market rate cron job stopped');
  }
}

/**
 * Get cron job status
 */
export function getCronStatus() {
  return {
    marketRateJob: {
      running: marketRateJob ? true : false,
      schedule: '0 9 * * *', // Daily at 9:00 AM
      timezone: 'Asia/Kolkata',
      description: 'Updates market rates for all products daily'
    }
  };
}

/**
 * Manually trigger market rate update
 */
export async function triggerMarketRateUpdate() {
  console.log('🔄 Manual market rate update triggered');
  try {
    const result = await updateAllMarketRates();
    console.log('✅ Manual update completed successfully');
    return result;
  } catch (error) {
    console.error('❌ Manual update failed:', error);
    throw error;
  }
}
