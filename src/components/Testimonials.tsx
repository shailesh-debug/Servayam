import { useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 0,
    quote:
      "Servayam delivered a 3D product video that made our launch look like a global brand campaign. The attention to detail across lighting, motion and storytelling was on another level. Our conversion rate jumped 40% within two weeks.",
    name: "Arjun Mehta",
    role: "Startup Founder",
    service: "3D Product Video",
    badgeColor: "bg-primary text-on-primary",
    shadowColor: "var(--color-primary-dim)",
    accentColor: "bg-primary",
  },
  {
    id: 1,
    quote:
      "The interior visualizations were so photorealistic that three of my clients signed off without visiting the site. No endless revisions. Just stunning renders that sold the vision immediately.",
    name: "Priya Sharma",
    role: "Real Estate Director",
    service: "3D Interior Viz",
    badgeColor: "bg-tertiary-container text-on-tertiary-container",
    shadowColor: "var(--color-tertiary-fixed-dim)",
    accentColor: "bg-tertiary-container",
  },
  {
    id: 2,
    quote:
      "Servayam actually thinks about what makes content work. The explainer video they built outperformed every paid ad we ran that quarter. Real results, not just pretty pixels.",
    name: "Rahul Nair",
    role: "Creative Head",
    service: "3D Animation",
    badgeColor: "bg-error text-on-error",
    shadowColor: "var(--color-error-dim)",
    accentColor: "bg-error",
  },
  {
    id: 3,
    quote:
      "They nailed the mascot character on the first concept. Expressive, on-brand, production-ready. My audience engagement doubled the week I introduced it. Genuinely blown away by the craft.",
    name: "Sophie Chen",
    role: "Brand Consultant",
    service: "3D Character Design",
    badgeColor: "bg-secondary-container text-on-secondary-container",
    shadowColor: "var(--color-secondary-dim)",
    accentColor: "bg-secondary-container",
  },
  {
    id: 4,
    quote:
      "Working with Servayam felt like having an in-house creative team. They brought ideas we hadn't even thought of and the final animation was cinematic. Our investors were genuinely impressed.",
    name: "Dev Kapoor",
    role: "Product Manager",
    service: "3D Animation",
    badgeColor: "bg-primary text-on-primary",
    shadowColor: "var(--color-primary-dim)",
    accentColor: "bg-primary",
  },
  {
    id: 5,
    quote:
      "Fast, sharp, and they understand deadlines. Delivered a full product walkthrough video in under two weeks. The quality was something I'd expect from a studio three times the size.",
    name: "Meera Joshi",
    role: "E-commerce Brand Owner",
    service: "3D Product Video",
    badgeColor: "bg-tertiary-container text-on-tertiary-container",
    shadowColor: "var(--color-tertiary-fixed-dim)",
    accentColor: "bg-tertiary-container",
  },
];

// Double the array so the marquee loops seamlessly
const row1 = [...testimonials, ...testimonials];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="relative flex-shrink-0 w-[320px] md:w-[380px] border-4 border-on-background bg-surface-container-lowest mx-4"
      style={{ boxShadow: `6px 6px 0px 0px ${t.shadowColor}` }}
    >
      <div className="p-5 flex flex-col gap-4">
        {/* Top: service badge + stars */}
        <div className="flex items-center justify-between">
          <span className={`${t.badgeColor} font-pixel text-[0.5rem] px-2 py-1.5 border-2 border-on-background uppercase`}>
            {t.service}
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-tertiary-container text-tertiary stroke-2" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className="w-7 h-7 text-outline-variant opacity-40 mb-1" strokeWidth={1.5} />
          <p className="font-body text-sm text-on-surface leading-relaxed">
            "{t.quote}"
          </p>
        </div>

        {/* Divider + author */}
        <div className="border-t-2 border-dashed border-outline-variant pt-3 flex items-center gap-3">
          <div className={`${t.accentColor} border-2 border-on-background w-9 h-9 flex items-center justify-center font-headline font-black text-xs uppercase shrink-0`}>
            {t.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-headline font-black text-sm uppercase text-on-background leading-none">
              {t.name}
            </p>
            <p className="font-pixel text-[0.5rem] text-on-surface-variant leading-loose">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 35,
}: {
  items: (typeof testimonials)[0][];
  direction?: "left" | "right";
  speed?: number;
}) {
  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement>(null);

  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo   = direction === "left" ? "-50%" : "0%";

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: [xFrom, xTo],
          transition: { duration: speed, repeat: Infinity, ease: "linear" },
        })
      }
    >
      <motion.div
        ref={trackRef}
        className="flex w-max"
        initial={{ x: xFrom }}
        animate={controls}
        onViewportEnter={() =>
          controls.start({
            x: [xFrom, xTo],
            transition: { duration: speed, repeat: Infinity, ease: "linear" },
          })
        }
        viewport={{ once: false }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 bg-surface-container-low overflow-hidden relative"
    >
      {/* Comic rays background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          background: `repeating-conic-gradient(var(--color-on-background) 0 10deg, transparent 10deg 20deg)`,
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, rotate: 3, scale: 0.9 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16 flex justify-center px-8"
        >
          <div className="relative inline-block">
            <h2 className="font-pixel text-3xl md:text-5xl uppercase tracking-widest text-on-background px-8 py-4 border-8 border-on-background bg-surface-container-lowest ink-offset-primary leading-snug text-center">
              THE VERDICT
            </h2>
            <span className="absolute -top-8 -right-6 font-pixel text-xs bg-tertiary-container text-on-tertiary-container p-2 border-4 border-on-background rotate-[12deg] shadow-[4px_4px_0_var(--color-on-background)] uppercase">
              TRUSTED!
            </span>
          </div>
        </motion.div>

        {/* Single row — moves left */}
        <MarqueeRow items={row1} direction="left" speed={40} />

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", damping: 14 }}
          className="mt-14 mx-4 sm:mx-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 border-4 border-on-background bg-surface-container-lowest px-6 sm:px-8 py-6 max-w-3xl lg:mx-auto"
        >
          {[
            { value: "100%", label: "CLIENT SATISFACTION" },
            { value: "40+", label: "PROJECTS DELIVERED" },
            { value: "5★", label: "AVERAGE RATING" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-pixel text-2xl md:text-3xl text-primary leading-none mb-2">
                {stat.value}
              </span>
              <span className="font-pixel text-[0.5rem] text-on-surface-variant uppercase tracking-widest leading-loose">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
