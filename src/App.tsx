import { useState } from "react";
import { usePopularMovies } from "./hooks/useMovies";
import MovieCard from "./components/MovieCard";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // 1. State untuk menyimpan pilihan pengurutan (default: 'desc' untuk tertinggi ke terendah)
  const [sortBy, setSortBy] = useState("desc");

  const { data: movies, isLoading, isError } = usePopularMovies();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white animate-pulse font-medium">
            Memuat Film Populer...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#020617] p-6 text-center">
        <div className="bg-red-500/10 border border-red-500/50 p-6 rounded-2xl">
          <p className="text-red-500 font-bold text-lg">Gagal Memuat Data</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  // 2. Logika Filter & Sort
  const processedMovies = movies
    ?.filter((movie: any) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a: any, b: any) => {
      // Jika 'desc', rating tinggi di atas. Jika 'asc', rating rendah di atas.
      return sortBy === "desc"
        ? b.vote_average - a.vote_average
        : a.vote_average - b.vote_average;
    });

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
            Popular <span className="text-red-600">Movies</span>
          </h1>
          <div className="h-1.5 w-24 bg-red-600 rounded-full mt-3"></div>
        </div>

        {/* Kontrol Section: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-end">
          {/* Search Bar */}
          <div className="grow w-full">
            <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
              Cari Judul
            </label>
            <input
              type="text"
              placeholder="Ketik judul film..."
              className="w-full bg-slate-900 border border-white/10 text-white px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Dropdown Sort */}
          <div className="w-full md:w-64">
            <label className="block text-slate-400 text-xs font-bold uppercase mb-2 ml-1">
              Urutkan Rating
            </label>
            <select
              className="w-full bg-slate-900 border border-white/10 text-white px-5 py-3 rounded-xl focus:ring-2 focus:ring-red-600 outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="desc">Tertinggi ⭐</option>
              <option value="asc">Terendah ⭐</option>
            </select>
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {processedMovies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
