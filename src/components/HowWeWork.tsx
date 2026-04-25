import { motion } from "motion/react";
import { FileText, Lightbulb, Clapperboard, PackageCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Brief",
    short: "You Talk. We Listen.",
    body: "Tell us what you need. Goals, audience, style references, deadline. No standard form, no corporate intake process. Just a real conversation about your project.",
    color: "bg-primary text-on-primary",
    shadowColor: "var(--color-primary-dim)",
    labelColor: "bg-primary text-on-primary",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Concept",
    short: "Direction Before Production.",
    body: "We come back with a creative direction. Style frames, storyboard, or mood references depending on the scope. You approve the vision before a single frame gets animated.",
    color: "bg-tertiary-container text-on-tertiary-container",
    shadowColor: "var(--color-tertiary-fixed-dim)",
    labelColor: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    number: "03",
    icon: Clapperboard,
    title: "Production",
    short: "Where the Craft Happens.",
    body: "Animation, rendering, compositing, sound. You get progress updates at key milestones so nothing is a surprise at the end. Revisions are handled fast.",
    color: "bg-error text-on-error",
    shadowColor: "var(--color-error-dim)",
    labelColor: "bg-error text-on-error",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Delivery",
    short: "Ready to Publish.",
    body: "Final files, broadcast-ready, in every format you need. MP4, ProRes, transparent background, platform cuts — whatever the project calls for. Done.",
    color: "bg-secondary-container text-on-secondary-container",
    shadowColor: "var(--color-secondary-dim)",
    labelColor: "bg-secondary-container text-on-secondary-container",
  },
];

export default function HowWeWork() {
  return (
    <section
      id="process"
      className="py-24 md:py-32 px-8 bg-surface-container overflow-hidden relative"
    >
      {/* Halftone bg */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-on-background) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div className="relative inline-block">
            <h2 className="font-pixel text-3xl md:text-5xl uppercase tracking-widest text-on-background px-8 py-4 border-8 border-on-background bg-surface-container-lowest ink-offset-black leading-snug">
              HOW WE WORK
            </h2>
            <span className="absolute -top-7 -right-5 font-pixel text-[0.6rem] bg-primary text-on-primary p-2 border-4 border-on-background rotate-[10deg] shadow-[4px_4px_0_var(--color-on-background)] uppercase">
              4 STEPS!
            </span>
          </div>
          <p className="font-body text-on-surface-variant text-base md:text-lg max-w-md leading-relaxed">
            No surprises, no black boxes. Here's exactly what working with Servayam looks like from the first message to final delivery.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-on-background">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", damping: 14, stiffness: 80, delay: idx * 0.1 }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 18 },
              }}
              className={`group relative border-r-4 last:border-r-0 border-on-background bg-surface-container-lowest flex flex-col`}
            >
              {/* Step number bar */}
              <div className={`${step.color} border-b-4 border-on-background px-5 py-3 flex items-center justify-between`}>
                <span className="font-pixel text-[0.7rem] opacity-80 uppercase">Step</span>
                <span className="font-headline font-black text-2xl">{step.number}</span>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                {/* Icon */}
                <div
                  className={`${step.color} p-3 border-4 border-on-background self-start mb-5 shadow-[4px_4px_0_var(--color-on-background)] -rotate-6 group-hover:rotate-6 transition-transform duration-300`}
                >
                  <step.icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-headline font-black text-2xl uppercase text-on-background mb-1">
                  {step.title}
                </h3>
                <p className="font-pixel text-[0.55rem] text-on-surface-variant leading-loose mb-4">
                  {step.short}
                </p>

                {/* Body */}
                <p className="font-body text-sm text-on-surface-variant leading-relaxed border-t-2 border-dashed border-outline-variant pt-4 flex-grow">
                  {step.body}
                </p>
              </div>

              {/* Arrow connector (hidden on last) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-surface-container-lowest border-4 border-on-background p-1">
                  <ArrowRight className="w-4 h-4 text-on-background" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
