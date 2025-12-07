import { useQuery } from "@tanstack/react-query";
import { SERVER_PORT } from "../config";

export const useTreeQuery = () => {
	return useQuery({
		queryKey: ["tree"],
		queryFn: async () => {
			const response = await fetch(`http://localhost:${SERVER_PORT}/tree`);
			if (!response.ok) {
				throw new Error("Failed to fetch tree");
			}
			return response.json();
		},
	});
};
