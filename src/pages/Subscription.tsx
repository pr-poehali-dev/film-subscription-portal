import { useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/ui/icon";

const BG = "https://cdn.poehali.dev/projects/eb62e844-3f2c-47c0-ab6b-f7fd98962f40/files/0814d173-959c-4906-a15c-f5259e65c89f.jpg";

const FEATURES = [
  "Доступ ко всем 10 000+ фильмам",
  "Качество до 4K Ultra HD",
  "Просмотр на любом устройстве",
  "Без рекламы",
  "Оценивайте фильмы и влияйте на рейтинги",
  "Личная коллекция избранного",
  "Отмена в любой момент",
];

export default function Subscription() {
  const [step, setStep] = useState<"plan" | "payment" | "success">("plan");
  const [cardNum, setCardNum] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatDate = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cinema-black" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-body tracking-[0.3em] uppercase">Доступ</span>
            </div>
            <h1 className="font-cinematic text-5xl font-light text-foreground">
              Подписка <span className="text-gradient-gold italic">Синема</span>
            </h1>
          </div>

          {step === "plan" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              <div className="relative bg-cinema-card border border-gold/40 rounded p-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 gold-gradient" />
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-body px-2 py-1 gold-gradient text-cinema-black rounded font-semibold">
                    Единственный план
                  </span>
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-1 mb-1">
                    <span className="font-cinematic text-6xl font-bold text-gold">1</span>
                    <span className="font-cinematic text-3xl text-gold mb-2">₽</span>
                    <span className="text-muted-foreground text-sm font-body mb-3">/месяц</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-body">
                    Автоматическое продление. Отмена в любой момент.
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {FEATURES.map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-sm gold-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={11} className="text-cinema-black" />
                      </div>
                      <span className="text-foreground/80 text-sm font-body">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-4 gold-gradient text-cinema-black font-body font-bold text-lg rounded hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all duration-200 hover:scale-[1.02]"
                >
                  Оформить подписку
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-cinematic text-2xl text-foreground">Почему 1 рубль?</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  Мы верим, что хорошее кино должно быть доступно каждому. Символическая цена помогает нам отделить случайных зрителей от настоящих киноманов — наших подписчиков.
                </p>
                <div className="space-y-3 mt-6">
                  {[
                    { icon: "Shield", title: "Безопасная оплата", desc: "Данные карты защищены шифрованием" },
                    { icon: "RefreshCw", title: "Автопродление", desc: "1 ₽ списывается раз в месяц" },
                    { icon: "X", title: "Легкая отмена", desc: "Отписаться можно в 1 клик в профиле" },
                  ].map(item => (
                    <div key={item.title} className="flex items-start gap-3 p-4 bg-cinema-card border border-white/5 rounded">
                      <div className="w-9 h-9 gold-gradient rounded flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} size={16} className="text-cinema-black" />
                      </div>
                      <div>
                        <p className="text-foreground text-sm font-body font-semibold">{item.title}</p>
                        <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div className="max-w-md animate-scale-in">
              <button
                onClick={() => setStep("plan")}
                className="flex items-center gap-2 text-muted-foreground text-sm font-body mb-8 hover:text-gold transition-colors"
              >
                <Icon name="ArrowLeft" size={14} />
                Назад
              </button>

              <div className="bg-cinema-card border border-gold/20 rounded p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-cinematic text-2xl text-foreground">Оплата</h2>
                  <div className="text-right">
                    <div className="text-gold font-cinematic text-xl font-bold">1 ₽</div>
                    <div className="text-muted-foreground text-xs font-body">в месяц</div>
                  </div>
                </div>

                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label className="block text-xs font-body text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Номер карты
                    </label>
                    <input
                      type="text"
                      placeholder="0000 0000 0000 0000"
                      value={cardNum}
                      onChange={e => setCardNum(formatCard(e.target.value))}
                      className="w-full bg-cinema-black border border-white/10 rounded px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-body text-muted-foreground mb-1.5 uppercase tracking-wider">
                        Срок
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDate}
                        onChange={e => setCardDate(formatDate(e.target.value))}
                        className="w-full bg-cinema-black border border-white/10 rounded px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-body text-muted-foreground mb-1.5 uppercase tracking-wider">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={e => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        className="w-full bg-cinema-black border border-white/10 rounded px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 gold-gradient text-cinema-black font-body font-bold rounded mt-2 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all"
                  >
                    Оплатить 1 ₽
                  </button>
                </form>

                <p className="text-center text-xs text-muted-foreground font-body mt-4">
                  <Icon name="Lock" size={10} className="inline mr-1" />
                  Защищено SSL-шифрованием
                </p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="max-w-md mx-auto text-center py-12 animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full gold-gradient flex items-center justify-center animate-pulse-gold">
                <Icon name="Check" size={36} className="text-cinema-black" />
              </div>
              <h2 className="font-cinematic text-4xl font-bold text-foreground mb-3">
                Добро пожаловать!
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Подписка оформлена. Теперь вам доступны все фильмы библиотеки <span className="text-gold">Синема</span>.
              </p>
              <div className="space-y-3">
                <a href="/catalog" className="block w-full py-3 gold-gradient text-cinema-black font-body font-bold rounded hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">
                  Смотреть фильмы
                </a>
                <a href="/profile" className="block w-full py-3 border border-gold/30 text-gold font-body rounded hover:bg-gold/10 transition-colors">
                  Мой профиль
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
