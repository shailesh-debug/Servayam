import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Zap } from "lucide-react";

const faqs = [
  {
    q: "What is your typical project turnaround?",
    a: "It depends on scope. A 3D product video or short-form animation typically takes 2 to 3 weeks from approved concept to final delivery. Larger projects like brand films or full interior visualization walkthroughs run 4 to 6 weeks. We give you a clear timeline before production starts and stick to it.",
    accent: "bg-primary text-on-primary",
    shadow: "var(--color-primary-dim)",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes, always. We are India-based but we work with brands, agencies, and creators worldwide. Time zone differences are not a problem. We align on async communication and structured check-ins so nothing falls through the gaps regardless of where you are.",
    accent: "bg-tertiary-container text-on-tertiary-container",
    shadow: "var(--color-tertiary-fixed-dim)",
  },
  {
    q: "How many revisions do I get?",
    a: "We build revisions into every project stage. Concept gets two rounds, production gets two rounds, and final delivery gets one. In practice, most projects land cleanly because we align on direction early. We are not here to nickel-and-dime revisions.",
    accent: "bg-error text-on-error",
    shadow: "var(--color-error-dim)",
  },
  {
    q: "What file formats do you deliver?",
    a: "Whatever you need. MP4, MOV, ProRes 4444, transparent background (Alpha channel), platform-specific cuts (9:16 for Reels and Shorts, 16:9 for YouTube and broadcast, 1:1 for social). Just tell us where the content is going and we will package it correctly.",
    accent: "bg-secondary-container text-on-secondary-container",
    shadow: "var(--color-secondary-dim)",
  },
  {
    q: "Do you handle scripting and creative direction too?",
    a: "Yes. We can take a brief from scratch and build the full creative package including script, storyboard, style direction, animation, and post. Most of our best work starts with just a goal, not a finished brief. If you have creative assets or references, great. If not, we will build the vision with you.",
    accent: "bg-primary text-on-primary",
    shadow: "var(--color-primary-dim)",
  },
  {
    q: "Can I see more portfolio work before we talk?",
    a: "Of course. Our Giggle Filmz channel has over 1 million views of live 3D animation work you can watch right now. Beyond that, we share a tailored portfolio reel during our first conversation based on your specific project type. Reach out and we will put it together for you.",
    accent: "bg-tertiary-container text-on-tertiary-container",
    shadow: "var(--color-tertiary-fixed-dim)",
  },
  {
    q: "What is the minimum project size you take on?",
    a: "We work with projects of all sizes — from a single product video for an early-stage startup to multi-episode animation series for large brands. We do not have a hard minimum. If the project is a good fit creatively and the timeline works, we are in.",
    accent: "bg-error text-on-error",
    shadow: "var(--color-error-dim)",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-32 px-8 bg-surface overflow-hidden relative"
    >
      {/* Comic rays bg */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          background: `repeating-conic-gradient(var(--color-on-background) 0 10deg, transparent 10deg 20deg)`,
        }}
      />

      <div className="container mx-auto relative z-10 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          className="mb-14 md:mb-16 flex justify-center"
        >
          <div className="relative inline-block">
            <h2 className="font-pixel text-3xl md:text-5xl uppercase tracking-widest text-on-background px-8 py-4 border-8 border-on-background bg-surface-container-lowest ink-offset-secondary leading-snug text-center">
              GOT QUESTIONS?
            </h2>
            <Zap className="absolute -top-7 -right-7 w-14 h-14 text-primary fill-tertiary-container origin-bottom rotate-12" />
          </div>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", damping: 16, stiffness: 90, delay: idx * 0.05 }}
                className="border-4 border-on-background bg-surface-container-lowest"
                style={{
                  boxShadow: isOpen
                    ? `8px 8px 0px 0px ${faq.shadow}`
                    : "4px 4px 0px 0px var(--color-outline-variant)",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className={`${faq.accent} font-pixel text-[0.55rem] px-2 py-1.5 border-2 border-on-background uppercase shrink-0`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-headline font-black text-base md:text-xl uppercase text-on-background group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div className={`${faq.accent} border-2 border-on-background p-1.5 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-0" : ""}`}>
                    {isOpen
                      ? <Minus className="w-4 h-4" />
                      : <Plus className="w-4 h-4" />
                    }
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed px-5 md:px-6 pb-6 border-t-2 border-dashed border-outline-variant pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-pixel text-[0.6rem] text-on-surface-variant mt-10 leading-loose uppercase"
        >
          Still got a question? Just hit Hire Us and ask us directly.
        </motion.p>
      </div>
    </section>
  );
}
