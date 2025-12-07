import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tree from "./pages/Tree";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<div className="min-h-screen flex flex-col">
					<Header />
					<main className="flex-1 flex justify-center">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/search" element={<Search />} />
							<Route path="/tree" element={<Tree />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</main>
				</div>
			</Router>
		</QueryClientProvider>
	);
};

export default App;
