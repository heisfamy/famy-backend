const express = require('express');
const router = express.Router();
const { getDB, ObjectId } = require('../utils/database');

// GET /lessons - Get all lessons
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    const lessons = await db.collection('lessons').find({}).toArray();
    res.json(lessons);
  } catch (error) {
    next(error);
  }
});

// GET /lessons/:id - Get single lesson by ID
router.get('/:id', async (req, res, next) => {
  try {
    const db = getDB();
    const lessonId = req.params.id;
    
    // Try to find by string ID first (for seed data)
    let lesson = await db.collection('lessons').findOne({ _id: lessonId });
    
    // If not found and ID looks like an ObjectId, try with ObjectId
    if (!lesson && /^[0-9a-fA-F]{24}$/.test(lessonId)) {
      lesson = await db.collection('lessons').findOne({ _id: new ObjectId(lessonId) });
    }
    
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    next(error);
  }
});

// PUT /lessons/:id - Update lesson
router.put('/:id', async (req, res, next) => {
  try {
    const db = getDB();
    const lessonId = req.params.id;
    const updateData = req.body;
    
    // Remove _id from update data if present
    delete updateData._id;
    
    // Try to update by string ID first
    let result = await db.collection('lessons').updateOne(
      { _id: lessonId },
      { $set: updateData }
    );
    
    // If not found and ID looks like an ObjectId, try with ObjectId
    if (result.matchedCount === 0 && /^[0-9a-fA-F]{24}$/.test(lessonId)) {
      result = await db.collection('lessons').updateOne(
        { _id: new ObjectId(lessonId) },
        { $set: updateData }
      );
    }
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Fetch and return the updated lesson
    let updatedLesson = await db.collection('lessons').findOne({ _id: lessonId });
    if (!updatedLesson) {
      updatedLesson = await db.collection('lessons').findOne({ _id: new ObjectId(lessonId) });
    }
    
    res.json({
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
