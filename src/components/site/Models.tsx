import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BatteryCharging, ChevronLeft, ChevronRight, Gauge, Route } from "lucide-react";

import moto1 from "@/assets/moto-1.jpg.asset.json";
import moto2 from "@/assets/moto-2.jpg.asset.json";
import moto3 from "@/assets/moto-3.jpg.asset.json";
import moto4 from "@/assets/moto-4.jpg.asset.json";
import moto5 from "@/assets/moto-5.jpg.asset.json";
import moto6 from "@/assets/moto-6.jpg.asset.json";
import moto7 from "@/assets/moto-7.jpg.asset.json";
import moto8 from "@/assets/moto-8.jpg.asset.json";
import moto9 from "@/assets/moto-9.jpg.asset.json";
import moto10 from "@/assets/moto-10.jpg.asset.json";
import moto11 from "@/assets/moto-11.jpg.asset.json";
import moto12 from "@/assets/moto-12.jpg.asset.json";
import moto13 from "@/assets/moto-13.jpg.asset.json";
import moto14 from "@/assets/moto-14.jpg.asset.json";
import moto15 from "@/assets/moto-15.jpg.asset.json";
import { Reveal } from "./Reveal";

type Model = {
  name: string;
  tag: string;
  image: string;
  autonomy: string;
  speed: string;
  battery: string;
  note: string;
};

