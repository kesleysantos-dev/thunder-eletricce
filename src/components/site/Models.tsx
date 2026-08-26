import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Disc,
  Gauge,
  Route,
  ShieldCheck,
  Weight,
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
import moto14 from "@/assets/moto-14.jpg";
import moto15 from "@/assets/moto-15.jpg";
import { Reveal } from "./Reveal";

export type Spec = { icon: LucideIcon; label: string; value: string };

export type Model = {
  name: string;
  tag?: string;
  image: string;
  note?: string;
  specs: Spec[];
};

// Standard spec set used by most models in the line (autonomy/speed/battery/
// charge time/weight/power). The 4 newest models (Kasper, Sudu A5, Zenvo,
// Tank) use a different spec set provided by the store — see specsV2 below.
function specsV1(opts: {
  autonomy: string;
  speed: string;
  battery: string;
  chargeTime: string;
  weight: string;
  power: string;
}): Spec[] {
  return [
    { icon: Route, label: "Autonomia", value: opts.autonomy },
    { icon: Gauge, label: "Velocidade", value: opts.speed },
    { icon: BatteryCharging, label: "Bateria", value: opts.battery },
    { icon: Clock, label: "Recarga", value: opts.chargeTime },
    { icon: Weight, label: "Peso", value: opts.weight },
    { icon: Zap, label: "Potência", value: opts.power },
  ];
}

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
    { icon: Disc, label: "Freio", value: opts.brake },
  ];
}

export const MODELS: Model[] = [
  {
    name: "Kasper",
    image: kasper,
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
    name: "Savage Pro",
    tag: "Trabalho pesado",
    image: moto14,
    note: "Supermoto parruda, pronta pra ladeira, garupa, peso e uso intenso diário.",
    specs: specsV1({
      autonomy: "até 105 km",
      speed: "75 km/h",
      battery: "Lítio 72V 32Ah",
      chargeTime: "6h",
      weight: "100 kg",
      power: "1.800 W",
    }),
  },
  {
    name: "Cargo K1",
    tag: "Parceira do entregador",
    image: moto15,
    note: "Baú incluso e autonomia pra jornada completa de entregas sem recarregar.",
    specs: specsV1({
      autonomy: "até 100 km",
      speed: "55 km/h",
      battery: "Lítio 60V 30Ah",
      chargeTime: "5h",
      weight: "82 kg",
      power: "1.200 W",
    }),
  },
];

function ModelCard({ model, whatsapp }: { model: Model; whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      data-card
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
          className="mt-4 flex w-full items-center justify-center rounded-full border border-brand/50 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-hot transition-all duration-300 hover:bg-gradient-brand hover:text-primary-foreground"
        >
          Ver preço e condições
        </a>
      </div>
    </motion.article>
  );
}

const LOOPED_MODELS = [0, 1, 2].flatMap((group) =>
  MODELS.map((model, i) => ({ ...model, _key: `${group}-${i}` })),
);

export function Models({ whatsapp }: { whatsapp: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);

  const getCards = () =>
    Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-card]") ?? []);

  const update = () => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || cards.length < MODELS.length * 2) return;
    const pitch = (cards[1]?.offsetLeft ?? 0) - cards[0].offsetLeft;
    if (!pitch) return;
    const raw = Math.round((el.scrollLeft - cards[0].offsetLeft) / pitch);
    setActiveIndex(((raw % MODELS.length) + MODELS.length) % MODELS.length);
  };

  const correctLoop = () => {
    const el = trackRef.current;
    const cards = getCards();
    if (!el || cards.length < MODELS.length * 3) return;
    const groupWidth = cards[MODELS.length].offsetLeft - cards[0].offsetLeft;
    const realStart = cards[MODELS.length].offsetLeft;
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
    const firstReal = cards[MODELS.length];
    if (!el || !firstReal) return;
    el.scrollLeft = firstReal.offsetLeft;
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
            15 modelos em linha: Kasper, Sudu A5, Zenvo, Tank, Global Extreme, Patinete SE-90,
            Global 500, Patinete P8, Oggi Big Wheel 8.0 e mais. Todas com garantia e assistência
            aqui em Fortaleza.
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
            <ModelCard key={model._key} model={model} whatsapp={whatsapp} />
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
            style={{ width: `${Math.max(6, (activeIndex / (MODELS.length - 1)) * 100)}%` }}
          />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")}
          {" / "}
          {MODELS.length}
        </span>
      </div>
    </section>
  );
}
