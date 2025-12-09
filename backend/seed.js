const db = require('./database');

const tricks = [
  { "name": "Ollie", "category": "flatground", "difficulty": 1 },
  { "name": "Nollie", "category": "flatground", "difficulty": 1 },
  { "name": "Shuvit", "category": "flatground", "difficulty": 1 },
  { "name": "Pop Shuvit", "category": "flatground", "difficulty": 1 },
  { "name": "Manual", "category": "flatground", "difficulty": 1 },
  { "name": "Nose Manual", "category": "flatground", "difficulty": 1 },
  { "name": "Kickturn", "category": "flatground", "difficulty": 1 },
  { "name": "Powerslide", "category": "flatground", "difficulty": 1 },
  { "name": "180 Ollie Frontside", "category": "flatground", "difficulty": 2 },
  { "name": "180 Ollie Backside", "category": "flatground", "difficulty": 2 },
  { "name": "Half Cab", "category": "flatground", "difficulty": 2 },
  { "name": "180 Shuvit", "category": "flatground", "difficulty": 2 },
  { "name": "Boneless", "category": "flatground", "difficulty": 2 },
  { "name": "No Comply", "category": "flatground", "difficulty": 2 },
  { "name": "Boardslide", "category": "slide", "difficulty": 2 },
  { "name": "Frontside Boardslide", "category": "slide", "difficulty": 2 },
  { "name": "50-50 Grind", "category": "grind", "difficulty": 2 },
  { "name": "Kickflip", "category": "flip", "difficulty": 3 },
  { "name": "Heelflip", "category": "flip", "difficulty": 3 },
  { "name": "Varial Kickflip", "category": "flip", "difficulty": 3 },
  { "name": "Varial Heelflip", "category": "flip", "difficulty": 3 },
  { "name": "Frontside 50-50 Grind", "category": "grind", "difficulty": 3 },
  { "name": "5-0 Grind", "category": "grind", "difficulty": 3 },
  { "name": "Nosegrind", "category": "grind", "difficulty": 3 },
  { "name": "Smith Grind", "category": "grind", "difficulty": 3 },
  { "name": "Feeble Grind", "category": "grind", "difficulty": 3 },
  { "name": "Tailslide", "category": "slide", "difficulty": 3 },
  { "name": "Noseslide", "category": "slide", "difficulty": 3 },
  { "name": "360 Flip (Tre Flip)", "category": "flip", "difficulty": 4 },
  { "name": "Hardflip", "category": "flip", "difficulty": 4 },
  { "name": "Inward Heelflip", "category": "flip", "difficulty": 4 },
  { "name": "Laser Flip", "category": "flip", "difficulty": 4 },
  { "name": "Crooked Grind", "category": "grind", "difficulty": 4 },
  { "name": "Overcrook Grind", "category": "grind", "difficulty": 4 },
  { "name": "Bluntslide", "category": "slide", "difficulty": 4 },
  { "name": "Noseblunt Slide", "category": "slide", "difficulty": 4 },
  { "name": "Impossible", "category": "flip", "difficulty": 5 },
  { "name": "Bigspin", "category": "flatground", "difficulty": 5 },
  { "name": "Bigspin Kickflip", "category": "flip", "difficulty": 5 },
  { "name": "360 Hardflip", "category": "flip", "difficulty": 5 },
  { "name": "360 Shuvit", "category": "flatground", "difficulty": 5 }
];

function seedDatabase() {
  try {
    // Clear existing tricks
    db.prepare('DELETE FROM tricks').run();
    
    // Insert all tricks
    const insert = db.prepare('INSERT INTO tricks (name, category, difficulty, done) VALUES (?, ?, ?, ?)');
    const insertMany = db.transaction((tricks) => {
      for (const trick of tricks) {
        insert.run(trick.name, trick.category, trick.difficulty, 0);
      }
    });
    
    insertMany(tricks);
    console.log(`Successfully seeded ${tricks.length} tricks into the database`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

