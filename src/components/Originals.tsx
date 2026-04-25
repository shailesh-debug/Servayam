import { motion } from "motion/react";
import { Play, TrendingUp, Youtube, Film, Zap, Eye, ArrowRight } from "lucide-react";

const channels = [
  {
    id: 0,
    name: "Giggle Filmz",
    handle: "@GiggleFilmz",
    tagline: "3D Shorts That Hit Different.",
    description:
      "Our in-house YouTube Shorts channel powered by 3D animation. Physics experiments, AI decision scenarios, danger simulations. Content that audiences genuinely can't scroll past. The numbers back it up.",
    format: "YouTube Shorts · 3D Animation",
    stack: ["Maya", "Premiere"],
    stats: [
      { icon: Eye, value: "1M+", label: "Total views on channel" },
      { icon: TrendingUp, value: "VIRAL", label: "Proven content performance" },
      { icon: Film, value: "SHORT-FORM", label: "Fast-turn 3D production" },
    ],
    status: "LIVE & GROWING",
    statusColor: "bg-primary text-on-primary",
    accentColor: "bg-primary",
    borderAccent: "border-primary",
    shadowColor: "var(--color-primary-dim)",
    badgeText: "WE BUILT THIS!",
    badgeColor: "bg-tertiary-container text-on-tertiary-container",
    youtubeUrl: "https://www.youtube.com/@GiggleFilmz",
    rotate: "-rotate-1",
  },
  {
    id: 1,
    name: "Giggle Explains",
    handle: "@GiggleExplains",
    tagline: "Complex Things. Simple Stories.",
    description:
      "A long-form YouTube channel that takes anything complex and breaks it down in a way anyone can understand. Big topics, simple storytelling, 3D animation. This is Servayam showing what cinematic educational content looks like when a studio actually cares about how stories land.",
    format: "Long-form YouTube · 10 to 12 min Episodes",
    stack: ["Unreal Engine", "Maya", "Gen AI"],
    stats: [
      { icon: Film, value: "ORIGINAL", label: "In-house IP in production" },
      { icon: Zap, value: "ELI5", label: "Explain it like you're five" },
      { icon: TrendingUp, value: "CINEMATIC", label: "Full storytelling pipeline" },
    ],
    status: "IN PRODUCTION",
    statusColor: "bg-error text-on-error",
    accentColor: "bg-error",
    borderAccent: "border-error",
    shadowColor: "var(--color-error-dim)",
    badgeText: "OUR STORY!",
    badgeColor: "bg-secondary-container text-on-secondary-container",
    youtubeUrl: "https://www.youtube.com/@GiggleExplains",
    rotate: "rotate-1",
  },
];

