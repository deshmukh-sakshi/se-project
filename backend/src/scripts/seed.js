import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user with email
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@deshmukh.com' },
      update: {},
      create: {
        name: 'Admin User',
        phone: '9999999999',
        email: 'admin@deshmukh.com',
        passwordHash: adminPassword,
        role: 'ADMIN'
      }
    });
    console.log('✅ Admin user created:', admin.email);

    // Create sample customer with phone only
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = await prisma.user.upsert({
      where: { phone: '8888888888' },
      update: {},
      create: {
        name: 'Sample Customer',
        phone: '8888888888',
        passwordHash: customerPassword,
        role: 'CUSTOMER'
      }
    });
    console.log('✅ Customer user created (phone):', customer.phone);

    // Create sample customer with email only
    const customer2Password = await bcrypt.hash('customer123', 10);
    const customer2 = await prisma.user.upsert({
      where: { email: 'contractor@example.com' },
      update: {},
      create: {
        name: 'Contractor User',
        email: 'contractor@example.com',
        passwordHash: customer2Password,
        role: 'CUSTOMER'
      }
    });
    console.log('✅ Customer user created (email):', customer2.email);

    console.log('\n🎉 Seeding completed!');
    console.log('\nTest Credentials:');
    console.log('Admin - Email: admin@deshmukh.com OR Phone: 9999999999, Password: admin123');
    console.log('Customer 1 - Phone: 8888888888, Password: customer123');
    console.log('Customer 2 - Email: contractor@example.com, Password: customer123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
