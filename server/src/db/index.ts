import Database from "better-sqlite3";
import fs from "fs";

import { dbPath } from "../config";
import { DataRow } from "../utils";

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
