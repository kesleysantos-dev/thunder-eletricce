import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  BatteryCharging,
  ChevronLeft,
  ChevronRight,
  Clock,
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
import moto5 from "@/assets/moto-5.jpg";
import moto6 from "@/assets/moto-6.jpg";
import moto7 from "@/assets/moto-7.jpg";
import moto8 from "@/assets/moto-8.jpg";
import moto9 from "@/assets/moto-9.jpg";
import moto10 from "@/assets/moto-10.jpg";
import moto11 from "@/assets/moto-11.jpg";
import moto12 from "@/assets/moto-12.jpg";
import moto13 from "@/assets/moto-13.jpg";
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
}): Spec[] {
  return [
    { icon: Zap, label: "Motor", value: opts.power },
    { icon: BatteryCharging, label: "Bateria", value: opts.battery },
    { icon: Route, label: "Autonomia", value: opts.autonomy },
    { icon: Weight, label: "Capacidade de carga", value: opts.loadCapacity },
    { icon: ShieldCheck, label: "Segurança", value: opts.security },
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
    name: "Joy",
    tag: "Leveza no trajeto",
    image: moto5,
    note: "Compacta e fácil de pilotar — ideal pro trabalho, faculdade e corre do dia.",
    specs: specsV1({
      autonomy: "até 70 km",
      speed: "50 km/h",
      battery: "Lítio 60V 20Ah",
      chargeTime: "4h",
      weight: "65 kg",
      power: "700 W",
    }),
  },
  {
    name: "BE-200",
    tag: "Torque silencioso",
    image: moto6,
    note: "Naked musculosa com arrancada forte, painel digital e postura de big bike.",
    specs: specsV1({
      autonomy: "até 110 km",
      speed: "80 km/h",
      battery: "Lítio 72V 32Ah",
      chargeTime: "6h",
      weight: "95 kg",
      power: "2.000 W",
    }),
  },
  {
    name: "BE-300",
    tag: "Esportiva de verdade",
    image: moto7,
    note: "Carenada, agressiva e a mais rápida da linha. Pra quem quer emoção pura.",
    specs: specsV1({
      autonomy: "até 120 km",
      speed: "100 km/h",
      battery: "Lítio 72V 40Ah",
      chargeTime: "7h",
      weight: "110 kg",
      power: "3.000 W",
    }),
  },
  {
    name: "HE-6",
    tag: "Estilo retrô",
    image: moto8,
    note: "Visual clássico de cafe racer com banco em couro e tecnologia elétrica moderna.",
    specs: specsV1({
      autonomy: "até 85 km",
      speed: "60 km/h",
      battery: "Lítio 60V 26Ah",
      chargeTime: "5h",
      weight: "78 kg",
      power: "1.000 W",
    }),
  },
  {
    name: "HE-15",
    tag: "Pra qualquer terreno",
    image: moto9,
    note: "Suspensão longa e pneus de cravo pra encarar terra, areia e estrada de chão.",
    specs: specsV1({
      autonomy: "até 95 km",
      speed: "70 km/h",
      battery: "Lítio 72V 30Ah",
      chargeTime: "6h",
      weight: "88 kg",
      power: "1.500 W",
    }),
  },
  {
    name: "Triciclo K3",
    tag: "Carga e estabilidade",
    image: moto11,
    note: "Baú grande, três rodas e estabilidade total pra entregas e vendas ambulantes.",
    specs: specsV1({
      autonomy: "até 90 km",
      speed: "45 km/h",
      battery: "Lítio 72V 32Ah",
      chargeTime: "6h",
      weight: "140 kg",
      power: "1.200 W",
    }),
  },
  {
    name: "Urban GT",
    tag: "Compacta e esperta",
    image: moto10,
    note: "A porta de entrada da mobilidade elétrica: leve, econômica e dispensa CNH.",
    specs: specsV1({
      autonomy: "até 60 km",
      speed: "45 km/h",
      battery: "Lítio 48V 20Ah",
      chargeTime: "4h",
      weight: "58 kg",
      power: "500 W",
    }),
  },
  {
    name: "X13 Sport",
    tag: "Topo de linha",
    image: moto12,
    note: "A mais tecnológica: modos de pilotagem, iluminação full LED e freios ABS.",
    specs: specsV1({
      autonomy: "até 130 km",
      speed: "110 km/h",
      battery: "Lítio 72V 45Ah",
      chargeTime: "7h",
      weight: "98 kg",
      power: "3.500 W",
    }),
  },
  {
    name: "Joy Plus",
    tag: "Mais autonomia",
    image: moto13,
    note: "Maxi scooter com para-brisa e banco touring pra quem roda o dia inteiro.",
    specs: specsV1({
      autonomy: "até 140 km",
      speed: "90 km/h",
      battery: "Lítio 72V 40Ah",
      chargeTime: "6h",
      weight: "92 kg",
      power: "2.000 W",
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
      className="group relative w-[68vw] max-w-[270px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-2xl bg-surface hairline sm:w-[290px] lg:w-[300px]"
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

      <div className="relative -mt-7 px-4 pb-5">
        <h3 className="display text-2xl">{model.name}</h3>
        {model.note && (
          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{model.note}</p>
        )}

        <dl className="mt-3.5 grid grid-cols-3 gap-2 text-center">
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
            15 modelos em linha: Kasper, Sudu A5, Zenvo, Tank, Joy, Savage, BE, HE e triciclos.
            Todas com bateria de lítio, garantia e assistência aqui em Fortaleza.
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
