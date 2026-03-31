import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  rank?: number;
  onRate?: (id: number, rating: number) => void;
  onFavorite?: (id: number) => void;
  onWatch?: (movie: Movie) => void;
  isFavorite?: boolean;
}

export default function MovieCard({ movie, rank, onRate, onFavorite, onWatch, isFavorite }: MovieCardProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [localRating, setLocalRating] = useState(movie.userRating || 0);

  const handleRate = (rating: number) => {
    setLocalRating(rating);
    onRate?.(movie.id, rating);
  };

  return (
    <div className="bg-cinema-card border border-white/5 rounded overflow-hidden card-hover group relative">
      {rank && (
        <div className="absolute top-3 left-3 z-10 w-8 h-8 gold-gradient rounded flex items-center justify-center">
          <span className="font-cinematic font-bold text-cinema-black text-sm">{rank}</span>
        </div>
      )}

      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div className="flex items-center gap-1 mb-1">
            <Icon name="Star" size={12} className="text-gold fill-gold" />
            <span className="text-gold text-xs font-body font-semibold">{movie.rating.toFixed(1)}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {movie.genre.slice(0, 2).map(g => (
              <span key={g} className="text-[10px] px-1.5 py-0.5 bg-black/60 border border-gold/20 text-gold/80 rounded-sm font-body">
                {g}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onFavorite?.(movie.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-gold/20"
        >
          <Icon
            name="Heart"
            size={14}
            className={isFavorite ? "text-red-400 fill-red-400" : "text-white/70"}
          />
        </button>

        <button
          onClick={() => onWatch?.(movie)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <div className="w-14 h-14 rounded-full bg-black/70 backdrop-blur-sm border border-gold/40 flex items-center justify-center hover:bg-gold/20 hover:border-gold transition-all duration-200">
            <Icon name="Play" size={22} className="text-white ml-1" />
          </div>
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-cinematic text-lg font-semibold text-foreground leading-tight mb-0.5 truncate">
          {movie.title}
        </h3>
        <p className="text-muted-foreground text-xs font-body mb-2">
          {movie.year} · {movie.duration} · {movie.country}
        </p>
        <p className="text-foreground/60 text-xs font-body leading-relaxed line-clamp-2 mb-3">
          {movie.description}
        </p>

        <div className="flex items-center gap-1 star-rating">
          <span className="text-[10px] text-muted-foreground font-body mr-1">Ваша оценка:</span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
            >
              <Icon
                name="Star"
                size={12}
                className={
                  star <= (hoverRating || localRating)
                    ? "text-gold fill-gold"
                    : "text-white/20"
                }
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}