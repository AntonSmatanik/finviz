import cors from "cors";
import express, { type Request, type Response } from "express";
import { SERVER_PORT } from "./config";
import { readEntriesTable } from "./db/index";
import {
  buildTreeFromLinearRows,
  getNodeByName,
  getNodeByPath,
} from "./utils/index.js";

const entriesData = readEntriesTable();

const { tree: cachedTree, nodeMap: cachedNodeMap } =
  buildTreeFromLinearRows(entriesData);

console.log("Tree structure built and cached");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/tree", (req: Request, res: Response) => {
  if (cachedTree === null) {
    return res.status(500).json({ error: "Tree structure is not available" });
  }

  res.status(200).json(cachedTree);
});

app.get("/search-by-fullPath", async (req: Request, res: Response) => {
  const val = req.query?.val as string;

  if (cachedNodeMap === null) {
    return res.status(500).json({ error: "Tree structure is not available" });
  }

  const results = getNodeByPath(cachedNodeMap, val);

  res.status(200).json(results);
});

app.get("/search-by-name", async (req: Request, res: Response) => {
  const val = req.query?.val as string;

  if (cachedNodeMap === null) {
    return res.status(500).json({ error: "Tree structure is not available" });
  }

  const results = getNodeByName(cachedNodeMap, val);

  res.status(200).json(results);
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
