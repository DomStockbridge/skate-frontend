const Database = require('better-sqlite3');
const path = require('path');

// Create/connect to database file
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database tables
function initDatabase() {
  // Tricks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tricks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty INTEGER NOT NULL,
      done INTEGER DEFAULT 0
    )
  `);

  // Add 'done' column if it doesn't exist (for existing databases)
  try {
    db.exec(`ALTER TABLE tricks ADD COLUMN done INTEGER DEFAULT 0`);
  } catch (error) {
    // Column already exists, ignore error
  }

  console.log('Database initialized successfully');
}

// Initialize on load
initDatabase();

module.exports = db;