const MODELS: Model[] = [
  {
    name: "Bizz",
    tag: "A queridinha do dia a dia",
    image: moto1.url,
    autonomy: "até 80 km",
    speed: "50 km/h",
    battery: "Lítio 60V 20Ah",
    note: "Leve, ágil e perfeita pra quem troca a moto a gasolina pela primeira vez.",
  },
  {
    name: "X13",
    tag: "Presença de esportiva",
    image: moto2.url,
    autonomy: "até 90 km",
    speed: "60 km/h",
    battery: "Lítio 72V 20Ah",
    note: "Design agressivo, freio a disco e torque de sobra pra subida de ladeira.",
  },
  {
    name: "Urban",
    tag: "Conforto pra dois",
    image: moto3.url,
    autonomy: "até 75 km",
    speed: "50 km/h",
    battery: "Lítio 60V 20Ah",
    note: "Banco largo, porta-malas embaixo do assento e suspensão macia.",
  },
  {
    name: "I5 Savage",
    tag: "Robusta e off-road",
    image: moto4.url,
    autonomy: "até 100 km",
    speed: "65 km/h",
    battery: "Lítio 72V 30Ah",
    note: "Pneus largos, baú incluso e estrutura reforçada pra trabalho pesado.",
  },
  {
    name: "Joy",
    tag: "Leveza no trajeto",
    image: moto5.url,
    autonomy: "até 70 km",
    speed: "50 km/h",
    battery: "Lítio 60V 20Ah",
    note: "Compacta e fácil de pilotar — ideal pro trabalho, faculdade e corre do dia.",
  },
  {
    name: "BE-200",
    tag: "Torque silencioso",
    image: moto6.url,
    autonomy: "até 110 km",
    speed: "80 km/h",
    battery: "Lítio 72V 32Ah",
    note: "Naked musculosa com arrancada forte, painel digital e postura de big bike.",
  },
  {
    name: "BE-300",
    tag: "Esportiva de verdade",
    image: moto7.url,
    autonomy: "até 120 km",
    speed: "100 km/h",
    battery: "Lítio 72V 40Ah",
    note: "Carenada, agressiva e a mais rápida da linha. Pra quem quer emoção pura.",
  },
  {
    name: "HE-6",
    tag: "Estilo retrô",
    image: moto8.url,
    autonomy: "até 85 km",
    speed: "60 km/h",
    battery: "Lítio 60V 26Ah",
    note: "Visual clássico de cafe racer com banco em couro e tecnologia elétrica moderna.",
  },
  {
    name: "HE-15",
    tag: "Pra qualquer terreno",
    image: moto9.url,
    autonomy: "até 95 km",
    speed: "70 km/h",
    battery: "Lítio 72V 30Ah",
    note: "Suspensão longa e pneus de cravo pra encarar terra, areia e estrada de chão.",
  },
  {
    name: "Triciclo K3",
    tag: "Carga e estabilidade",
    image: moto11.url,
    autonomy: "até 90 km",
    speed: "45 km/h",
    battery: "Lítio 72V 32Ah",
    note: "Baú grande, três rodas e estabilidade total pra entregas e vendas ambulantes.",
  },
  {
    name: "Urban GT",
    tag: "Compacta e esperta",
    image: moto10.url,
    autonomy: "até 60 km",
    speed: "45 km/h",
    battery: "Lítio 48V 20Ah",
    note: "A porta de entrada da mobilidade elétrica: leve, econômica e dispensa CNH.",
  },
  {
    name: "X13 Sport",
    tag: "Topo de linha",
    image: moto12.url,
    autonomy: "até 130 km",
    speed: "110 km/h",
    battery: "Lítio 72V 45Ah",
    note: "A mais tecnológica: modos de pilotagem, iluminação full LED e freios ABS.",
  },
  {
    name: "Joy Plus",
    tag: "Mais autonomia",
    image: moto13.url,
    autonomy: "até 140 km",
    speed: "90 km/h",
    battery: "Lítio 72V 40Ah",
    note: "Maxi scooter com para-brisa e banco touring pra quem roda o dia inteiro.",
  },
  {
    name: "Savage Pro",
    tag: "Trabalho pesado",
    image: moto14.url,
    autonomy: "até 105 km",
    speed: "75 km/h",
    battery: "Lítio 72V 32Ah",
    note: "Supermoto parruda, pronta pra ladeira, garupa, peso e uso intenso diário.",
  },
  {
    name: "Cargo K1",
    tag: "Parceira do entregador",
    image: moto15.url,
    autonomy: "até 100 km",
    speed: "55 km/h",
    battery: "Lítio 60V 30Ah",
    note: "Baú incluso e autonomia pra jornada completa de entregas sem recarregar.",
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
      className="group relative w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl bg-surface hairline sm:w-[340px] lg:w-[356px]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          style={{ y }}
          src={model.image}
          alt={`Moto elétrica ${model.name} na Thunder Eletric Fortaleza`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-[112%] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface)_4%,transparent_55%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-hot backdrop-blur">
          {model.tag}
        </span>
      </div>

      <div className="relative -mt-10 px-5 pb-6">
        <h3 className="display text-3xl">{model.name}</h3>
        <p className="mt-2 min-h-10 text-sm text-muted-foreground">{model.note}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            { icon: Route, label: "Autonomia", value: model.autonomy },
            { icon: Gauge, label: "Velocidade", value: model.speed },
            { icon: BatteryCharging, label: "Bateria", value: model.battery },
          ].map((spec) => (
            <div key={spec.label} className="rounded-lg bg-surface-2 px-2 py-3">
              <spec.icon className="mx-auto h-4 w-4 text-brand" />
              <dt className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                {spec.label}
              </dt>
              <dd className="text-xs font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex w-full items-center justify-center rounded-full border border-brand/50 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-hot transition-all duration-300 hover:bg-gradient-brand hover:text-primary-foreground"
        >
          Ver preço e condições
        </a>
      </div>
    </motion.article>
  );
}

export function Models({ whatsapp }: { whatsapp: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 2 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step * (window.innerWidth >= 1024 ? 2 : 1), behavior: "smooth" });
  };

  return (
    <section id="modelos" className="relative py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Nossa linha</p>
          <h2 className="display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,4rem)]">
            Escolha a sua. <span className="text-gradient-brand">Todas 100% elétricas.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            15 modelos em linha: Bizz, Urban, X13, I5, Joy, Savage, BE, HE e triciclos. Todas
            com bateria de lítio, garantia e assistência aqui em Fortaleza.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center gap-3">
          <button
            onClick={() => scrollByCards(-1)}
            disabled={!canPrev}
            aria-label="Modelos anteriores"
            className="flex h-12 w-12 items-center justify-center rounded-full hairline text-foreground/80 transition-all duration-300 hover:border-brand hover:text-brand-hot disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scrollByCards(1)}
            disabled={!canNext}
            aria-label="Próximos modelos"
            className="flex h-12 w-12 items-center justify-center rounded-full hairline text-foreground/80 transition-all duration-300 hover:border-brand hover:text-brand-hot disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>
      </div>

      <Reveal delay={0.15} className="relative mt-14">
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
          {MODELS.map((model) => (
            <ModelCard key={model.name} model={model} whatsapp={whatsapp} />
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
            style={{ width: `${Math.max(6, progress * 100)}%` }}
          />
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {String(Math.min(MODELS.length, Math.round(progress * (MODELS.length - 1)) + 1)).padStart(2, "0")}
          {" / "}
          {MODELS.length}
        </span>
      </div>
    </section>
  );
}
