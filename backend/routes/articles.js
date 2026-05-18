const express = require('express');
const Article = require('../models/Article');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/articles — get all published articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published' })
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/articles/user/my — get logged in user's articles
router.get('/user/my', protect, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/articles/:id — get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email bio');
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json({ article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/articles — create article
router.post('/', protect, async (req, res) => {
  try {
    const { title, subtitle, content, tags, status } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: 'Title and content are required' });

    const article = await Article.create({
      title,
      subtitle: subtitle || '',
      content,
      tags: tags || [],
      author: req.user._id,
      status: status || 'published',
    });

    await article.populate('author', 'name email');
    res.status(201).json({ article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/articles/:id/clap
router.post('/:id/clap', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    const already = article.clappedBy.includes(req.user._id);
    if (already) {
      article.clappedBy.pull(req.user._id);
      article.claps = Math.max(0, article.claps - 1);
    } else {
      article.clappedBy.push(req.user._id);
      article.claps += 1;
    }
    await article.save();
    res.json({ claps: article.claps, clapped: !already });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/articles/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Not found' });
    if (article.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;