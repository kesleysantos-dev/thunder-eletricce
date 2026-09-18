import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform } from "motion/react";
import {
  BatteryCharging,
  Bluetooth,
  ChevronLeft,
  ChevronRight,
  Cog,
  Disc,
  Route,
  ShieldCheck,
  Weight,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import kasper from "@/assets/modelos/KASPER.jpeg";
import suduA5 from "@/assets/modelos/SUDU A5.jpeg";
import zenvo from "@/assets/modelos/ZENVO.jpeg";
import tank from "@/assets/modelos/TANK.jpeg";
import globalExtreme from "@/assets/modelos/GLOBAL EXTREME.jpeg";
import patineteSe90 from "@/assets/modelos/PATINETE SE-90.jpeg";
import global500 from "@/assets/modelos/GLOBAL 500.jpeg";
import patineteP8 from "@/assets/modelos/PATINETE P8.jpeg";
import oggiBigWheel from "@/assets/modelos/OGGI BIG WHEEL 8.0 .jpeg";
import suduA13t from "@/assets/modelos/SUDU A13T.jpeg";
import yoo from "@/assets/modelos/YOO.jpeg";
import je8 from "@/assets/modelos/JE-8.jpeg";
import je2 from "@/assets/modelos/JE-2.jpeg";
import ecovivaHe15 from "@/assets/modelos/Ecoviva HE-15.jpeg";
import velosterSavage from "@/assets/modelos/Veloster Savage.jpeg";
import angieAg28 from "@/assets/modelos/Angie AG28.jpeg";
import velosterSion from "@/assets/modelos/Veloster Sion.jpeg";
import { Reveal } from "./Reveal";

export type Spec = { icon: LucideIcon; label: string; value: string };

export type Model = {
  name: string;
  tag?: string;
  image: string;
  note?: string;
  specs: Spec[];
  // Temporarily hidden from the site (e.g. expired stock) without deleting
  // its data — flip back to false/remove to bring it back.
  hidden?: boolean;
};

function specsV2(opts: {
  power: string;
  battery: string;
  autonomy: string;
  loadCapacity: string;
  security: string;
  brake: string;
  // Most models use this slot for a security feature (trava/alarme). A few
  // (e.g. the Oggi, an e-bike) use it for something else, like the gearing.
  securityLabel?: string;
  securityIcon?: LucideIcon;
  // The last slot is the brake by default; some models list a different
  // highlight there (e.g. Bluetooth sound).
  brakeLabel?: string;
  brakeIcon?: LucideIcon;
}): Spec[] {
  return [
    { icon: Zap, label: "Motor", value: opts.power },
    { icon: BatteryCharging, label: "Bateria", value: opts.battery },
    { icon: Route, label: "Autonomia", value: opts.autonomy },
    { icon: Weight, label: "Capacidade de carga", value: opts.loadCapacity },
    {
      icon: opts.securityIcon ?? ShieldCheck,
      label: opts.securityLabel ?? "Segurança",
      value: opts.security,
    },
    { icon: opts.brakeIcon ?? Disc, label: opts.brakeLabel ?? "Freio", value: opts.brake },
  ];
}

export const MODELS: Model[] = [
  {
    name: "Kasper",
    image: kasper,
    hidden: true,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Sudu A5",
    image: suduA5,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "180 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Zenvo",
    image: zenvo,
    hidden: true,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Tank",
    image: tank,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Global Extreme",
    image: globalExtreme,
    specs: specsV2({
      power: "1000 W",
      battery: "Chumbo",
      autonomy: "até 60 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Patinete SE-90",
    image: patineteSe90,
    specs: specsV2({
      power: "750 W",
      battery: "Lítio",
      autonomy: "50 a 60 km",
      loadCapacity: "120 kg",
      security: "Sistema NFC",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Global 500",
    image: global500,
    specs: specsV2({
      power: "500 W",
      battery: "Chumbo",
      autonomy: "até 30 km",
      loadCapacity: "150 kg",
      security: "Trava e alarme",
      brake: "Freio a disco",
    }),
  },
  {
    name: "Patinete P8",
    image: patineteP8,
    specs: specsV2({
      power: "350 W",
      battery: "Lítio",
      autonomy: "até 30 km",
      loadCapacity: "120 kg",
      security: "Aplicativo com ferramentas próprias",
      brake: "Freio a disco na roda traseira",
    }),
  },
  {
    name: "Oggi Big Wheel 8.0",
    image: oggiBigWheel,
    specs: specsV2({
      power: "250 W",
      battery: "Lítio removível Samsung",
      autonomy: "até 50 km",
      loadCapacity: "110 kg",
      security: "7 marchas Shimano",
      securityLabel: "Marchas",
      securityIcon: Cog,
      brake: "Freio a disco",
    }),
  },
  {
    name: "Sudu A13T",
    image: suduA13t,
    hidden: true,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 50 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Freio a disco na roda dianteira",
    }),
  },
  {
    name: "Yoo",
    image: yoo,
    specs: specsV2({
      power: "500 W de pico",
      battery: "Chumbo ácido",
      autonomy: "até 30 km",
      loadCapacity: "130 kg",
      security: "Faróis em LED",
      brake: "Freio a tambor",
    }),
  },
  {
    name: "JE-8",
    image: je8,
    specs: specsV2({
      power: "450 W",
      battery: "Lítio removível",
      autonomy: "até 60 km",
      loadCapacity: "160 kg",
      security: "Trava e alarme",
      brake: "Freio a tambor",
    }),
  },
  {
    name: "JE-2",
    image: je2,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 60 km",
      loadCapacity: "160 kg",
      security: "Trava e alarme",
      brake: "Freio dianteiro a disco",
    }),
  },
  {
    name: "Ecoviva HE-15",
    image: ecovivaHe15,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Bluetooth",
      brakeLabel: "Som",
      brakeIcon: Bluetooth,
    }),
  },
  {
    name: "Veloster Savage",
    image: velosterSavage,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Disco hidráulico CBS",
    }),
  },
  {
    name: "Angie AG28",
    image: angieAg28,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 100 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Bluetooth",
      brakeLabel: "Som",
      brakeIcon: Bluetooth,
    }),
  },
  {
    name: "Veloster Sion",
    image: velosterSion,
    specs: specsV2({
      power: "1000 W",
      battery: "Lítio removível",
      autonomy: "até 70 km",
      loadCapacity: "200 kg",
      security: "Trava e alarme",
      brake: "Bluetooth",
      brakeLabel: "Som",
      brakeIcon: Bluetooth,
    }),
  },
];

