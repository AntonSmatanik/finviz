import fs from "fs";
import xml2js from "xml2js";
import { DataRow } from ".";
import { FILE_NAME } from "../config";

/** Represents a single node in the XML structure */
interface XmlNode {
  $: { words: string };
  synset?: XmlNode[];
}

/** Root structure of the ImageNet XML file */
interface XmlResult {
  ImageNetStructure: {
    synset: XmlNode[];
  };
}

/** Internal tree node with words and children */
interface TreeNode {
  words: string;
  children: TreeNode[];
}

// Read the XML file
const inputFile = fs.readFileSync(`${FILE_NAME}.xml`, "utf8");

// Parse XML with explicit children preservation
xml2js.parseString(
  inputFile,
  { explicitChildren: true, preserveChildrenOrder: true },
  (err: Error | null, result: XmlResult) => {
    if (err) {
      console.error("XML parse error:", err);
      return;
    }

    const root = result.ImageNetStructure.synset[0];

    if (!root) {
      console.error("No root synset found in XML");
      return;
    }

    console.log("XML parsed successfully. Building tree...");

    /**
     * Recursively converts XML nodes to tree structure
     * @param node - XML node to convert
     * @returns TreeNode with words and children
     */
    const createTree = (node: XmlNode): TreeNode => {
      const kids = node.synset || [];

      return {
        words: node.$.words,
        children: kids.map(createTree),
      };
    };

    const tree = createTree(root);

    /**
     * Counts total descendants of a node (children + grandchildren + ...)
     * @param node - TreeNode to count descendants for
     * @returns Total number of descendants
     */
    const countDesc = (node: TreeNode): number => {
      let total = 0;

      for (const c of node.children) {
        total += 1 + countDesc(c);
      }

      return total;
    };

    const pathMap = new Map<string, number>();

    /**
     * Traverses tree and creates flat list of entries with hierarchical paths
     * Each entry includes full path and total descendant count
     * Merges sizes for duplicate paths
     * @param node - Current node to process
     * @param path - Accumulated path from root to current node
     */
    const traverse = (node: TreeNode, path: string): void => {
      const current = path ? `${path} > ${node.words}` : node.words;
      const size = countDesc(node);

      // Merge sizes for duplicate paths
      const existingSize = pathMap.get(current) || 0;
      pathMap.set(current, existingSize + size);

      for (const c of node.children) {
        traverse(c, current);
      }
    };

    // Start traversal from root with empty path
    traverse(tree, "");

    // Convert map to array
    const output: DataRow[] = Array.from(pathMap.entries()).map(
      ([name, size]) => ({ name, size })
    );

    console.log(`Total entries: ${output.length}`);

    fs.writeFileSync(`${FILE_NAME}.json`, JSON.stringify(output, null, 2));

    console.log(`Output written to ${FILE_NAME}.json`);
  }
);
