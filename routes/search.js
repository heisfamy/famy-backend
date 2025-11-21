const express = require('express');
const router = express.Router();
const { getDB } = require('../utils/database');

// GET /search?q=query - Search lessons
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }
    
    // Create case-insensitive regex for searching
    const searchRegex = new RegExp(searchQuery, 'i');
    
    // Search across multiple fields
    const searchFilter = {
      $or: [
        { subject: searchRegex },
        { location: searchRegex },
        { price: isNaN(searchQuery) ? null : Number(searchQuery) },
        { spaces: isNaN(searchQuery) ? null : Number(searchQuery) }
      ].filter(condition => {
        // Remove null conditions (for numeric fields when query is not a number)
        return condition[Object.keys(condition)[0]] !== null;
      })
    };
    
    const lessons = await db.collection('lessons').find(searchFilter).toArray();
    
    res.json({
      query: searchQuery,
      count: lessons.length,
      results: lessons
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
