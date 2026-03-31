import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MovieCard from "@/components/MovieCard";
import Icon from "@/components/ui/icon";
import { MOVIES, getTopMovies } from "@/data/movies";

const BG_HERO = "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/64c72d32-4634-456e-833e-728a4d5eff9f.jpg";

export default function Home() {
  const [movies, setMovies] = useState(MOVIES);
  const [favorites, setFavorites] = useState<number[]>([]);

  const topMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);

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

  return (
    <Layout>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${BG_HERO})` }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.85) 100%)'
        }} />

        <div className="absolute inset-0 film-strip opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up animate-delay-1">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Премиальный кинотеатр</span>
            </div>

            <h1 className="font-cinematic text-6xl sm:text-7xl md:text-8xl font-light text-foreground leading-none mb-6 animate-fade-in-up animate-delay-2">
              Кино без
              <br />
              <span className="text-gradient-gold italic font-semibold">границ</span>
            </h1>

            <p className="text-foreground/60 text-lg font-body leading-relaxed mb-8 animate-fade-in-up animate-delay-3">
              Тысячи фильмов в лучшем качестве. Рейтинги от живых зрителей.
              Всего за <span className="text-gold font-semibold">1 рубль</span> в месяц.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-4">
              <Link
                to="/subscription"
                className="inline-flex items-center gap-2 px-8 py-3.5 gold-gradient text-cinema-black font-body font-semibold rounded transition-all duration-200 hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] hover:scale-105 animate-pulse-gold"
              >
                <Icon name="Crown" size={16} />
                Подписаться за 1 ₽
              </Link>
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/40 text-gold font-body rounded transition-all duration-200 hover:bg-gold/10 hover:border-gold"
              >
                <Icon name="Play" size={16} />
                Смотреть каталог
              </Link>
            </div>

            <div className="flex items-center gap-8 mt-10 animate-fade-in-up animate-delay-5">
              {[
                { value: "10 000+", label: "Фильмов" },
                { value: "1 ₽", label: "В месяц" },
                { value: "4K", label: "Качество" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-cinematic text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-muted-foreground text-xs font-body uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-gold/40" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" size={18} className="text-gold" />
            <h2 className="font-cinematic text-3xl sm:text-4xl font-light text-foreground">
              Топ <span className="text-gold italic">3</span> по рейтингу
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMovies.map((movie, i) => (
            <div key={movie.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, opacity: 0, animationFillMode: 'forwards' }}>
              <MovieCard
                movie={movie}
                rank={i + 1}
                onRate={handleRate}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(movie.id)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold/30 text-gold/80 font-body rounded hover:bg-gold/10 hover:border-gold hover:text-gold transition-all duration-200"
          >
            Весь каталог
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.03), transparent)'
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "Star",
                title: "Рейтинги от зрителей",
                desc: "Оцените фильм и помогите другим выбрать лучшее. Топ формируется живыми голосами."
              },
              {
                icon: "Crown",
                title: "Подписка за 1 рубль",
                desc: "Полный доступ к библиотеке за символическую цену. Отмена в любой момент без штрафов."
              },
              {
                icon: "Heart",
                title: "Личная коллекция",
                desc: "Добавляйте фильмы в избранное, создавайте персональный список для просмотра."
              },
            ].map((feat) => (
              <div key={feat.title} className="text-center p-6 rounded border border-white/5 bg-cinema-card/50 hover:border-gold/20 transition-all duration-300">
                <div className="w-12 h-12 mx-auto mb-4 rounded-sm gold-gradient flex items-center justify-center">
                  <Icon name={feat.icon} size={20} className="text-cinema-black" />
                </div>
                <h3 className="font-cinematic text-xl font-semibold text-foreground mb-2">{feat.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
