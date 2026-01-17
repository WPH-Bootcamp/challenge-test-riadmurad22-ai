import { usePopularMovies } from "./hooks/useMovies";
import MovieCard from "./components/MovieCard";

function App() {
  const { data: movies, isLoading, isError } = usePopularMovies();

  if (isLoading)
    return <div className="text-white text-center mt-20">Loading...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center mt-20">Gagal memuat data!</div>
    );

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-3xl font-bold mb-8 text-center md:text-left">
        Popular Movies
      </h1>

      {/* Grid Responsif: 2 kolom di HP, 5 kolom di Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
