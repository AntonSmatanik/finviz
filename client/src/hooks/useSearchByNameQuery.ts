import { useQuery } from "@tanstack/react-query";
import { SERVER_PORT } from "../config";

export const useSearchByNameQuery = (name: string) => {
	return useQuery({
		queryKey: ["node-by-name", name],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:${SERVER_PORT}/search-by-name?val=${encodeURIComponent(
					name.trim(),
				)}`,
			);
			if (!response.ok) {
				throw new Error("Failed to fetch node");
			}
			return response.json();
		},
	});
};
