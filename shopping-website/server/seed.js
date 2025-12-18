const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    numReviews: 120
  },
  {
    name: 'Smart Watch Series 5',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, water-resistant smartwatch. Compatible with iOS and Android.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.7,
    numReviews: 89
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, breathable 100% organic cotton t-shirt. Available in multiple colors. Perfect for everyday wear.',
    price: 24.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    stock: 100,
    rating: 4.3,
    numReviews: 45
  },
  {
    name: 'Leather Laptop Bag',
    description: 'Professional genuine leather laptop bag with multiple compartments. Fits laptops up to 15.6 inches.',
    price: 79.99,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 25,
    rating: 4.6,
    numReviews: 67
  },
  {
    name: 'JavaScript: The Complete Guide',
    description: 'Comprehensive guide to modern JavaScript programming. Covers ES6+, React, Node.js, and more. Perfect for beginners and advanced developers.',
    price: 34.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500',
    stock: 75,
    rating: 4.8,
    numReviews: 234
  },
  {
    name: 'Yoga Mat Pro',
    description: 'Non-slip, extra thick yoga mat with carrying strap. Eco-friendly material, perfect for yoga, pilates, and stretching.',
    price: 39.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 60,
    rating: 4.4,
    numReviews: 56
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel water bottle keeps drinks cold for 24hrs, hot for 12hrs. BPA-free, leak-proof design.',
    price: 19.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 150,
    rating: 4.7,
    numReviews: 178
  },
  {
    name: 'Gaming Mouse RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting, 16000 DPI, and 7 programmable buttons.',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    stock: 40,
    rating: 4.6,
    numReviews: 92
  },
  {
    name: 'Succulent Plant Set',
    description: 'Set of 6 assorted succulent plants in decorative pots. Low maintenance, perfect for home or office decoration.',
    price: 29.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500',
    stock: 80,
    rating: 4.5,
    numReviews: 143
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs. Microwave and dishwasher safe. Perfect for coffee, tea, or hot chocolate.',
    price: 34.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    stock: 90,
    rating: 4.4,
    numReviews: 87
  },
  {
    name: 'Portable Phone Charger 20000mAh',
    description: 'High-capacity portable power bank with fast charging. Charges most phones 4-5 times. Perfect for travel.',
    price: 29.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    stock: 65,
    rating: 4.5,
    numReviews: 201
  },
  {
    name: 'Running Shoes Pro',
    description: 'Lightweight running shoes with cushioned sole and breathable mesh. Ideal for running, jogging, and gym workouts.',
    price: 69.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 45,
    rating: 4.6,
    numReviews: 112
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@shop.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890',
      address: {
        street: '123 Admin Street',
        city: 'Admin City',
        postalCode: '12345',
        country: 'USA'
      }
    });
    console.log('✅ Created admin user - Email: admin@shop.com, Password: admin123');

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'user@shop.com',
      password: 'user123',
      role: 'user',
      phone: '+1234567891',
      address: {
        street: '456 User Street',
        city: 'User City',
        postalCode: '54321',
        country: 'USA'
      }
    });
    console.log('✅ Created test user - Email: user@shop.com, Password: user123');

    // Create products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Created ${products.length} sample products`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@shop.com, Password: admin123');
    console.log('User  - Email: user@shop.com, Password: user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
