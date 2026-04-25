import { motion } from "motion/react";
import { Zap } from "lucide-react";

const teamMembers = [
  {
    name: "Shailesh Kumar",
    role: "Founder & Vision Lead",
    desc: "Drives overall vision, content strategy, and creative direction. Oversees production, storytelling, and innovation across AI, animation, and branding.",
    color: "bg-primary text-on-primary",
    popText: "VISION!"
  },
  {
    name: "Divyansh Pathak",
    role: "Lead Animator",
    desc: "Leads the animation pipeline and visual storytelling. Responsible for creating high-quality character animations and directing motion style.",
    color: "bg-error text-on-error",
    popText: "KINETIC!"
  },
  {
    name: "Satyendra Singh",
    role: "Lead AI & Visual Eng.",
    desc: "Handles AI integration, rendering workflows, and technical innovation. Builds pipelines using UE, VEO, and generative AI.",
    color: "bg-tertiary-container text-on-tertiary-container",
    popText: "SYNTH!"
  },
  {
    name: "Lakshya Verma",
    role: "Animator",
    desc: "Supports animation production by creating character movements, scenes, and assets. Executes creative concepts efficiently.",
    color: "bg-secondary-container text-on-secondary-container",
    popText: "MOTION!"
  },
  {
    name: "Vishwas Gupta",
    role: "Marketing Strategist",
    desc: "Manages content distribution, growth strategy, and audience engagement. Focuses on scaling reach through YouTube and social media.",
    color: "bg-primary-fixed-dim text-on-primary-fixed-variant",
    popText: "HYPE!"
  },
  {
    name: "Aditi",
    role: "Video Editor",
    desc: "Edits and assembles final content, cuts, sound design, pacing, and effects. Ensures visuals are engaging and platform-ready.",
    color: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    popText: "CUT!"
  },
  {
    name: "Ankit Kumar",
    role: "Lead Web Developer",
    desc: "Designed and developed the core website architecture, structural layout, data prep, and smooth cohesive motion design.",
    color: "bg-error-container text-on-error-container",
    popText: "CODE!"
  },
  {
    name: "Mihir Dutta",
    role: "Developer and AI integration",
    desc: "Develops the web interface alongside integrating AI models to deliver seamless, innovative user experiences.",
    color: "bg-surface-container-highest text-on-surface-variant",
    popText: "DEV-AI!"
  }
];

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotate: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <section id="team" className="py-24 px-8 bg-surface-container overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, rotate: -2, scale: 0.9 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 relative inline-block"
        >
          <h2 className="font-pixel text-4xl md:text-5xl uppercase tracking-widest text-on-background relative z-10 p-4 border-8 border-on-background bg-surface-container-lowest ink-offset-secondary leading-snug">
            THE SQUAD
          </h2>
          <Zap className="absolute -top-6 -right-6 w-16 h-16 text-primary fill-tertiary-container origin-bottom rotate-12" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={idx}
              variants={{
                rest: { x: 0, y: 0, rotate: 0, boxShadow: "8px 8px 0px 0px var(--color-on-background)" },
                hover: { x: -16, y: -16, rotate: -2, boxShadow: "24px 24px 0px 0px var(--color-on-background)", transition: { type: "spring", stiffness: 300, damping: 20 } }
              }}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className={`group relative p-6 border-4 border-on-background halftone transition-colors ${member.color}`}
              style={{ perspective: 1000 }}
            >
              {/* Comic burst span that scales up on hover */}
              <motion.span 
                variants={{
                  rest: { scale: 0, opacity: 0, rotate: -45 },
                  hover: { scale: 1, opacity: 1, rotate: 10, transition: { type: "spring", stiffness: 300 } }
                }}
                className="absolute -top-6 -right-6 bg-tertiary text-on-tertiary text-xs p-3 font-pixel border-4 border-on-background z-20 comic-burst shadow-lg uppercase"
              >
                {member.popText}
              </motion.span>
              
              <div className="relative z-10 flex flex-col h-full bg-surface-container-lowest text-on-background p-4 border-4 border-on-background shadow-inner">
                <h3 className="font-headline font-black text-2xl uppercase mb-1">{member.name}</h3>
                <h4 className="font-pixel text-[0.6rem] text-primary mb-4 leading-loose">{member.role}</h4>
                <p className="text-on-surface-variant font-medium text-sm leading-relaxed mt-auto border-t-2 border-dashed border-outline-variant pt-4">
                  {member.desc}
                </p>
              </div>

              {/* Removed the secondary backdrop shift to keep it clean with the main card shadow depth */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