export default function Originals() {
  return (
    <section
      id="originals"
      className="py-24 md:py-32 px-8 bg-on-background text-surface overflow-hidden relative"
    >
      {/* Halftone texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-surface) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="relative inline-block">
              <h2 className="font-pixel text-xl sm:text-2xl md:text-4xl lg:text-5xl uppercase tracking-wide sm:tracking-widest text-surface px-4 sm:px-8 py-4 border-8 border-surface bg-on-background ink-offset-secondary leading-snug">
                SERVAYAM<br />
                <span className="text-tertiary-container">ORIGINALS</span>
              </h2>
              <span className="absolute -top-7 -right-4 font-pixel text-[0.6rem] bg-error text-on-error p-2 border-4 border-surface rotate-[14deg] shadow-[4px_4px_0_var(--color-surface)]">
                IP!
              </span>
            </div>
            <p className="font-body text-outline-variant text-base md:text-lg max-w-md leading-relaxed">
              We don't just animate for clients. We build our own content.
              These channels are proof that we understand what makes audiences stay.
            </p>
          </div>
        </motion.div>

        {/* Channel Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {channels.map((ch, idx) => (
            <motion.div
              key={ch.id}
              initial={{ opacity: 0, y: 60, rotate: idx === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", damping: 14, stiffness: 80, delay: idx * 0.1 }}
              whileHover={{
                y: -10,
                rotate: idx === 0 ? -1 : 1,
                boxShadow: `20px 20px 0px 0px ${ch.shadowColor}`,
                transition: { type: "spring", stiffness: 250, damping: 18 },
              }}
              className={`relative border-4 border-surface bg-surface-container-lowest text-on-background ${ch.rotate}`}
              style={{ boxShadow: `10px 10px 0px 0px ${ch.shadowColor}` }}
            >
              {/* Comic pop label */}
              <motion.span
                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 10 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 + idx * 0.1 }}
                className={`absolute -top-7 -left-5 ${ch.badgeColor} font-pixel text-[0.55rem] p-3 border-4 border-on-background z-20 comic-burst shadow-lg uppercase`}
              >
                {ch.badgeText}
              </motion.span>

              {/* Colored top bar */}
              <div className={`${ch.accentColor} border-b-4 border-on-background px-6 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-surface" />
                  <span className="font-pixel text-[0.6rem] text-surface uppercase">{ch.format}</span>
                </div>
                <span className={`font-pixel text-[0.5rem] px-2 py-1 border-2 border-surface bg-surface/20 text-surface uppercase`}>
                  {ch.status}
                </span>
              </div>

              <div className="p-6 md:p-8">
                {/* Channel name + handle */}
                <div className="mb-4">
                  <h3 className="font-headline font-black text-3xl md:text-4xl uppercase text-on-background leading-none mb-1">
                    {ch.name}
                  </h3>
                  <p className="font-pixel text-[0.55rem] text-on-surface-variant">{ch.handle}</p>
                </div>

                {/* Tagline */}
                <p className={`font-headline font-black text-xl md:text-2xl italic mb-5 ${ch.id === 0 ? "text-primary" : "text-error"}`}>
                  "{ch.tagline}"
                </p>

                {/* Description */}
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 border-l-4 border-outline-variant pl-4">
                  {ch.description}
                </p>

                {/* YouTube preview card — Giggle Filmz only. Replace VIDEO_ID below with any Shorts video ID from the channel */}
                {ch.id === 0 && (
                  <a
                    href="https://www.youtube.com/@GiggleFilmz/shorts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mb-6 flex items-center gap-4 border-4 border-on-background bg-surface-container p-4 hover:bg-primary hover:text-on-primary transition-colors shadow-[6px_6px_0px_0px_var(--color-primary-dim)] hover:shadow-[10px_10px_0px_0px_var(--color-primary-dim)]"
                  >
                    <div className="bg-primary group-hover:bg-surface-container-lowest border-4 border-on-background p-4 shrink-0 transition-colors">
                      <Play className="w-8 h-8 text-on-primary group-hover:text-primary fill-current transition-colors" />
                    </div>
                    <div>
                      <p className="font-headline font-black text-lg uppercase text-on-background group-hover:text-on-primary transition-colors leading-tight">
                        Watch on YouTube
                      </p>
                      <p className="font-pixel text-[0.5rem] text-on-surface-variant group-hover:text-on-primary/70 transition-colors leading-loose uppercase mt-1">
                        @GiggleFilmz Shorts
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-on-surface-variant group-hover:text-on-primary transition-colors" />
                  </a>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {ch.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="border-2 border-on-background p-3 flex flex-col items-center text-center bg-surface-container"
                    >
                      <stat.icon className="w-5 h-5 mb-1 text-on-surface-variant" />
                      <span className="font-pixel text-[0.6rem] text-on-background leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="font-pixel text-[0.45rem] text-on-surface-variant leading-loose">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stack tags + CTA */}
                <div className="flex flex-wrap items-center gap-3 justify-between">
                  <div className="flex flex-wrap gap-2">
                    {ch.stack.map((tool) => (
                      <span
                        key={tool}
                        className="font-pixel text-[0.5rem] px-2 py-1 border-2 border-on-background bg-surface-container text-on-surface-variant uppercase"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <a
                    href={ch.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ch.accentColor} border-4 border-on-background px-4 py-2 flex items-center gap-2 font-pixel text-[0.55rem] text-surface uppercase ink-offset-black hover:translate-x-[-3px] hover:translate-y-[-3px] transition-transform`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Watch Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
