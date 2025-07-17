const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite setup
const db = new sqlite3.Database(path.join(__dirname, 'comments.db'));

db.run(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Get all comments
app.get('/api/comments', (req, res) => {
  db.all('SELECT * FROM comments ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Post a new comment
app.post('/api/comments', (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: 'Name and comment are required' });
  }

  const stmt = db.prepare('INSERT INTO comments (name, comment) VALUES (?, ?)');
  stmt.run(name, comment, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, name, comment, created_at: new Date().toISOString() });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Comment server running at http://localhost:${PORT}`);
});