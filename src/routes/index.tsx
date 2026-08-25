import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  BatteryCharging,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Models } from "@/components/site/Models";
import { Reveal } from "@/components/site/Reveal";
import moto2 from "@/assets/moto-2.jpg.asset.json";
import moto3 from "@/assets/moto-3.jpg.asset.json";
import logo from "@/assets/logo.png.asset.json";

const WHATSAPP =
  "https://wa.me/5585999999999?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20as%20motos%20el%C3%A9tricas.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thunder Eletric Fortaleza | Motos Elétricas com Garantia" },
      {
        name: "description",
        content:
          "Motos e scooters elétricas em Fortaleza: Bizz, Urban, X13, I5, Joy e mais. Bateria de lítio, garantia, assistência técnica e test drive com pronta entrega.",
      },
      { property: "og:title", content: "Thunder Eletric Fortaleza | Motos Elétricas" },
      {
        property: "og:description",
        content:
          "Modelos 100% elétricos com garantia, peças, assistência técnica e entrega em Fortaleza. Agende seu test drive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const BENEFITS = [
  {
    icon: BatteryCharging,
    title: "Bateria de lítio",
    text: "Mais leve, carrega mais rápido e dura até 4x mais ciclos que a de chumbo.",
  },
  {
    icon: Wrench,
    title: "Assistência própria",
    text: "Oficina, peças originais e técnicos treinados aqui em Fortaleza — sem depender de fábrica.",
  },
  {
    icon: ShieldCheck,
    title: "Garantia real",
    text: "Garantia de fábrica na moto e na bateria, com suporte direto com a nossa equipe.",
  },
  {
    icon: Truck,
    title: "Entrega e pronta entrega",
    text: "Levamos até você em toda a Grande Fortaleza. Saiu da loja, saiu rodando.",
  },
];

const FAQ = [
  {
    q: "Precisa de CNH ou emplacamento?",
    a: "Os modelos com até 50 km/h e potência dentro da regra do CONTRAN dispensam CNH e emplacamento. Nos modelos mais potentes, explicamos direitinho o que é exigido antes da compra.",
  },
  {
    q: "Quanto custa carregar?",
    a: "Uma carga completa fica em torno de R$ 1 a R$ 2 de energia. Rodando todo dia, a conta costuma ficar abaixo de R$ 30 no mês — bem menos que um tanque de gasolina.",
  },
  {
    q: "Qual a autonomia real?",
    a: "Depende do modelo, do peso e do terreno: a média fica entre 60 e 100 km por carga. No test drive mostramos o consumo real da moto que você escolher.",
  },
  {
    q: "Vocês parcelam?",
    a: "Sim. Trabalhamos com cartão, pix, entrada + parcelas e opções de financiamento. Chame no WhatsApp que a gente simula em minutos.",
  },
  {
    q: "E a manutenção?",
    a: "Não tem óleo, corrente nem vela. A revisão é simples e barata, e fazemos tudo na nossa oficina com peças em estoque.",
  },
];

