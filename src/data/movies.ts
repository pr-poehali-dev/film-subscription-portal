export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  userRating: number | null;
  description: string;
  poster: string;
  duration: string;
  director: string;
  country: string;
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Крёстный отец",
    year: 1972,
    genre: ["Криминал", "Драма"],
    rating: 9.2,
    userRating: null,
    description: "Эпическая сага о семье Корлеоне — могущественном криминальном клане, балансирующем между властью, предательством и семейной честью.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/c45c382d-656c-4c55-8497-ba6f30c8c9eb.jpg",
    duration: "2ч 55м",
    director: "Фрэнсис Форд Коппола",
    country: "США",
  },
  {
    id: 2,
    title: "Побег из Шоушенка",
    year: 1994,
    genre: ["Драма"],
    rating: 9.3,
    userRating: null,
    description: "История о неосуждённом банкире Энди Дюфрейне, который выживает в тюрьме Шоушенк, сохраняя надежду и достоинство.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/64c72d32-4634-456e-833e-728a4d5eff9f.jpg",
    duration: "2ч 22м",
    director: "Фрэнк Дарабонт",
    country: "США",
  },
  {
    id: 3,
    title: "Список Шиндлера",
    year: 1993,
    genre: ["История", "Биография", "Драма"],
    rating: 9.0,
    userRating: null,
    description: "Правдивая история немецкого промышленника Оскара Шиндлера, спасшего более тысячи польских евреев во время Холокоста.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/0814d173-959c-4906-a15c-f5259e65c89f.jpg",
    duration: "3ч 15м",
    director: "Стивен Спилберг",
    country: "США",
  },
  {
    id: 4,
    title: "Тёмный рыцарь",
    year: 2008,
    genre: ["Боевик", "Криминал", "Драма"],
    rating: 9.0,
    userRating: null,
    description: "Бэтмен противостоит Джокеру — хаотичному преступному гению, который сеет анархию в Готэм-Сити.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/c45c382d-656c-4c55-8497-ba6f30c8c9eb.jpg",
    duration: "2ч 32м",
    director: "Кристофер Нолан",
    country: "США, Великобритания",
  },
  {
    id: 5,
    title: "Однажды в Голливуде",
    year: 2019,
    genre: ["Комедия", "Драма"],
    rating: 7.6,
    userRating: null,
    description: "Голливуд, 1969 год. Актёр телесериалов и его дублёр пытаются найти себя в меняющейся киноиндустрии.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/64c72d32-4634-456e-833e-728a4d5eff9f.jpg",
    duration: "2ч 41м",
    director: "Квентин Тарантино",
    country: "США",
  },
  {
    id: 6,
    title: "Интерстеллар",
    year: 2014,
    genre: ["Фантастика", "Драма", "Приключения"],
    rating: 8.6,
    userRating: null,
    description: "Группа исследователей путешествует сквозь червоточину в поисках новой планеты для человечества.",
    poster: "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/0814d173-959c-4906-a15c-f5259e65c89f.jpg",
    duration: "2ч 49м",
    director: "Кристофер Нолан",
    country: "США, Великобритания",
  },
];

export const getTopMovies = (count = 3) =>
  [...MOVIES].sort((a, b) => b.rating - a.rating).slice(0, count);
