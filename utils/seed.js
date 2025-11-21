require('dotenv').config();
const { connectDB, closeDB } = require('./database');
const lessonsData = require('../data/lessons-seed.json');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    const db = await connectDB();
    
    // Clear existing data
    const lessonsCollection = db.collection('lessons');
    await lessonsCollection.deleteMany({});
    console.log('Cleared existing lessons');
    
    // Insert seed data
    const result = await lessonsCollection.insertMany(lessonsData);
    console.log(`Inserted ${result.insertedCount} lessons`);
    
    // Verify insertion
    const count = await lessonsCollection.countDocuments();
    console.log(`Total lessons in database: ${count}`);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await closeDB();
  }
};

// Run if executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