function Marquee() {
  const items = [
    "Bizz",
    "Urban",
    "X13",
    "I5",
    "Joy",
    "Savage",
    "BE-200",
    "BE-300",
    "HE-6",
    "HE-15",
    "Triciclo K3",
  ];
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/60 py-5">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="display flex items-center gap-10 text-2xl text-foreground/35"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

function ParallaxBanner() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);

  return (
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
      <motion.img
        style={{ y }}
        src={moto2.url}
        alt="Moto elétrica vermelha da Thunder Eletric"
        loading="lazy"
        className="absolute inset-0 h-[128%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_70%_50%,transparent,var(--background))]" />
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8"
      >
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-brand">Test drive grátis</p>
          <h2 className="display mt-4 text-[clamp(2.2rem,6.5vw,4.5rem)]">
            Sentiu o torque, <span className="text-gradient-brand">não volta atrás.</span>
          </h2>
          <p className="mt-5 text-foreground/75">
            Venha na loja e pilote antes de decidir. Em 5 minutos você entende por que mais
            de 10 mil pessoas acompanham a Thunder aqui em Fortaleza.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="h-4 w-4" /> Agendar meu test drive
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Counter({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="text-center">
      <p className="display text-[clamp(2.2rem,6vw,3.6rem)] text-gradient-brand">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="bg-background">
      <Header whatsapp={WHATSAPP} />
      <main>
        <Hero whatsapp={WHATSAPP} />
        <Marquee />

        <section id="vantagens" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] text-brand">Por que a Thunder</p>
              <h2 className="display mt-3 text-[clamp(2.2rem,6vw,4rem)]">
                Loja de verdade,
                <br />
                <span className="text-gradient-brand">não é só entrega.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Muita gente vende moto elétrica pela internet e some depois da venda. Aqui você
                tem endereço, oficina, peça em estoque e gente pra atender no dia seguinte.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <Counter value="10" suffix=" mil" label="Seguidores" />
                <Counter value="12" suffix="+" label="Modelos" />
                <Counter value="100" suffix="%" label="Elétricas" />
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl bg-surface p-6 hairline transition-colors duration-500 hover:border-brand/50">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/12 text-brand transition-transform duration-500 group-hover:-translate-y-1">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Models whatsapp={WHATSAPP} />
        <ParallaxBanner />

        <section id="economia" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Faz a conta</p>
            <h2 className="display mt-3 max-w-2xl text-[clamp(2.2rem,6vw,4rem)]">
              Todo mês no posto, ou <span className="text-gradient-brand">na tomada?</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl bg-surface p-8 hairline">
                <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Moto a gasolina
                </h3>
                <p className="display mt-3 text-4xl text-foreground/60">~R$ 380/mês</p>
                <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                  {[
                    "Combustível toda semana",
                    "Óleo, corrente, vela e filtro",
                    "IPVA, licenciamento e seguro",
                    "Barulho e revisão constante",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Minus className="h-4 w-4 shrink-0 text-destructive" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl bg-surface p-8 hairline">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" />
                <h3 className="text-sm uppercase tracking-[0.2em] text-brand">Thunder elétrica</h3>
                <p className="display mt-3 text-4xl text-gradient-brand">~R$ 28/mês</p>
                <ul className="mt-6 space-y-3 text-sm text-foreground/80">
                  {[
                    "Carrega em tomada comum de casa",
                    "Sem óleo, sem corrente, sem vela",
                    "Modelos isentos de CNH e IPVA",
                    "Silenciosa e com manutenção mínima",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Plus className="h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-border bg-surface/40 py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <h2 className="display text-[clamp(2rem,5vw,3.2rem)]">
                Quem já trocou, <span className="text-gradient-brand">conta aí</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Rafael M.",
                  text: "Comprei a Bizz pra trabalhar de entrega. Economizo mais de R$ 300 por mês e nunca mais parei no posto.",
                },
                {
                  name: "Juliana S.",
                  text: "Atendimento sem enrolação. Fiz o test drive, levei no mesmo dia e a assistência resolveu tudo rapidinho depois.",
                },
                {
                  name: "Carlos A.",
                  text: "A X13 impressiona. Silenciosa, rápida no arranque e o pessoal da loja explicou tudo sobre a bateria de lítio.",
                },
              ].map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <figure className="h-full rounded-2xl bg-surface p-7 hairline">
                    <div className="mb-4 text-brand">★★★★★</div>
                    <blockquote className="text-sm leading-relaxed text-foreground/80">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t.name}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="duvidas" className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-brand">Dúvidas frequentes</p>
            <h2 className="display mt-3 text-[clamp(2rem,5.5vw,3.4rem)]">
              Perguntou, <span className="text-gradient-brand">respondemos.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="mt-10">
              {FAQ.map((item) => (
                <AccordionItem key={item.q} value={item.q} className="border-border">
                  <AccordionTrigger className="text-left text-base hover:text-brand-hot">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </section>

        <section className="relative overflow-hidden">
          <img
            src={moto3.url}
            alt="Scooter elétrica azul"
            loading="lazy"
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--background),color-mix(in_oklab,var(--background)_70%,transparent))]" />
          <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-8">
            <Reveal>
              <h2 className="display text-[clamp(2.2rem,7vw,4.5rem)]">
                Sua próxima moto <span className="text-gradient-brand">não usa gasolina.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-foreground/75">
                Fale agora com um consultor, tire suas dúvidas e garanta condição especial de
                pronta entrega.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="animate-pulse-ring mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-9 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" /> Chamar no WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-surface/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <img src={logo.url} alt="Thunder Eletric Fortaleza" className="h-12 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Thunder Eletric Fortaleza — modelos 100% elétricos, peças, garantia e assistência
              técnica.
            </p>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" /> Fortaleza — CE
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand" /> Atendimento no WhatsApp
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-brand" /> Entregas em toda a Grande Fortaleza
            </p>
          </div>
          <div className="text-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Navegue</p>
            <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
              <a href="#modelos" className="hover:text-brand-hot">
                Modelos
              </a>
              <a href="#economia" className="hover:text-brand-hot">
                Economia
              </a>
              <a href="#duvidas" className="hover:text-brand-hot">
                Dúvidas
              </a>
              <a
                href="https://instagram.com/thundereletricce"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-hot"
              >
                @thundereletricce
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} Thunder Eletric Fortaleza. Todos os direitos reservados.
        </div>
      </footer>

      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
