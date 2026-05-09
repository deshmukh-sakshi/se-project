import prisma from '../config/prisma.js';

const sampleProducts = [
  {
    brandName: 'ACC Cement',
    category: 'CEMENT',
    unit: 'BAGS',
    stockQuantity: 500,
    basePrice: 350,
    lowStockThreshold: 50,
    description: 'Premium quality cement for construction'
  },
  {
    brandName: 'UltraTech Cement',
    category: 'CEMENT',
    unit: 'BAGS',
    stockQuantity: 300,
    basePrice: 360,
    lowStockThreshold: 50,
    description: 'High strength cement for all construction needs'
  },
  {
    brandName: 'Ambuja Cement',
    category: 'CEMENT',
    unit: 'BAGS',
    stockQuantity: 8,
    basePrice: 355,
    lowStockThreshold: 50,
    description: 'Quality cement for residential projects (LOW STOCK)'
  },
  {
    brandName: 'Tata Steel TMT Bars',
    category: 'STEEL',
    unit: 'TONS',
    stockQuantity: 25,
    basePrice: 55000,
    lowStockThreshold: 5,
    description: '12mm TMT bars for reinforcement'
  },
  {
    brandName: 'JSW Steel TMT Bars',
    category: 'STEEL',
    unit: 'TONS',
    stockQuantity: 15,
    basePrice: 54500,
    lowStockThreshold: 5,
    description: '16mm TMT bars for heavy construction'
  },
  {
    brandName: 'SAIL Steel TMT Bars',
    category: 'STEEL',
    unit: 'TONS',
    stockQuantity: 3,
    basePrice: 53500,
    lowStockThreshold: 5,
    description: '10mm TMT bars for light construction (LOW STOCK)'
  },
  {
    brandName: '20mm Aggregate',
    category: 'AGGREGATE',
    unit: 'CUBIC_METER',
    stockQuantity: 80,
    basePrice: 1500,
    lowStockThreshold: 15,
    description: 'Coarse aggregate for concrete mixing'
  },
  {
    brandName: '10mm Aggregate',
    category: 'AGGREGATE',
    unit: 'CUBIC_METER',
    stockQuantity: 60,
    basePrice: 1400,
    lowStockThreshold: 15,
    description: 'Fine aggregate for concrete work'
  },
  {
    brandName: 'White Cement',
    category: 'OTHER',
    unit: 'BAGS',
    stockQuantity: 45,
    basePrice: 450,
    lowStockThreshold: 10,
    description: 'Premium white cement for finishing work'
  },
  {
    brandName: 'Construction Adhesive',
    category: 'OTHER',
    unit: 'BAGS',
    stockQuantity: 30,
    basePrice: 280,
    lowStockThreshold: 10,
    description: 'Tile adhesive and bonding agent'
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...\n');

    // Clear existing products
    console.log('🗑️  Clearing existing products...');
    await prisma.marketRate.deleteMany({});
    await prisma.product.deleteMany({});
    console.log('✅ Existing products cleared\n');

    // Create products with market rates
    console.log('📦 Creating sample products...');
    for (const productData of sampleProducts) {
      const product = await prisma.product.create({
        data: productData
      });

      // Create initial market rate
      await prisma.marketRate.create({
        data: {
          productId: product.id,
          basePrice: productData.basePrice,
          source: 'seed'
        }
      });

      console.log(`  ✓ ${product.brandName} (${product.category})`);
    }

    console.log(`\n✅ Successfully seeded ${sampleProducts.length} products!`);
    console.log('\n📊 Product Summary:');
    console.log(`   - CEMENT: ${sampleProducts.filter(p => p.category === 'CEMENT').length}`);
    console.log(`   - STEEL: ${sampleProducts.filter(p => p.category === 'STEEL').length}`);
    console.log(`   - SAND: ${sampleProducts.filter(p => p.category === 'SAND').length}`);
    console.log(`   - AGGREGATE: ${sampleProducts.filter(p => p.category === 'AGGREGATE').length}`);
    console.log(`   - BRICKS: ${sampleProducts.filter(p => p.category === 'BRICKS').length}`);
    console.log(`   - OTHER: ${sampleProducts.filter(p => p.category === 'OTHER').length}`);
    console.log(`\n⚠️  Low Stock Items: ${sampleProducts.filter(p => p.stockQuantity <= p.lowStockThreshold).length}`);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts()
  .then(() => {
    console.log('\n🎉 Product seeding completed!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Product seeding failed:', error);
    process.exit(1);
  });
