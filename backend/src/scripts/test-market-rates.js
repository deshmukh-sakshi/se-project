import { updateAllMarketRates, getLatestMarketRates } from '../services/marketRateScraper.js';
import prisma from '../config/prisma.js';

async function testMarketRates() {
  try {
    console.log('🧪 Testing Market Rate System\n');
    console.log('═'.repeat(60));
    
    // Show current rates
    console.log('\n📊 CURRENT MARKET RATES:');
    console.log('─'.repeat(60));
    const currentRates = await getLatestMarketRates();
    currentRates.forEach(rate => {
      console.log(`${rate.brandName.padEnd(25)} ₹${rate.currentPrice.toString().padStart(8)} ${rate.category.padEnd(12)}`);
    });
    
    // Trigger update
    console.log('\n🔄 TRIGGERING MARKET RATE UPDATE...\n');
    const result = await updateAllMarketRates();
    
    // Show updated rates
    console.log('\n📊 UPDATED MARKET RATES:');
    console.log('─'.repeat(60));
    const updatedRates = await getLatestMarketRates();
    updatedRates.forEach(rate => {
      const trend = rate.trend === 'up' ? '📈' : rate.trend === 'down' ? '📉' : '➡️';
      const changeStr = rate.change !== 0 ? ` (${rate.change > 0 ? '+' : ''}₹${rate.change})` : '';
      console.log(`${rate.brandName.padEnd(25)} ₹${rate.currentPrice.toString().padStart(8)} ${trend}${changeStr}`);
    });
    
    console.log('\n═'.repeat(60));
    console.log('✅ Market rate test completed!\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

testMarketRates();
