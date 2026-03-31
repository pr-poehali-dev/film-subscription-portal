import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const FAQ = [
  {
    q: "Как отменить подписку?",
    a: "Перейдите в раздел «Профиль» → «Подписка» → «Отменить подписку». Отмена мгновенная, доступ сохраняется до конца оплаченного периода."
  },
  {
    q: "Что происходит после списания 1 рубля?",
    a: "Каждый месяц с вашей карты автоматически списывается 1 рубль для продления подписки. Вы получаете уведомление на email за 3 дня до списания."
  },
  {
    q: "Могу ли я смотреть фильмы без подписки?",
    a: "Без подписки доступен только просмотр карточек фильмов и рейтингов. Для просмотра фильмов нужна активная подписка."
  },
  {
    q: "Как оценить фильм?",
    a: "На карточке любого фильма есть звёздочки оценки. Нажмите нужную звезду — оценка сохранится и повлияет на общий рейтинг фильма."
  },
  {
    q: "Какое качество видео?",
    a: "Доступно качество от 480p до 4K Ultra HD. Качество автоматически подстраивается под скорость вашего интернета."
  },
];

export default function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-gold" />
            <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Помощь</span>
          </div>
          <h1 className="font-cinematic text-5xl font-light text-foreground">
            Центр <span className="text-gradient-gold italic">поддержки</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-14">
          {[
            { icon: "MessageCircle", title: "Чат", desc: "Ответим за 5 минут", action: "Написать" },
            { icon: "Mail", title: "Email", desc: "support@sinema.ru", action: "Отправить" },
            { icon: "Phone", title: "Телефон", desc: "+7 800 000-00-00", action: "Позвонить" },
          ].map(channel => (
            <div key={channel.title} className="bg-cinema-card border border-white/5 rounded p-5 hover:border-gold/20 transition-all duration-200 group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gold-gradient rounded flex items-center justify-center flex-shrink-0">
                  <Icon name={channel.icon} size={18} className="text-cinema-black" />
                </div>
                <div className="flex-1">
                  <h3 className="font-cinematic text-lg font-semibold text-foreground">{channel.title}</h3>
                  <p className="text-muted-foreground text-xs font-body mb-2">{channel.desc}</p>
                  <button className="text-gold text-xs font-body hover:text-gold-light transition-colors flex items-center gap-1">
                    {channel.action}
                    <Icon name="ArrowRight" size={10} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-cinematic text-3xl font-light text-foreground mb-6">
              Частые <span className="text-gradient-gold italic">вопросы</span>
            </h2>
            <div className="space-y-2">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-cinema-card border border-white/5 rounded overflow-hidden hover:border-gold/20 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-foreground/90 text-sm font-body font-medium pr-4">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={14}
                      className="text-gold flex-shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 border-t border-white/5">
                      <p className="text-muted-foreground text-sm font-body leading-relaxed pt-3">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-cinematic text-3xl font-light text-foreground mb-6">
              Написать <span className="text-gradient-gold italic">нам</span>
            </h2>

            {sent ? (
              <div className="text-center py-12 bg-cinema-card border border-gold/20 rounded">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full gold-gradient flex items-center justify-center">
                  <Icon name="Check" size={24} className="text-cinema-black" />
                </div>
                <h3 className="font-cinematic text-2xl text-foreground mb-2">Сообщение отправлено!</h3>
                <p className="text-muted-foreground text-sm font-body">Мы ответим в течение 24 часов</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 text-gold text-sm font-body hover:text-gold-light transition-colors"
                >
                  Отправить ещё раз
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: "name", label: "Ваше имя", type: "text", placeholder: "Иван Иванов" },
                  { key: "email", label: "Email", type: "email", placeholder: "ivan@email.com" },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-body text-muted-foreground mb-1.5 uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full bg-cinema-card border border-white/10 rounded px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      required
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-body text-muted-foreground mb-1.5 uppercase tracking-wider">
                    Сообщение
                  </label>
                  <textarea
                    placeholder="Опишите вашу проблему или вопрос..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={5}
                    className="w-full bg-cinema-card border border-white/10 rounded px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold/50 transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 gold-gradient text-cinema-black font-body font-bold rounded hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all"
                >
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
