const fs = require('fs');
const path = require('path');
const pool = require('../config/database');

const migrationsDir = path.resolve(__dirname, './');
const runMigrations = async () => {
  try {
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter(
        (file) =>
          file.endsWith('.js') &&
          !file.startsWith('run_migration') && 
          !file.startsWith('rollback_') 
      );

    console.log(`Found ${migrationFiles.length} migration files.`);

    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsDir, file);
      const migration = require(migrationPath);

      if (typeof migration.up !== 'function') {
        throw new Error(`Migration ${file} does not export an 'up' function`);
      }

      console.log(`Running migration: ${file}`);
      await migration.up(pool);
    }
    console.log('All migrations completed successfully.');
    process.exit(0)
  } catch (error) {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1);
  }
};

runMigrations();
