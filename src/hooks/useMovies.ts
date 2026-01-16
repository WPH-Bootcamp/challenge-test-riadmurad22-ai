import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const { data } = await api.get("/movie/popular");

      return data.results;
    },
  });
};
