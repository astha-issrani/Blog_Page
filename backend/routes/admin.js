const express = require('express');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');
const Article = require('../models/Article')
const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    const recentUsers = await User.find({ role: 'user' })
      .sort({ createdAt: -1 }).limit(5)
      .select('name email createdAt isActive');

    res.json({
      stats: { totalUsers, activeUsers, admins: await User.countDocuments({ role: 'admin' }) },
      recentUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const totalArticles = await Article.countDocuments()
res.json({ stats: { totalUsers, activeUsers, admins, totalArticles } })

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .sort({ createdAt: -1 })
      .select('name email createdAt isActive lastLogin');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/admin/users/:id/toggle
router.patch('/users/:id/toggle', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Cannot deactivate admin accounts' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/admin/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    
    // Get article count for each user
    const usersWithCount = await Promise.all(
      users.map(async (u) => {
        const articleCount = await Article.countDocuments({ author: u._id })
        return { ...u.toObject(), articleCount }
      })
    )
    res.json({ users: usersWithCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});
// DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'Cannot delete admin accounts' });
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;