import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const dbPath = path.join(__dirname, "../../finviz.db");
export const jsonPath = path.join(__dirname, "../data/structure_released.json");
export const FILE_NAME = path.join(__dirname, "../data/structure_released");

export const SERVER_PORT = 3000;
