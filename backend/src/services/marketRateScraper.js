import prisma from '../config/prisma.js';

/**
 * Market Rate Scraper Service
 * Simulates fetching market rates from external sources
 * In production, this would scrape real market data or call external APIs
 */

/**
 * Mock market rate fluctuation
 * Simulates realistic price changes based on market conditions
 */
function generateMarketFluctuation(currentPrice, category) {
  // Different volatility for different categories
  const volatility = {
    CEMENT: 0.03,      // ±3% fluctuation
    STEEL: 0.05,       // ±5% fluctuation (more volatile)
    AGGREGATE: 0.02,   // ±2% fluctuation
    OTHER: 0.04        // ±4% fluctuation
  };

  const maxChange = volatility[category] || 0.03;
  
  // Random fluctuation between -maxChange and +maxChange
  const changePercent = (Math.random() * 2 - 1) * maxChange;
  const newPrice = currentPrice * (1 + changePercent);
  
  // Round to 2 decimal places
  return Math.round(newPrice * 100) / 100;
}

/**
 * Fetch mock market rates for a product
 * In production, replace with actual API calls or web scraping
 */
async function fetchMarketRate(product) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Generate new market rate based on current price
  const newRate = generateMarketFluctuation(product.basePrice, product.category);

  return {
    productId: product.id,
    brandName: product.brandName,
    category: product.category,
    oldPrice: product.basePrice,
    newPrice: newRate,
    change: Math.round((newRate - product.basePrice) * 100) / 100,
    changePercent: Math.round(((newRate - product.basePrice) / product.basePrice) * 10000) / 100,
    source: 'market_scraper',
    timestamp: new Date()
  };
}

/**
 * Update market rates for all products
 * This function should be called by the cron job
 */
export async function updateAllMarketRates() {
  try {
    console.log('🔄 Starting market rate update...');
    console.log('📅 Timestamp:', new Date().toISOString());

    // Fetch all products
    const products = await prisma.product.findMany();
    console.log(`📦 Found ${products.length} products to update`);

    const updates = [];
    let updatedCount = 0;
    let unchangedCount = 0;

    // Fetch market rates for each product
    for (const product of products) {
      const marketRate = await fetchMarketRate(product);
      
      // Only update if price changed significantly (more than ₹1 or 0.5%)
      const significantChange = Math.abs(marketRate.change) > 1 || 
                                Math.abs(marketRate.changePercent) > 0.5;

      if (significantChange) {
        // Update product base price
        await prisma.product.update({
          where: { id: product.id },
          data: { basePrice: marketRate.newPrice }
        });

        // Create market rate history entry
        await prisma.marketRate.create({
          data: {
            productId: product.id,
            basePrice: marketRate.newPrice,
            source: 'market_scraper'
          }
        });

        updatedCount++;
        updates.push(marketRate);
        
        console.log(`  ✓ ${product.brandName}: ₹${marketRate.oldPrice} → ₹${marketRate.newPrice} (${marketRate.changePercent > 0 ? '+' : ''}${marketRate.changePercent}%)`);
      } else {
        unchangedCount++;
        console.log(`  - ${product.brandName}: No significant change (${marketRate.changePercent > 0 ? '+' : ''}${marketRate.changePercent}%)`);
      }
    }

    console.log(`\n✅ Market rate update completed!`);
    console.log(`   Updated: ${updatedCount} products`);
    console.log(`   Unchanged: ${unchangedCount} products`);

    return {
      success: true,
      timestamp: new Date(),
      totalProducts: products.length,
      updatedCount,
      unchangedCount,
      updates
    };
  } catch (error) {
    console.error('❌ Market rate update failed:', error);
    throw error;
  }
}

/**
 * Get market rate history for a product
 */
export async function getMarketRateHistory(productId, limit = 30) {
  try {
    const history = await prisma.marketRate.findMany({
      where: { productId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        product: {
          select: {
            brandName: true,
            category: true,
            unit: true
          }
        }
      }
    });

    return history;
  } catch (error) {
    console.error('Failed to fetch market rate history:', error);
    throw error;
  }
}

/**
 * Get latest market rates for all products
 */
export async function getLatestMarketRates() {
  try {
    const products = await prisma.product.findMany({
      include: {
        marketRates: {
          orderBy: { timestamp: 'desc' },
          take: 2 // Get last 2 to calculate change
        }
      }
    });

    return products.map(product => {
      const latest = product.marketRates[0];
      const previous = product.marketRates[1];

      let change = 0;
      let changePercent = 0;

      if (latest && previous) {
        change = latest.basePrice - previous.basePrice;
        changePercent = (change / previous.basePrice) * 100;
      }

      return {
        productId: product.id,
        brandName: product.brandName,
        category: product.category,
        currentPrice: product.basePrice,
        lastUpdated: latest?.timestamp,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
      };
    });
  } catch (error) {
    console.error('Failed to fetch latest market rates:', error);
    throw error;
  }
}

/**
 * Manual market rate update for a specific product
 */
export async function updateProductMarketRate(productId, newPrice, source = 'manual') {
  try {
    // Update product base price
    const product = await prisma.product.update({
      where: { id: productId },
      data: { basePrice: newPrice }
    });

    // Create market rate history entry
    await prisma.marketRate.create({
      data: {
        productId,
        basePrice: newPrice,
        source
      }
    });

    console.log(`✅ Updated market rate for ${product.brandName}: ₹${newPrice}`);

    return product;
  } catch (error) {
    console.error('Failed to update product market rate:', error);
    throw error;
  }
}
