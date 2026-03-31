import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const navItems = [
  { path: "/", label: "Главная", icon: "Film" },
  { path: "/catalog", label: "Каталог", icon: "Grid3x3" },
  { path: "/favorites", label: "Избранное", icon: "Heart" },
  { path: "/subscription", label: "Подписка", icon: "Crown" },
  { path: "/profile", label: "Профиль", icon: "User" },
  { path: "/support", label: "Поддержка", icon: "LifeBuoy" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cinema-black">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold/10 backdrop-blur-md"
        style={{ background: 'rgba(10,10,10,0.92)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-sm gold-gradient flex items-center justify-center">
                <Icon name="Film" size={16} className="text-cinema-black" />
              </div>
              <span className="font-cinematic text-2xl font-bold tracking-widest text-gold-light uppercase">
                Синема
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm font-body transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-gold bg-gold/10 border border-gold/30"
                      : "text-foreground/60 hover:text-gold hover:bg-gold/5"
                  }`}
                >
                  <Icon name={item.icon} size={14} />
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-foreground/60 hover:text-gold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gold/10 bg-cinema-black/95 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-3.5 text-sm font-body border-b border-white/5 transition-colors ${
                  location.pathname === item.path
                    ? "text-gold bg-gold/10"
                    : "text-foreground/60 hover:text-gold"
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-gold/10 mt-20 py-8 text-center">
        <p className="font-cinematic text-xl text-gold/60 tracking-widest">СИНЕМА</p>
        <p className="text-muted-foreground text-xs mt-1 font-body">© 2026 · Кино без границ</p>
      </footer>
    </div>
  );
}
