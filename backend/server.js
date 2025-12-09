const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 3030;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Skate API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Helper function to convert trick object (done: 0/1 -> boolean)
function formatTrick(trick) {
  return {
    ...trick,
    done: Boolean(trick.done)
  };
}

// Tricks endpoints with database
app.get('/api/tricks', (req, res) => {
  try {
    const tricks = db.prepare('SELECT * FROM tricks').all();
    const formattedTricks = tricks.map(formatTrick);
    res.json({ tricks: formattedTricks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tricks/:id', (req, res) => {
  try {
    const trick = db.prepare('SELECT * FROM tricks WHERE id = ?').get(req.params.id);
    if (!trick) {
      return res.status(404).json({ error: 'Trick not found' });
    }
    res.json({ trick: formatTrick(trick) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tricks', (req, res) => {
  try {
    const { name, category, difficulty, done } = req.body;
    if (!name || !category || difficulty === undefined) {
      return res.status(400).json({ error: 'Name, category, and difficulty are required' });
    }
    
    const doneValue = done ? 1 : 0;
    const result = db.prepare('INSERT INTO tricks (name, category, difficulty, done) VALUES (?, ?, ?, ?)').run(name, category, difficulty, doneValue);
    const trick = db.prepare('SELECT * FROM tricks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ message: 'Trick created', trick: formatTrick(trick) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tricks/:id', (req, res) => {
  try {
    const { name, category, difficulty, done } = req.body;
    if (!name || !category || difficulty === undefined) {
      return res.status(400).json({ error: 'Name, category, and difficulty are required' });
    }
    
    const doneValue = done ? 1 : 0;
    const result = db.prepare('UPDATE tricks SET name = ?, category = ?, difficulty = ?, done = ? WHERE id = ?').run(name, category, difficulty, doneValue, req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Trick not found' });
    }
    const trick = db.prepare('SELECT * FROM tricks WHERE id = ?').get(req.params.id);
    res.json({ message: 'Trick updated', trick: formatTrick(trick) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tricks/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM tricks WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Trick not found' });
    }
    res.json({ message: 'Trick deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

