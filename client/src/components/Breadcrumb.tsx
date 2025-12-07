import ChevronRight from "../assets/ChevronRight";

type BreadcrumbProps = {
	path: string;
	onNavigate: (fullPath: string) => void;
	searchMode?: boolean;
};

const Breadcrumb = ({ path, onNavigate, searchMode }: BreadcrumbProps) => {
	const segments = path.split(" > ");

	const handleClick = (index: number) => {
		if (index === 0) {
			onNavigate("");
		} else if (searchMode) {
			const name = segments[index];
			onNavigate(name);
		} else {
			const fullPathToSegment = segments.slice(0, index + 1).join(" > ");
			onNavigate(fullPathToSegment);
		}
	};

	return (
		<nav className="mb-4">
			<div className="w-full p-3 rounded-lg border border-gray-700 text-white shadow-md">
				<ol className="list-none p-0 inline-flex flex-wrap items-center gap-1">
					{segments.map((segment, index) => (
						<li key={index} className="flex items-center">
							<button
								type="button"
								onClick={() => handleClick(index)}
								className={`px-2 py-1 rounded transition-all ${
									index === segments.length - 1
										? "text-white bg-blue-600 font-semibold cursor-default"
										: "text-blue-400 hover:text-blue-300 hover:bg-gray-700/50"
								}`}
							>
								{segment}
							</button>
							{index < segments.length - 1 && <ChevronRight />}
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
};

export default Breadcrumb;
