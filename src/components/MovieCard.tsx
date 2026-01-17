interface MovieProps {
  movie: {
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  };
}

const MovieCard = ({ movie }: MovieProps) => {
  const IMG_URL =
    import.meta.env.VITE_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={`${IMG_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-auto"
      />
      <div className="p-3 text-white">
        <h3 className="font-bold text-sm truncate">{movie.title}</h3>
        <p className="text-yellow-400 text-xs mt-1">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
