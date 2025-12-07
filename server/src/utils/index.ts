export type DataRow = { name: string; size: number };

type TreeNode = {
  name: string;
  size: number;
  fullPath?: string;
  children: TreeNode[];
};

/**
 * Builds a tree structure from linear rows of data
 * Complexity: O(n × m) where n is number of rows and m is average path depth
 * @returns Object containing the root node and a map of all nodes by fullPath
 */
export const buildTreeFromLinearRows = (
  rows: Array<DataRow>
): { tree: TreeNode | null; nodeMap: Map<string, TreeNode> } => {
  const map = new Map<string, TreeNode>();

  // Phase 1: Create node entries for every path
  // O(n × m) - iterates through all rows and splits each path
  for (const row of rows) {
    const fullPath = row.name;
    const parts = fullPath.split(" > ");
    const shortName = parts[parts.length - 1] || "";

    if (!map.has(fullPath)) {
      map.set(fullPath, {
        name: shortName,
        size: row.size,
        fullPath,
        children: [],
      });
    }
  }

  let root: TreeNode | null = null;

  // Phase 2: Link parent → children relationships
  // O(n × m) - iterates through all entries, splits paths, and joins parent paths
  for (const [fullPath, node] of map.entries()) {
    const parts = fullPath.split(" > ");

    // Root node (no parent)
    if (parts.length === 1) {
      root = node;
      continue;
    }

    const parentPath = parts.slice(0, -1).join(" > ");

    const parent = map.get(parentPath);

    if (parent) {
      parent.children.push(node);
    }
  }

  return { tree: root, nodeMap: map };
};

/**
 * Flattens a node's children to only include direct children without nested grandchildren
 */
const flattenNodeChildren = (node: TreeNode): TreeNode => {
  return {
    ...node,
    children: node.children.map((child) => ({
      ...child,
      children: [],
    })),
  };
};

/**
 * Finds the root node (node without " > " in its fullPath)
 */
const findRootNode = (nodeMap: Map<string, TreeNode>): TreeNode | null => {
  const root = Array.from(nodeMap.values()).find(
    (n) => !n.fullPath?.includes(" > ")
  );
  return root || null;
};

/**
 * Gets a node by its fullPath with only direct children (no nested grandchildren)
 * Complexity: O(1) - direct map lookup
 * @param nodeMap - Map of all nodes indexed by fullPath
 * @param fullPath - The full path of the node to find (e.g., "Category > Subcategory")
 * @returns Node with flattened children, or null if not found
 */
export const getNodeByPath = (
  nodeMap: Map<string, TreeNode>,
  fullPath?: string
): TreeNode | null => {
  if (!fullPath || fullPath.trim() === "") {
    const root = findRootNode(nodeMap);
    if (!root) return null;
    return flattenNodeChildren(root);
  }

  const node = nodeMap.get(fullPath);
  if (!node) return null;

  return flattenNodeChildren(node);
};

/**
 * Gets a node by its name (case-insensitive) with only direct children
 * Complexity: O(n) - searches through all nodes in the map
 * @param nodeMap - Map of all nodes indexed by fullPath
 * @param name - The short name of the node to find (e.g., "Subcategory")
 * @returns First matching node with flattened children, or null if not found
 */
export const getNodeByName = (
  nodeMap: Map<string, TreeNode>,
  name?: string
): TreeNode | null => {
  if (!name || name.trim() === "") {
    const root = findRootNode(nodeMap);
    if (!root) return null;
    return flattenNodeChildren(root);
  }

  const node = Array.from(nodeMap.values()).find(
    (n) => n.name.toLowerCase() === name.toLowerCase()
  );
  if (!node) return null;

  return flattenNodeChildren(node);
};
