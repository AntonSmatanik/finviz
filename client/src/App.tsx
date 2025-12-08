import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";

const SearchByFullPath = lazy(() => import("./pages/SearchByFullPath"));
const SearchByName = lazy(() => import("./pages/SearchByName"));
const Tree = lazy(() => import("./pages/Tree"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex justify-center">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<SearchByFullPath />} />
                <Route path="/search-by-name" element={<SearchByName />} />
                <Route path="/tree" element={<Tree />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
