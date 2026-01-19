import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const response = await api.get("/movie/popular");
      // SANGAT PENTING: Harus me-return data.results
      return response.data.results;
    },
  });
};
