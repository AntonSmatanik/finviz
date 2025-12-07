import { useQuery } from "@tanstack/react-query";
import { SERVER_PORT } from "../config";

export const useSearchByFullPathQuery = (fullPath: string) => {
	return useQuery({
		queryKey: ["node-by-fullPath", fullPath],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:${SERVER_PORT}/search-by-fullPath?val=${encodeURIComponent(
					fullPath,
				)}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch node");
			}
			return response.json();
		},
	});
};
