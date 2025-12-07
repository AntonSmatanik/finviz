import Database from "better-sqlite3";
import fs from "fs";
import { dbPath } from "./index";

if (fs.existsSync(dbPath)) {
  console.log("Database already exists");
  console.log("Delete it first if you want to recreate it.");
  process.exit(0);
}

const db: Database.Database = new Database(dbPath);

console.log(`Database created`);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    size INTEGER NOT NULL
  );
  
  CREATE INDEX IF NOT EXISTS idx_entries_name ON entries(name);
`);

console.log("Tables created successfully!");

db.close();
