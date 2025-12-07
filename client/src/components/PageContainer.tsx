import type { ReactNode } from "react";

type PageContainerProps = {
	children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
	return <div className="p-4 md:p-8 w-full max-w-6xl">{children}</div>;
};

export default PageContainer;
