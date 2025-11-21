const { MongoClient, ObjectId } = require('mongodb');

let client = null;
let db = null;

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || !process.env.DB_NAME) {
      throw new Error('Missing required environment variables: MONGODB_URI or DB_NAME');
    }

    if (db) {
      return db;
    }

    client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    db = client.db(process.env.DB_NAME);
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    if (!collectionNames.includes('lessons')) {
      await db.createCollection('lessons');
      console.log('Created lessons collection');
    }
    
    if (!collectionNames.includes('orders')) {
      await db.createCollection('orders');
      console.log('Created orders collection');
    }
    
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

const closeDB = async () => {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      console.log('MongoDB connection closed');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

module.exports = {
  connectDB,
  getDB,
  closeDB,
  ObjectId
};
