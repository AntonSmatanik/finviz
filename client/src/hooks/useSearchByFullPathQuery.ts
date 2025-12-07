import { useQuery } from "@tanstack/react-query";
import { SERVER_PORT } from "../config";

export const useSearchByFullPathQuery = (fullpath: string) => {
	return useQuery({
		queryKey: ["node-by-fullpath", fullpath],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:${SERVER_PORT}/search-by-fullpath?val=${encodeURIComponent(
					fullpath,
				)}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch node");
			}
			return response.json();
		},
	});
};
