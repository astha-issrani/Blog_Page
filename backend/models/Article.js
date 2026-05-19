const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{ type: String }],
  claps: {
    type: Number,
    default: 0
  },
  clappedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  readTime: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  },
  coverImage: { type: String, default: null },
}, { timestamps: true },
);

// Auto-calculate read time before save
articleSchema.pre('save', function (next) {
  const wordCount = this.content.split(/\s+/).filter(Boolean).length;
  this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  next();
});

module.exports = mongoose.model('Article', articleSchema);