// src/components/MovieCard.tsx
import { Link } from "react-router-dom"; // 1. Tambahkan import Link

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    // 2. Bungkus seluruh div dengan <Link> dan arahkan ke path /movie/id
    <Link to={`/movie/${movie.id}`} className="block h-full">
      <div className="group bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-full border border-white/5">
        {/* Container Gambar */}
        <div className="relative aspect-2/3 w-full overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay Rating */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-yellow-400 text-[10px] font-bold border border-white/10">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Info Film */}
        <div className="p-4 flex flex-col justify-between grow bg-linear-to-b from-slate-900 to-slate-950">
          <h3 className="text-white font-bold text-sm line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">
            {movie.title}
          </h3>
          <p className="text-slate-500 text-[10px] mt-2 font-medium">
            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
