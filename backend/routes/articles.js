const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Article = require('../models/Article');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ── Cloudinary config ─────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Multer → Cloudinary storage ───────────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'writeflow-covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 630, crop: 'fill', quality: 'auto' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
// ─────────────────────────────────────────────────────────────────────────────

// GET /api/articles — all published articles
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

// GET /api/articles/user/my — logged-in user's articles
router.get('/user/my', protect, async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user._id })
      .sort({ createdAt: -1 });
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/articles/:id — single article
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

// POST /api/articles — create article (with optional cover image)
router.post('/', protect, upload.single('coverImage'), async (req, res) => {
  try {
    let { title, subtitle, content, tags, status } = req.body;

    if (!title || !content)
      return res.status(400).json({ message: 'Title and content are required' });

    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = []; }
    }

    // Cloudinary gives us req.file.path as the secure URL
    const coverImage = req.file ? req.file.path : null;

    const article = await Article.create({
      title,
      subtitle: subtitle || '',
      content,
      tags: tags || [],
      coverImage,
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

// PUT /api/articles/:id — update article (edit draft or publish)
router.put('/:id', protect, upload.single('coverImage'), async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });

    if (article.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    let { title, subtitle, content, tags, status } = req.body;

    if (typeof tags === 'string') {
      try { tags = JSON.parse(tags); } catch { tags = []; }
    }

    if (title) article.title = title;
    if (subtitle !== undefined) article.subtitle = subtitle;
    if (content) article.content = content;
    if (tags) article.tags = tags;
    if (status) article.status = status;
    if (req.file) article.coverImage = req.file.path;

    await article.save();
    await article.populate('author', 'name email');
    res.json({ article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;