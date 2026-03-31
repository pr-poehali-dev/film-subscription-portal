import { useState } from "react";
import Layout from "@/components/Layout";
import MovieCard from "@/components/MovieCard";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { MOVIES } from "@/data/movies";

export default function Favorites() {
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [movies, setMovies] = useState(MOVIES);

  const favoriteMovies = movies.filter(m => favorites.includes(m.id));

  const handleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleRate = (id: number, rating: number) => {
    setMovies(prev =>
      prev.map(m => m.id === id ? { ...m, userRating: rating, rating: (m.rating + rating) / 2 } : m)
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Коллекция</span>
          </div>
          <h1 className="font-cinematic text-5xl font-light text-foreground">
            Моё <span className="text-gradient-gold italic">избранное</span>
          </h1>
        </div>

        {favoriteMovies.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <Icon name="Heart" size={14} className="text-gold fill-gold" />
              <span className="text-muted-foreground text-sm font-body">
                {favoriteMovies.length} {favoriteMovies.length === 1 ? "фильм" : "фильма"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onRate={handleRate}
                  onFavorite={handleFavorite}
                  isFavorite={true}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-gold/20 flex items-center justify-center">
              <Icon name="Heart" size={36} className="text-gold/30" />
            </div>
            <h2 className="font-cinematic text-3xl font-light text-foreground/50 mb-2">
              Список пуст
            </h2>
            <p className="text-muted-foreground text-sm font-body mb-8 max-w-xs mx-auto">
              Добавляйте понравившиеся фильмы, нажав на сердечко на карточке
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 px-6 py-3 gold-gradient text-cinema-black font-body font-semibold rounded hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all"
            >
              <Icon name="Film" size={16} />
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
