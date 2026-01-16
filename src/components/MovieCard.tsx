// src/components/MovieCard.tsx

interface Movie {
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  // Base URL untuk gambar TMDB
  const imageUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 shadow-xl flex flex-col h-full">
      {/* Poster Film */}
      <img
        src={movie.poster_path ? `${imageUrl}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
        alt={movie.title}
        className="w-full aspect-2/3 object-cover"
      />

      {/* Info Film */}
      <div className="p-4 flex flex-col grow">
        <h2 className="font-bold text-sm truncate text-white mb-2">{movie.title}</h2>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-yellow-400 text-xs font-semibold">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-slate-500 text-[10px]">
            {movie.release_date?.split("-")[0] || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;