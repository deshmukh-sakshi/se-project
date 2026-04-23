import prisma from '../config/prisma.js';

async function testConnection() {
  try {
    console.log('🔌 Testing Supabase database connection...');
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
    console.log('1. Check if your Supabase project is active');
    console.log('2. Visit https://supabase.com/dashboard to verify');
    console.log('3. Verify your DATABASE_URL in .env file');
    console.log('4. Ensure your database credentials are correct');
    process.exit(1);
  }
}

testConnection();
