import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BatteryCharging, Gauge, Route } from "lucide-react";

import moto1 from "@/assets/moto-1.jpg.asset.json";
import moto2 from "@/assets/moto-2.jpg.asset.json";
import moto3 from "@/assets/moto-3.jpg.asset.json";
import moto4 from "@/assets/moto-4.jpg.asset.json";
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
    name: "Urban Joy",
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
];

function ModelCard({ model, index, whatsapp }: { model: Model; index: number; whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="group relative overflow-hidden rounded-2xl bg-surface hairline"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.img
          style={{ y }}
          src={model.image}
          alt={`Moto elétrica ${model.name} na Thunder Eletric Fortaleza`}
          loading="lazy"
          className="absolute inset-0 h-[112%] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--surface)_4%,transparent_55%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-hot backdrop-blur">
          {model.tag}
        </span>
      </div>

      <div className="relative -mt-10 px-5 pb-6">
        <h3 className="display text-3xl">{model.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{model.note}</p>

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
  return (
    <section id="modelos" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-brand">Nossa linha</p>
        <h2 className="display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,4rem)]">
          Escolha a sua. <span className="text-gradient-brand">Todas 100% elétricas.</span>
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Trabalhamos com Bizz, Urban, X13, I5, Joy, Savage, BE-200, BE-300, HE-6, HE-15 e
          triciclos. Todas com bateria de lítio, garantia e assistência aqui em Fortaleza.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((model, i) => (
          <ModelCard key={model.name} model={model} index={i} whatsapp={whatsapp} />
        ))}
      </div>
    </section>
  );
}
