import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png";
import { MODELS } from "./Models";

const LINKS = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#economia", label: "Economia" },
  { href: "#duvidas", label: "Dúvidas" },
];

// Placeholder categories/models for the "Modelos" menu — swap in the real
// category names and product lists once they're defined.
const MODEL_CATEGORIES = [
  { name: "Categoria 1", models: ["Kasper", "Sudu A5", "Yoo", "Global Extreme"] },
  { name: "Categoria 2", models: ["Zenvo", "JE-8", "Patinete SE-90", "Global 500"] },
  { name: "Categoria 3", models: ["Tank", "Savage Pro", "Cargo K1", "Sudu A13T"] },
  { name: "Categoria 4", models: ["Patinete P8", "Oggi Big Wheel 8.0", "JE-2"] },
];

export function Header({ whatsapp }: { whatsapp: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [modelsMenuOpen, setModelsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const closeTimeout = useRef<number | undefined>(undefined);

  const openModelsMenu = () => {
    window.clearTimeout(closeTimeout.current);
    setModelsMenuOpen(true);
  };
  const scheduleCloseModelsMenu = () => {
    window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => setModelsMenuOpen(false), 250);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 md:bg-background/95 md:backdrop-blur-xl md:border-b md:border-border ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent md:bg-background/95"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Thunder Eletric" className="h-9 w-auto" />
          <span className="display hidden text-lg leading-none sm:block" translate="no">
            Thunder <span className="text-brand">Eletric</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#modelos"
            onMouseEnter={openModelsMenu}
            onMouseLeave={scheduleCloseModelsMenu}
            className="text-sm text-foreground/70 transition-colors hover:text-brand-hot"
          >
            Modelos
          </a>

          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-foreground/70 transition-colors hover:text-brand-hot"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105 sm:inline-flex"
          >
            Agendar test drive
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            className="rounded-md p-2 text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {modelsMenuOpen && (
        <div
          onMouseEnter={openModelsMenu}
          onMouseLeave={scheduleCloseModelsMenu}
          className="absolute inset-x-0 top-full hidden border-t border-border bg-background/98 shadow-2xl backdrop-blur-xl md:block"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-[200px_1fr] gap-10 px-5 py-8 sm:px-8">
            <div className="flex flex-col gap-1 border-r border-border pr-6">
              {MODEL_CATEGORIES.map((cat, i) => (
                <button
                  key={cat.name}
                  onMouseEnter={() => setActiveCategory(i)}
                  onClick={() => setActiveCategory(i)}
                  className={`rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                    i === activeCategory
                      ? "bg-surface-2 text-brand-hot"
                      : "text-foreground/70 hover:bg-surface-2/60 hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-4 gap-6">
              {MODEL_CATEGORIES[activeCategory].models.map((name) => {
                const model = MODELS.find((m) => m.name === name);
                return (
                  <a
                    key={name}
                    href="#modelos"
                    onClick={() => setModelsMenuOpen(false)}
                    className="group block"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-surface-2">
                      {model && (
                        <img
                          src={model.image}
                          alt={name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <p
                      className="mt-2.5 text-sm font-medium text-foreground/85 transition-colors group-hover:text-brand-hot"
                      translate="no"
                    >
                      {name}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur md:hidden">
          <a
            href="#modelos"
            onClick={() => setOpen(false)}
            className="block py-2.5 text-sm text-foreground/80"
          >
            Modelos
          </a>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-foreground/80"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
