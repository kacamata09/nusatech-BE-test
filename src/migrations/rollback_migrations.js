require('dotenv').config(); 
const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

(async () => {
  const migrationsDir = path.join(__dirname);

  try {
    const connection = await pool.getConnection();

    
    const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.js') && !file.includes('run_migrations') && !file.includes('rollback_migrations'));
    files.sort().reverse(); 

    console.log(`Found ${files.length} migration files.`);
    for (const file of files) {
      console.log(`Rolling back migration: ${file}`);
      const migration = require(path.join(migrationsDir, file));

      if (migration.down) {
        await migration.down(connection);
        console.log(`Rollback completed: ${file}`);
      } else {
        console.warn(`No rollback (down) logic defined for: ${file}`);
      }
    }

    connection.release();
    console.log('All rollbacks have been successfully applied.');
    process.exit(0);
  } catch (err) {
    console.error('Rollback failed:', err.message);
    process.exit(1);
  }
})();
