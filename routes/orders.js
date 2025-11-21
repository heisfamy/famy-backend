const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/database');

// POST /orders - Create a new order
router.post('/', async (req, res, next) => {
  try {
    const db = getDB();
    const { name, phone, lessonIDs, numSpaces } = req.body;
    
    // Validate required fields
    if (!name || !phone || !lessonIDs || !numSpaces) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, phone, lessonIDs, numSpaces' 
      });
    }
    
    // Validate arrays have same length
    if (lessonIDs.length !== numSpaces.length) {
      return res.status(400).json({ 
        error: 'lessonIDs and numSpaces arrays must have the same length' 
      });
    }
    
    // Create order document
    const order = {
      name,
      phone,
      lessonIDs,
      numSpaces,
      timestamp: new Date(),
      status: 'confirmed'
    };
    
    // Insert order into database
    const result = await db.collection('orders').insertOne(order);
    
    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId,
      order: {
        ...order,
        _id: result.insertedId
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /orders - Get all orders (for admin purposes)
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    const orders = await db.collection('orders').find({}).toArray();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
