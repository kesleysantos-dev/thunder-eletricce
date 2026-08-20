import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import logo from "@/assets/logo.png.asset.json";

const LINKS = [
  { href: "#modelos", label: "Modelos" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#economia", label: "Economia" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header({ whatsapp }: { whatsapp: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          <img src={logo.url} alt="Thunder Eletric" className="h-10 w-10" />
          <span className="display hidden text-lg leading-none sm:block">
            Thunder <span className="text-brand">Eletric</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
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

      {open && (
        <div className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur md:hidden">
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
