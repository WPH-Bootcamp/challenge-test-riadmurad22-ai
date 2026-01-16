console.log("Token saya:", import.meta.env.VITE_READ_ACCESS_TOKEN);

import { usePopularMovies } from "./hooks/useMovies";

function App() {
  const { data: movies, isLoading, isError } = usePopularMovies();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <p className="text-white animate-pulse">Loading Movies...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <p className="text-red-500">
          Gagal memuat data. Periksa koneksi/Token API.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      {/* Judul sesuai kebutuhan Figma */}
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        Popular Movies
      </h1>

      {/* Grid Kartu Film */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie: any) => (
          <div
            key={movie.id}
            className="bg-slate-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            {/* Poster Film */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />

            {/* Info Film */}
            <div className="p-4">
              <h2 className="font-bold text-sm truncate">{movie.title}</h2>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 text-xs">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-slate-500 text-[10px]">
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
