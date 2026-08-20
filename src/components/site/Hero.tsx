import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown, Zap } from "lucide-react";

import heroVideo from "@/assets/hero.mp4.asset.json";
import heroVideo2 from "@/assets/hero-2.mp4.asset.json";
import logo from "@/assets/logo.png.asset.json";

const CLIPS = [heroVideo.url, heroVideo2.url];
const SCENE_MS = 8200;

export function Hero({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % CLIPS.length), SCENE_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const play = () => {
      ref.current?.querySelectorAll("video").forEach((v) => {
        v.muted = true;
        void v.play().catch(() => {});
      });
    };
    play();
    document.addEventListener("pointerdown", play, { once: true });
    return () => document.removeEventListener("pointerdown", play);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: videoY }} className="absolute inset-0 -top-[10%] h-[120%]">
        {CLIPS.map((src, i) => (
          <video
            key={src}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity: scrimOpacity }}
        className="absolute inset-0 bg-background"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--background)_2%,color-mix(in_oklab,var(--background)_55%,transparent)_45%,transparent_80%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[image:var(--gradient-fade)]"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 sm:px-8"
      >
        <motion.img
          src={logo.url}
          alt="Thunder Eletric Fortaleza"
          className="mb-7 h-20 w-20 sm:h-24 sm:w-24"
          initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        />

        <motion.span
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs tracking-[0.22em] uppercase text-brand-hot"
        >
          <Zap className="h-3.5 w-3.5" /> Fortaleza · Pronta entrega
        </motion.span>

        <h1 className="display max-w-3xl text-[clamp(2.9rem,9vw,6.5rem)]">
          {["A cidade", "é sua.", "Sem gasolina."].map((line, i) => (
            <motion.span
              key={line}
              className="block overflow-hidden"
              initial={{ opacity: 0, y: "60%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            >
              <span className={i === 2 ? "text-gradient-brand" : undefined}>{line}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-6 max-w-xl text-base text-foreground/75 sm:text-lg"
        >
          Motos e scooters 100% elétricas com garantia, assistência técnica própria e
          entrega em toda a Grande Fortaleza. Rode o mês inteiro por menos de R$ 30 de
          energia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="animate-pulse-ring inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-transform duration-300 hover:scale-[1.04]"
          >
            Falar com um consultor
          </a>
          <a
            href="#modelos"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-foreground/85 transition-colors duration-300 hover:border-brand hover:text-brand-hot"
          >
            Ver modelos
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/50">
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </div>
    </section>
  );
}
