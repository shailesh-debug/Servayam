import { motion } from "motion/react";
import { Lightbulb, BarChart2, Clapperboard, Users, Zap } from "lucide-react";

const reasons = [
  {
    id: 0,
    icon: Lightbulb,
    headline: "We Get Content.",
    subline: "Not just execution.",
    body: "Most animation studios deliver pixels. We deliver performance. Because we run our own channels with real audiences, we know what hooks, what holds attention, and what actually converts. We bring that thinking to every client brief.",
    accent: "bg-primary text-on-primary",
    shadow: "var(--color-primary-dim)",
    label: "INSIGHT",
    rotate: "-rotate-1",
  },
  {
    id: 1,
    icon: BarChart2,
    headline: "Proof, Not Pitch.",
    subline: "400K+ views. Real URLs.",
    body: "When you ask if we can make engaging content, our answer is a YouTube link. Not a deck full of promises. Giggle Filmz and Giggle Explains are live, public, and performing. Our portfolio is our pitch.",
    accent: "bg-tertiary-container text-on-tertiary-container",
    shadow: "var(--color-tertiary-fixed-dim)",
    label: "RESULTS",
    rotate: "rotate-1",
  },
  {
    id: 2,
    icon: Clapperboard,
    headline: "Studio Craft.",
    subline: "Maya. Unreal. Gen AI.",
    body: "We operate a full production pipeline covering 3D animation, rendering, compositing, AI integration, and post. One studio, every layer of the process. No hand-off gaps, no quality loss between steps.",
    accent: "bg-error text-on-error",
    shadow: "var(--color-error-dim)",
    label: "CRAFT",
    rotate: "-rotate-1",
  },
  {
    id: 3,
    icon: Users,
    headline: "Founder-Led Teams.",
    subline: "You talk to the makers.",
    body: "There's no account manager buffering your brief from the animator. Shailesh and the core team are directly involved in every project. That means faster decisions, tighter creative alignment, and zero translation loss.",
    accent: "bg-secondary-container text-on-secondary-container",
    shadow: "var(--color-secondary-dim)",
    label: "DIRECT",
    rotate: "rotate-1",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 md:py-32 px-8 bg-surface overflow-hidden relative"
    >
      {/* Comic rays background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          background: `repeating-conic-gradient(var(--color-on-background) 0 12deg, transparent 12deg 24deg)`,
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="relative inline-block">
            <h2 className="font-pixel text-3xl md:text-5xl uppercase tracking-widest text-on-background px-8 py-4 border-8 border-on-background bg-surface-container-lowest ink-offset-secondary leading-snug">
              WHY US?
            </h2>
            <Zap className="absolute -top-7 -right-7 w-14 h-14 text-primary fill-tertiary-container origin-bottom rotate-12" />
          </div>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-lg leading-relaxed">
            There are a thousand animation studios. Here's the short version
            of why Servayam is the different one.
          </p>
        </motion.div>

        {/* Reason cards — 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 50, rotate: idx % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", damping: 13, stiffness: 85, delay: idx * 0.08 }}
              whileHover={{
                x: -8,
                y: -8,
                boxShadow: `18px 18px 0px 0px ${r.shadow}`,
                transition: { type: "spring", stiffness: 280, damping: 18 },
              }}
              className={`group relative border-4 border-on-background bg-surface-container-lowest ${r.rotate}`}
              style={{ boxShadow: `8px 8px 0px 0px ${r.shadow}` }}
            >
              {/* Label badge */}
              <div className={`absolute -top-4 right-6 ${r.accent} font-pixel text-[0.55rem] px-3 py-1.5 border-2 border-on-background uppercase`}>
                {r.label}
              </div>

              <div className="p-6 md:p-8">
                {/* Icon + headline */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`${r.accent} p-3 border-4 border-on-background shrink-0 shadow-[4px_4px_0_var(--color-on-background)] -rotate-6 group-hover:rotate-6 transition-transform duration-300`}>
                    <r.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-headline font-black text-2xl md:text-3xl uppercase text-on-background leading-tight">
                      {r.headline}
                    </h3>
                    <p className="font-pixel text-[0.6rem] text-on-surface-variant leading-loose">
                      {r.subline}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed border-t-2 border-dashed border-outline-variant pt-5">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
