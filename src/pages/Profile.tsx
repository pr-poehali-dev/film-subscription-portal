import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const WATCH_HISTORY = [
  { title: "Крёстный отец", date: "28 марта", rating: 5 },
  { title: "Интерстеллар", date: "25 марта", rating: 4 },
  { title: "Тёмный рыцарь", date: "20 марта", rating: 5 },
];

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Аккаунт</span>
          </div>
          <h1 className="font-cinematic text-5xl font-light text-foreground">
            Мой <span className="text-gradient-gold italic">профиль</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="bg-cinema-card border border-white/5 rounded p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center">
                <Icon name="User" size={40} className="text-cinema-black" />
              </div>
              <h2 className="font-cinematic text-2xl font-semibold text-foreground mb-1">Иван Петров</h2>
              <p className="text-muted-foreground text-sm font-body mb-4">ivan@email.com</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 border border-gold/30 rounded text-gold text-xs font-body">
                <Icon name="Crown" size={12} />
                Подписка активна
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "Film", value: "47", label: "Просмотрено" },
                { icon: "Heart", value: "12", label: "Избранное" },
                { icon: "Star", value: "4.3", label: "Средняя оценка" },
              ].map(stat => (
                <div key={stat.label} className="bg-cinema-card border border-white/5 rounded p-4 text-center">
                  <Icon name={stat.icon} size={20} className="text-gold mx-auto mb-2" />
                  <div className="font-cinematic text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground text-xs font-body">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-cinema-card border border-white/5 rounded p-5">
              <h3 className="font-cinematic text-xl font-semibold text-foreground mb-4">Личные данные</h3>
              <div className="space-y-3">
                {[
                  { label: "Имя", value: "Иван Петров" },
                  { label: "Email", value: "ivan@email.com" },
                  { label: "Телефон", value: "+7 900 123-45-67" },
                ].map(field => (
                  <div key={field.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-muted-foreground text-sm font-body">{field.label}</span>
                    <span className="text-foreground text-sm font-body">{field.value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-gold/30 text-gold text-sm font-body rounded hover:bg-gold/10 transition-colors">
                Редактировать профиль
              </button>
            </div>
          </div>
        </div>

        <div className="bg-cinema-card border border-white/5 rounded p-6">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="Clock" size={16} className="text-gold" />
            <h3 className="font-cinematic text-xl font-semibold text-foreground">История просмотров</h3>
          </div>
          <div className="space-y-3">
            {WATCH_HISTORY.map((item) => (
              <div key={item.title} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gold/10 border border-gold/20 rounded flex items-center justify-center">
                    <Icon name="Film" size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-body font-medium">{item.title}</p>
                    <p className="text-muted-foreground text-xs font-body">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="Star" size={10} className={i < item.rating ? "text-gold fill-gold" : "text-white/20"} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
