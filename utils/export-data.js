require('dotenv').config();
const { connectDB, closeDB } = require('./database');
const fs = require('fs');
const path = require('path');

const exportData = async () => {
  try {
    console.log('Connecting to database...');
    const db = await connectDB();
    
    // Create exports directory if it doesn't exist
    const exportsDir = path.join(__dirname, '..', 'data', 'exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }
    
    // Export lessons
    console.log('Exporting lessons...');
    const lessons = await db.collection('lessons').find({}).toArray();
    const lessonsPath = path.join(exportsDir, 'lessons.json');
    fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2));
    console.log(`Exported ${lessons.length} lessons to ${lessonsPath}`);
    
    // Export orders
    console.log('Exporting orders...');
    const orders = await db.collection('orders').find({}).toArray();
    const ordersPath = path.join(exportsDir, 'orders.json');
    fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
    console.log(`Exported ${orders.length} orders to ${ordersPath}`);
    
    console.log('Export completed successfully!');
  } catch (error) {
    console.error('Export failed:', error);
  } finally {
    await closeDB();
  }
};

// Run if executed directly
if (require.main === module) {
  exportData();
}

module.exports = exportData;
