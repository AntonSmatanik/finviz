import ErrorMessage from "../components/ErrorMessage";
import Headline from "../components/Headline";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import { useTreeQuery } from "../hooks/useTreeQuery";

const Tree = () => {
	const { data, isLoading, error } = useTreeQuery();

	return (
		<PageContainer>
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
		</PageContainer>
	);
};

export default Tree;
