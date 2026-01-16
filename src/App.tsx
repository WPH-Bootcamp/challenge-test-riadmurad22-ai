console.log("Token saya:", import.meta.env.VITE_READ_ACCESS_TOKEN);

// src/App.tsx
import { usePopularMovies } from "./hooks/useMovies";
import MovieCard from "./components/MovieCard";

function App() {
  const { data: movies, isLoading, isError } = usePopularMovies();

  // Debugging: Cek apakah data masuk ke sini
  console.log("Daftar Film:", movies);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600 mr-4"></div>
        <p className="animate-pulse">Loading Movies...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-red-500 p-4 text-center">
        <p>Gagal memuat data. Periksa file .env dan restart terminal (npm run dev).</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      {/* Header Section */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Popular <span className="text-red-600">Movies</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Discover the most trending movies this week.</p>
        </div>
      </header>

      {/* Grid Kartu Film - Responsive Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;