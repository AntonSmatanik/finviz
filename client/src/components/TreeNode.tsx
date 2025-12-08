type TreeNodeChild = {
  name: string;
  fullPath: string;
  size: number;
};

type TreeNodeProps = {
  name: string;
  size: number;
  children?: TreeNodeChild[];
  onChildClick: (identifier: string) => void;
  searchMode?: boolean;
};

const TreeNode = ({
  name,
  size,
  children,
  onChildClick,
  searchMode,
}: TreeNodeProps) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-400 text-sm">Size: {size}</p>
      </div>

      {children && children.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Direct Children:</h3>
          <ul className="space-y-2 ml-4 border-l-2 border-blue-500 pl-4">
            {children.map((child) => (
              <li key={child.fullPath} className="relative">
                <div className="absolute -left-4 top-1/2 w-3 h-0.5 bg-blue-500" />
                <button
                  type="button"
                  onClick={() =>
                    onChildClick(searchMode ? child.name : child.fullPath)
                  }
                  className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors border-l-2 border-transparent hover:border-blue-400"
                >
                  <div className="font-medium">{child.name}</div>
                  <div className="text-sm text-gray-400">
                    Size: {child.size}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
