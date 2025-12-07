import ErrorMessage from "../components/ErrorMessage";
import Headline from "../components/Headline";
import Loader from "../components/Loader";
import { useTreeQuery } from "../hooks/useTreeQuery";

const Tree = () => {
	const { data, isLoading, error } = useTreeQuery();

	return (
		<div className="p-4 md:p-8 w-full max-w-6xl">
			<Headline
				title="Full Tree Structure"
				subtitle="Complete ImageNet hierarchy in JSON format"
			/>

			{isLoading && <Loader />}

			{error && <ErrorMessage message={(error as Error).message} />}

			{data && (
				<div className="bg-gray-800 p-4 rounded-lg overflow-auto flex-1">
					<pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};

export default Tree;
