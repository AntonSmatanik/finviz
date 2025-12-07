import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ErrorMessage from "../components/ErrorMessage";
import Headline from "../components/Headline";
import Loader from "../components/Loader";
import TreeNode from "../components/TreeNode";
import { useSearchByFullPathQuery } from "../hooks/useSearchByFullPathQuery";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const { data, isLoading, error } = useSearchByFullPathQuery(searchTerm);

	const handleChildClick = (val: string) => {
		setSearchTerm(val);
	};

	const handleBreadcrumbNavigate = (val: string) => {
		setSearchTerm(val);
	};

	return (
		<div className="p-4 md:p-8 w-full max-w-6xl">
			<Headline
				title="Find element by path"
				subtitle="Financial visualizations and stock analysis"
			/>

			{data && !isLoading && !error && (
				<Breadcrumb
					path={data.fullPath}
					onNavigate={handleBreadcrumbNavigate}
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
				/>
			)}
		</div>
	);
};

export default Home;