function ModelCard({
  model,
  whatsapp,
  onOpen,
}: {
  model: Model;
  whatsapp: string;
  onOpen: (model: Model) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      data-card
      onClick={() => onOpen(model)}
      className="group relative flex w-[68vw] max-w-[270px] shrink-0 cursor-pointer flex-col snap-start overflow-hidden rounded-2xl bg-surface hairline sm:w-[290px] lg:w-[300px]"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
        <motion.img
          style={{ y }}
          src={model.image}
          alt={`Moto elétrica ${model.name} na Thunder Eletric Fortaleza`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface)_4%,transparent_55%)]" />
        {model.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-hot backdrop-blur">
            {model.tag}
          </span>
        )}
      </div>

      <div className="relative -mt-7 flex flex-1 flex-col px-4 pb-5">
        <h3 className="display text-2xl" translate="no">
          {model.name}
        </h3>
        {model.note && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{model.note}</p>
        )}

        <dl className="mt-3.5 grid grid-cols-3 gap-2 text-center" translate="no">
          {model.specs.map((spec) => (
            <div key={spec.label} className="rounded-lg bg-surface-2 px-1.5 py-2">
              <spec.icon className="mx-auto h-3.5 w-3.5 text-brand" />
              <dt className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="text-[11px] font-semibold leading-tight">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex-1" />

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 flex w-full items-center justify-center rounded-full border border-brand/50 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-hot transition-all duration-300 hover:bg-gradient-brand hover:text-primary-foreground"
        >
          Ver preço e condições
        </a>
      </div>
    </motion.article>
  );
}

function ModelModal({
  model,
  whatsapp,
  onClose,
}: {
  model: Model;
  whatsapp: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const mid = Math.ceil(model.specs.length / 2);
  const leftSpecs = model.specs.slice(0, mid);
  const rightSpecs = model.specs.slice(mid);

  const specBox = (spec: Spec, align: "left" | "center") => (
    <div
      key={spec.label}
      className={`rounded-xl bg-surface-2 px-3 py-2 sm:px-4 sm:py-3 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <div className={`flex items-center gap-1.5 sm:gap-2 ${align === "center" ? "justify-center" : ""}`}>
        <spec.icon className="h-3.5 w-3.5 shrink-0 text-brand sm:h-4 sm:w-4" />
        <dt className="text-[9px] uppercase tracking-wider text-muted-foreground sm:text-[10px]">
          {spec.label}
        </dt>
      </div>
      <dd className="mt-0.5 text-xs font-semibold leading-tight sm:mt-1 sm:text-sm">{spec.value}</dd>
    </div>
  );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={model.name}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-3 backdrop-blur-md sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[95vh] w-full max-w-4xl flex-col overflow-y-auto rounded-3xl bg-surface hairline"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground/80 backdrop-blur transition-colors hover:text-brand-hot sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 pb-0 sm:p-8 md:grid md:grid-cols-[1fr_1.1fr_1fr] md:items-center md:gap-8 md:p-10">
          <dl className="hidden gap-3 md:grid" translate="no">
            {leftSpecs.map((spec) => specBox(spec, "left"))}
          </dl>

          <div className="flex flex-col items-center text-center">
            {model.tag && (
              <span className="rounded-full bg-brand/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-hot">
                {model.tag}
              </span>
            )}
            <img
              src={model.image}
              alt={`Moto elétrica ${model.name} na Thunder Eletric Fortaleza`}
              className="mt-3 max-h-[22vh] w-auto object-contain sm:max-h-[32vh] md:mt-4 md:max-h-[42vh]"
            />
            <h3 className="display mt-2 text-2xl sm:mt-3 sm:text-3xl" translate="no">
              {model.name}
            </h3>
            {model.note && (
              <p className="mt-1.5 max-w-xs text-xs text-muted-foreground sm:mt-2 sm:text-sm">
                {model.note}
              </p>
            )}

            <dl className="mt-3 grid w-full grid-cols-2 gap-2 sm:mt-4 md:hidden" translate="no">
              {model.specs.map((spec) => specBox(spec, "center"))}
            </dl>
          </div>

          <dl className="hidden gap-3 md:grid" translate="no">
            {rightSpecs.map((spec) => specBox(spec, "left"))}
          </dl>
        </div>

        <div className="mt-4 border-t border-border p-4 sm:mt-0 sm:p-6 md:p-8">
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex w-full max-w-sm items-center justify-center rounded-full bg-gradient-brand py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:py-3.5"
          >
            Preços e Condições
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// Models flagged `hidden` (e.g. temporarily out of stock) stay in MODELS so
// their data isn't lost, but never show up in the carousel or mega menu.
const VISIBLE_MODELS = MODELS.filter((m) => !m.hidden);

const LOOPED_MODELS = [0, 1, 2].flatMap((group) =>
  VISIBLE_MODELS.map((model, i) => ({ ...model, _key: `${group}-${i}` })),
);

export function Models({ whatsapp }: { whatsapp: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [openModel, setOpenModel] = useState<Model | null>(null);

  // The Header's "Modelos" mega menu dispatches this to jump straight to a
  // model's card (and open its detail modal) from anywhere on the site.
  useEffect(() => {
    const onOpenModel = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      const index = VISIBLE_MODELS.findIndex((m) => m.name === name);
      if (index === -1) return;
      const cards = getCards();
      const card = cards[VISIBLE_MODELS.length + index];
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setOpenModel(VISIBLE_MODELS[index]);
    };
    window.addEventListener("thunder:open-model", onOpenModel);
    return () => window.removeEventListener("thunder:open-model", onOpenModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCards = () =>
    Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []);

  // Below lg only one card is visible at a time, so we center it in the
  // viewport via scroll-padding (kept at 0 for the multi-card desktop rows).
  const getCenterPad = (el: HTMLDivElement, card: HTMLElement) => {
    if (window.innerWidth >= 1024) return 0;
    return Math.max(0, (el.clientWidth - card.offsetWidth) / 2);
  };

  const syncCenterPadding = () => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    const pad = `${getCenterPad(el, card)}px`;
    el.style.scrollPaddingLeft = pad;
    el.style.scrollPaddingRight = pad;
  };

  const update = () => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || cards.length < VISIBLE_MODELS.length * 2) return;
    const pitch = (cards[1]?.offsetLeft ?? 0) - cards[0].offsetLeft;
    if (!pitch) return;
    const pad = getCenterPad(el, cards[0]);
    const raw = Math.round((el.scrollLeft + pad - cards[0].offsetLeft) / pitch);
    setActiveIndex(((raw % VISIBLE_MODELS.length) + VISIBLE_MODELS.length) % VISIBLE_MODELS.length);
  };

  const correctLoop = () => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || cards.length < VISIBLE_MODELS.length * 3) return;
    const groupWidth = cards[VISIBLE_MODELS.length].offsetLeft - cards[0].offsetLeft;
    const pad = getCenterPad(el, cards[0]);
    const realStart = cards[VISIBLE_MODELS.length].offsetLeft - pad;
    if (!groupWidth) return;
    if (el.scrollLeft < realStart - groupWidth / 2) {
      el.scrollLeft += groupWidth;
    } else if (el.scrollLeft > realStart + groupWidth * 1.5) {
      el.scrollLeft -= groupWidth;
    }
  };

  // Start the carousel scrolled into the middle (real) copy of the models,
  // with a full loop's worth of clones buffered on each side.
  useEffect(() => {
    const el = trackRef.current;
    const cards = getCards();
    const firstReal = cards[VISIBLE_MODELS.length];
    if (!el || !firstReal) return;
    syncCenterPadding();
    el.scrollLeft = firstReal.offsetLeft - getCenterPad(el, firstReal);
    update();
    const onResize = () => {
      syncCenterPadding();
      update();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let timeout: number | undefined;
    const onScroll = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(correctLoop, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step * (window.innerWidth >= 1024 ? 2 : 1), behavior: "smooth" });
  };

  useEffect(() => {
    if (!inView) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;
      if (e.key === "ArrowLeft") scrollByCards(-1);
      else if (e.key === "ArrowRight") scrollByCards(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inView]);

  return (
    <section id="modelos" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Nossa linha</p>
          <h2 className="display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,4rem)]">
            Escolha a sua. <span className="text-gradient-brand">Todas 100% elétricas.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {VISIBLE_MODELS.length} modelos em linha: Sudu A5, Tank, Global Extreme, Veloster
            Savage, Angie AG28, Global 500, Oggi Big Wheel 8.0 e mais. Todas com garantia e
            assistência aqui em Fortaleza.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative mt-14">
        <button
          onClick={() => scrollByCards(-1)}
          aria-label="Modelo anterior"
          className="absolute left-2 top-[38%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 backdrop-blur transition-all duration-300 hover:border-brand hover:text-brand-hot sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollByCards(1)}
          aria-label="Próximo modelo"
          className="absolute right-2 top-[38%] z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground/80 backdrop-blur transition-all duration-300 hover:border-brand hover:text-brand-hot sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={trackRef}
          onScroll={update}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse") return;
            drag.current = {
              down: true,
              startX: e.clientX,
              startScroll: trackRef.current?.scrollLeft ?? 0,
              moved: false,
            };
            setDragging(true);
          }}
          onPointerMove={(e) => {
            if (!drag.current.down || !trackRef.current) return;
            const dx = e.clientX - drag.current.startX;
            if (Math.abs(dx) > 6) drag.current.moved = true;
            trackRef.current.scrollLeft = drag.current.startScroll - dx;
          }}
          onPointerUp={() => {
            drag.current.down = false;
            setDragging(false);
          }}
          onPointerLeave={() => {
            drag.current.down = false;
            setDragging(false);
          }}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault();
              e.stopPropagation();
              drag.current.moved = false;
            }
          }}
          className={`no-scrollbar flex gap-5 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-[max(2rem,calc((100%-72rem)/2))] ${
            dragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"
          }`}
        >
          {LOOPED_MODELS.map((model) => (
            <ModelCard key={model._key} model={model} whatsapp={whatsapp} onOpen={setOpenModel} />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(to_right,var(--background),transparent)] sm:w-16"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(to_left,var(--background),transparent)] sm:w-16"
          aria-hidden
        />
      </Reveal>

      <div className="mx-auto mt-8 flex max-w-6xl items-center gap-4 px-5 sm:px-8">
        <div className="h-px flex-1 bg-border">
          <div
            className="h-px bg-gradient-brand transition-[width] duration-200"
            style={{ width: `${Math.max(6, (activeIndex / (VISIBLE_MODELS.length - 1)) * 100)}%` }}
          />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {VISIBLE_MODELS.length}
        </span>
      </div>

      {openModel && (
        <ModelModal model={openModel} whatsapp={whatsapp} onClose={() => setOpenModel(null)} />
      )}
    </section>
  );
}
