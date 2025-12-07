import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DataRow } from "../utils";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dbPath = path.join(__dirname, "../../finviz.db");

export const readEntriesTable = () => {
  if (!fs.existsSync(dbPath)) {
    throw new Error(
      `Database not found at ${dbPath}. Run 'npm run db:create' and 'npm run db:seed' first.`
    );
  }

  const db = new Database(dbPath, { readonly: true });

  const rows = db.prepare("SELECT name, size FROM entries").all();

  db.close();

  return rows as Array<DataRow>;
};
