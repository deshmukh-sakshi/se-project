import prisma from '../config/prisma.js';

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    console.log('📍 Host:', process.env.DATABASE_URL?.split('@')[1]?.split('/')[0]);
    
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    const userCount = await prisma.user.count();
    console.log(`📊 Found ${userCount} users in database`);
    
    await prisma.$disconnect();
    console.log('👋 Disconnected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('1. Check if your Neon database is active (may be sleeping)');
    console.log('2. Visit https://console.neon.tech to wake it up');
    console.log('3. Verify your DATABASE_URL in .env file');
    console.log('4. Ensure your IP is not blocked by firewall');
    process.exit(1);
  }
}

testConnection();
