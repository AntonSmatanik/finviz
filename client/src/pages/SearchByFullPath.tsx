import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import ErrorMessage from "../components/ErrorMessage";
import Headline from "../components/Headline";
import Loader from "../components/Loader";
import PageContainer from "../components/PageContainer";
import TreeNode from "../components/TreeNode";
import { useSearchByFullPathQuery } from "../hooks/useSearchByFullPathQuery";

const SearchByFullPath = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useSearchByFullPathQuery(searchTerm);

  const handleChildClick = (val: string) => {
    setSearchTerm(val);
  };

  const handleBreadcrumbNavigate = (val: string) => {
    setSearchTerm(val);
  };

  return (
    <PageContainer>
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
          children={data.children}
          onChildClick={handleChildClick}
        />
      )}
    </PageContainer>
  );
};

export default SearchByFullPath;
