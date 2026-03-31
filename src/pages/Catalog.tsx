import { useState } from "react";
import Layout from "@/components/Layout";
import MovieCard from "@/components/MovieCard";
import Icon from "@/components/ui/icon";
import { MOVIES } from "@/data/movies";

const GENRES = ["Все", "Драма", "Криминал", "Боевик", "Фантастика", "История", "Биография", "Комедия", "Приключения"];
const SORT_OPTIONS = [
  { value: "rating", label: "По рейтингу" },
  { value: "year", label: "По году" },
  { value: "title", label: "По названию" },
];

export default function Catalog() {
  const [movies, setMovies] = useState(MOVIES);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeGenre, setActiveGenre] = useState("Все");
  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState("");

  const handleRate = (id: number, rating: number) => {
    setMovies(prev =>
      prev.map(m => m.id === id ? { ...m, userRating: rating, rating: (m.rating + rating) / 2 } : m)
    );
  };

  const handleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filtered = movies
    .filter(m => activeGenre === "Все" || m.genre.includes(activeGenre))
    .filter(m => m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Библиотека</span>
          </div>
          <h1 className="font-cinematic text-5xl sm:text-6xl font-light text-foreground">
            Каталог <span className="text-gradient-gold italic">фильмов</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск фильма..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-cinema-card border border-white/10 rounded pl-9 pr-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:bg-cinema-card transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-cinema-card border border-white/10 rounded px-4 py-2.5 text-sm font-body text-foreground focus:outline-none focus:border-gold/50 cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 flex-wrap mb-10">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1.5 text-xs font-body rounded border transition-all duration-200 ${
                activeGenre === genre
                  ? "gold-gradient text-cinema-black border-transparent font-semibold"
                  : "border-white/10 text-muted-foreground hover:border-gold/30 hover:text-gold"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRate={handleRate}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Icon name="Film" size={48} className="text-gold/20 mx-auto mb-4" />
            <p className="font-cinematic text-2xl text-foreground/40">Фильмы не найдены</p>
            <p className="text-muted-foreground text-sm font-body mt-1">Попробуйте изменить фильтры</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
