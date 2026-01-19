import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const { data } = await api.get(`/movie/${id}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#020617] text-white p-10">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="min-h-screen bg-[#020617] text-white p-10">
        Film tidak ditemukan.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-20">
      {/* Backdrop Hero Section */}
      <div className="relative h-100 w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent"></div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-10 z-50 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-black border border-white/20 px-5 py-2.5 rounded-xl hover:bg-red-600 hover:border-red-600 transition-all duration-300 shadow-2xl group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span className="font-bold text-sm uppercase tracking-wider">
            Kembali
          </span>
        </button>
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-10">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="w-72 rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="flex-1 pt-10 md:pt-32">
            <h1 className="text-5xl font-black tracking-tighter mb-4">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-md font-bold text-sm">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-slate-400 font-medium">
                {movie.release_date.split("-")[0]}
              </span>
            </div>
            <h2 className="text-xl font-bold text-red-600 uppercase tracking-widest mb-3">
              Sinopsis
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
