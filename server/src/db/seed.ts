import Database from "better-sqlite3";
import fs from "fs";
import { dbPath, jsonPath } from "../config";
import { DataRow } from "../utils";

if (!fs.existsSync(dbPath)) {
  console.error("Database not found. Run 'npm run db:create' first.");
  process.exit(1);
}

if (!fs.existsSync(jsonPath)) {
  console.error(
    "JSON file not found. Run 'npm run parse' first to generate it."
  );
  process.exit(1);
}

const db = new Database(dbPath);

const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

console.log(`Loading ${data.length} entries...`);

const insert = db.prepare("INSERT INTO entries (name, size) VALUES (?, ?)");

const insertMany = db.transaction((entries: DataRow[]) => {
  for (const entry of entries) {
    insert.run(entry.name, entry.size);
  }
});

insertMany(data);

db.close();

console.log("Database seeded successfully!");
