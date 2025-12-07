import { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ErrorMessage from "../components/ErrorMessage";
import Headline from "../components/Headline";
import Loader from "../components/Loader";
import TreeNode from "../components/TreeNode";
import { useSearchByNameQuery } from "../hooks/useSearchByNameQuery";

const Search = () => {
	const [inputValue, setInputValue] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const { data, isLoading, error } = useSearchByNameQuery(searchTerm);

	useEffect(() => {
		const timer = setTimeout(() => {
			setSearchTerm(inputValue);
		}, 1000);

		return () => clearTimeout(timer);
	}, [inputValue]);

	const handleChildClick = (val: string) => {
		setInputValue(val);
		setSearchTerm(val);
	};

	const handleBreadcrumbNavigate = (val: string) => {
		setInputValue(val);
		setSearchTerm(val);
	};

	return (
		<div className="p-4 md:p-8 w-full max-w-6xl">
			<Headline
				title="Find element by name"
				subtitle="Financial visualizations and stock analysis"
			/>

			<input
				type="text"
				placeholder="Search..."
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{data && !isLoading && !error && data.fullPath && (
				<Breadcrumb
					path={data.fullPath}
					onNavigate={handleBreadcrumbNavigate}
					searchMode={true}
				/>
			)}

			{isLoading && <Loader />}

			{error && <ErrorMessage message={error.message} />}

			{data && !isLoading && !error && (
				<TreeNode
					name={data.name}
					size={data.size}
					fullPath={data.fullPath}
					children={data.children}
					onChildClick={handleChildClick}
					searchMode={true}
				/>
			)}
		</div>
	);
};

export default Search;
