import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Paintbrush, Video, Clapperboard } from "lucide-react";

export default function Services() {
  // Array representing the visual order of cards from back to front.
  // The values are the IDs of the service objects.
  const [order, setOrder] = useState([0, 1, 2, 3]);

  // Shuffle every 3 seconds: take the back card (index 0) and move it to the front.
  useEffect(() => {
    const timer = setInterval(() => {
      setOrder(prev => {
        const next = [...prev];
        const backCard = next.shift(); // Remove the first item
        next.push(backCard!); // Add it to the end
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      id: 0,
      title: "Animation",
      desc: "Cinematic 2D/3D animation, explainer videos, and motion design that bring ideas to life with clarity and emotion.",
      icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-on-primary" />,
      color: "bg-primary",
      textColor: "text-primary",
      shadowColor: "var(--color-primary-dim)"
    },
    {
      id: 1,
      title: "Interior Viz",
      desc: "Photorealistic renders, walkthroughs, and immersive visualizations for architecture and interiors.",
      icon: <Paintbrush className="w-8 h-8 md:w-10 md:h-10 text-on-tertiary-container" />,
      color: "bg-tertiary-container",
      textColor: "text-tertiary",
      shadowColor: "var(--color-tertiary-fixed-dim)"
    },
    {
      id: 2,
      title: "Film Production",
      desc: "Short films, branded content, and story-driven video production with a focus on cinematic storytelling.",
      icon: <Video className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      color: "bg-error",
      textColor: "text-error",
      shadowColor: "var(--color-error-dim)"
    },
    {
      id: 3,
      title: "Video Editing",
      desc: "Sharp edits, polished pacing, sound sync, and finishing touches for reels, campaigns, promos, and branded films.",
      icon: <Clapperboard className="w-8 h-8 md:w-10 md:h-10 text-on-secondary-container" />,
      color: "bg-secondary-container",
      textColor: "text-secondary",
      shadowColor: "var(--color-secondary-fixed-dim)"
    }
  ];

  // Define the physical slots the cards move between
  const slots = [
    { x: 72, y: -72, rotate: 10, zIndex: 10, scale: 0.86 },
    { x: 48, y: -48, rotate: 7, zIndex: 15, scale: 0.9 },
    { x: 24, y: -24, rotate: 4, zIndex: 20, scale: 0.95 },
    { x: 0, y: 0, rotate: 0, zIndex: 30, scale: 1 }
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-8 bg-surface overflow-hidden relative">
      {/* Background Comic Rays Effect */}
      <div className="absolute inset-0 z-0 opacity-10" style={{ 
        background: `repeating-conic-gradient(var(--color-on-background) 0 15deg, transparent 15deg 30deg)` 
      }}></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16 md:mb-24"
        >
          <h2 className="font-pixel text-4xl md:text-5xl lg:text-6xl text-center uppercase relative inline-block px-8 py-4 bg-tertiary-container text-on-tertiary-container border-8 border-on-background shadow-[12px_12px_0_var(--color-on-background)] origin-center">
            OUR SERVICES
            <span className="absolute -top-8 -right-8 text-lg md:text-xl bg-error text-white p-2 border-4 border-on-background rotate-15">
              SHUFFLE!
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Column: The Character */}
          <div className="w-full lg:w-5/12 flex justify-center relative min-h-105 sm:min-h-125 md:min-h-140">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", damping: 15, delay: 0.1 }}
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
            >
              <img
                src="/assets/character.webp"
                alt="3D Character"
                className="w-full h-full object-contain scale-[1.6] sm:scale-[2] lg:scale-[2.5] z-10 drop-shadow-[10px_10px_0_var(--color-on-background)] origin-center"
              />
            </motion.div>
          </div>

          {/* Right Column: Card Deck Shuffle */}
          <div className="w-full lg:w-7/12 relative h-112.5 md:h-125 flex justify-center items-center mt-20 lg:mt-0 perspective-distant">
            {services.map((service) => {
              // Find which slot this service currently occupies in the stack.
              const slotIndex = order.indexOf(service.id);
              const currentSlot = slots[slotIndex];

              return (
                <motion.div 
                  key={service.id}
                  animate={{
                    x: currentSlot.x,
                    y: currentSlot.y,
                    rotate: currentSlot.rotate,
                    scale: currentSlot.scale,
                    zIndex: currentSlot.zIndex
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 150, 
                    damping: 20, 
                    mass: 1 
                  }}
                  className="absolute bg-surface-container-lowest p-6 md:p-8 border-8 border-on-background rounded-3xl w-75 sm:w-87.5 md:w-100 cursor-pointer halftone"
                  style={{
                    boxShadow: `12px 12px 0 0 ${service.shadowColor}`
                  }}
                >
                  <div className="flex flex-col h-full bg-surface-container-lowest border-4 border-on-background p-6">
                    <div className={`${service.color} p-4 rounded-full border-4 border-on-background self-start mb-6 -rotate-12 group-hover:rotate-12 transition-transform shadow-[4px_4px_0_var(--color-on-background)] text-white`}>
                      {service.icon}
                    </div>
                    <h3 className={`font-headline font-black text-2xl md:text-3xl uppercase mb-3 ${service.textColor}`}>
                      {service.title}
                    </h3>
                    <p className="font-pixel text-[0.65rem] sm:text-[0.7rem] leading-loose text-on-surface-variant">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
