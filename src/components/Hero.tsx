import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bolt, X } from "lucide-react";
const showreelVideo = "/video_compressed.mp4";

interface HeroProps {
  onHireUs: () => void;
}

export default function Hero({ onHireUs }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const openShowreel = () => {
    setIsShowreelOpen(true);
  };

  const closeShowreel = () => {
    setIsShowreelOpen(false);
  };
  
  // High quality varied images for the slideshow
  const images = [
    "/assets/Mage 2K persp Half 2_4k.jpg",
    "/assets/Scene 10.png",
    "/assets/CP_Back.jpg",
    "/assets/A (3).png",
    "/assets/CP_Close2.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeShowreel();
      }
    };

    if (isShowreelOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isShowreelOpen]);

  return (
    <header className="relative min-h-[75vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-surface py-10 sm:py-16 md:py-20 px-5 sm:px-8">
      {/* Halftone texture background */}
      <div className="absolute inset-0 halftone opacity-10 text-on-background pointer-events-none"></div>
      
      {/* We use highly asymmetrical widths to shift text left and emphasize the image */}
      <div className="w-full max-w-400 mx-auto relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-stretch">
        
        {/* Left Column Text Content - Constrained width to shift left */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="order-2 lg:order-1 w-full lg:w-4/12 xl:w-1/3 flex flex-col items-start justify-center"
        >
          <motion.div 
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: -2, opacity: 1 }}
            whileHover={{ scale: 1.1, rotateX: 10, rotateY: 10 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-tertiary-container text-on-tertiary-container px-4 py-1 font-pixel text-xs tracking-widest uppercase mb-6 border-2 border-on-background ink-offset-black cursor-default"
            style={{ perspective: 1000 }}
          >
            Now Live
          </motion.div>
          
          {/* Text shrunk slightly so it fits in the narrower 1/3 column gracefully */}
          <h1 className="font-headline font-black text-5xl md:text-7xl lg:text-[5rem] xl:text-[6rem] tracking-tighter uppercase leading-[0.9] mb-8 relative">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              WE BRING
            </motion.span> <br />
            <span className="text-primary italic">STORY</span> <br />
            <span className="relative inline-block">
              TO LIFE
              <motion.span 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [12, 15, 12]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute -top-4 -right-12 md:-right-16 bg-error text-white text-xl md:text-3xl px-3 py-1 border-4 border-on-background comic-burst flex items-center justify-center font-black"
              >
                POW!
              </motion.span>
            </span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed font-medium"
          >
            <span className="font-pixel text-[0.7rem] block mb-4 text-primary overflow-hidden whitespace-nowrap w-full">
              <motion.span
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="inline-block"
                style={{ width: "200%" }}
              >
                INSERT COIN TO CONTINUE...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;INSERT COIN TO CONTINUE...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </motion.span>
            </span>
            Servayam is a high-octane animation studio crafting kinetic experiences for brands that refuse to blend in. We don't just animate; we ignite.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <motion.button 
              initial={{ rotateX: 0, rotateY: 0 }}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 20, boxShadow: "10px 10px 0px 0px var(--color-on-background)" }}
              whileTap={{ scale: 0.95 }}
              onClick={openShowreel}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              className="bg-primary text-on-primary text-sm font-pixel tracking-tighter uppercase px-6 py-4 border-4 border-on-background ink-offset-black transition-all text-center"
            >
              Showreel
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Massive 16:9 Image Slideshow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 80, delay: 0.4 }}
          className="order-1 lg:order-2 w-full lg:w-8/12 xl:w-2/3 relative mt-2 sm:mt-4 lg:mt-0 flex justify-end items-center"
        >
          {/* We remove max-w constraints so the frame expands massively to fill the 2/3 column */}
          <div className="relative w-full border-8 md:border-12 lg:border-16 border-on-background bg-surface-container-lowest p-3 md:p-5 shadow-[8px_8px_0_var(--color-on-background)] md:shadow-[14px_14px_0_var(--color-on-background)] hover:shadow-[10px_10px_0_var(--color-on-background)] md:hover:shadow-[20px_20px_0_var(--color-on-background)] transition-shadow duration-500 origin-center rotate-1">
            
            {/* Aspect Video (16:9 Layout) */}
            <div className="relative w-full aspect-video overflow-hidden border-4 border-on-background bg-inverse-on-surface/20">
              <AnimatePresence>
                <motion.img 
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 1.04, filter: "brightness(1.2) contrast(1.15)" }}
                  animate={{ opacity: 1, scale: 1, filter: "brightness(1) contrast(1.1)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "brightness(0.9) contrast(1.05)" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]" 
                  src={images[currentIdx]}
                  alt={`Showcase ${currentIdx + 1}`}
                  loading="eager"
                  decoding="async"
                />
              </AnimatePresence>
            </div>

            {/* Comic Bolt Accent */}
            <motion.div 
              animate={{ 
                rotate: [-6, -10, -6],
                y: [0, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-secondary-container p-3 sm:p-5 md:p-8 border-3 sm:border-4 border-on-background shadow-[5px_5px_0_var(--color-on-background)] sm:shadow-[8px_8px_0_var(--color-on-background)] z-20"
            >
              <Bolt className="w-7 h-7 sm:w-10 sm:h-10 md:w-16 md:h-16 text-on-secondary-container fill-current" />
            </motion.div>

          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isShowreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8"
            onClick={closeShowreel}
          >
            <div className="absolute inset-0 halftone opacity-10 text-on-background bg-background/90 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.92, y: 24, rotate: -1 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.92, y: 24, rotate: 1 }}
              transition={{ type: "spring", damping: 18, stiffness: 180 }}
              className="relative z-10 w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative border-10 md:border-12 border-on-background bg-surface-container-lowest p-3 md:p-5 shadow-[16px_16px_0_var(--color-on-background)] rotate-1">
                <button
                  type="button"
                  onClick={closeShowreel}
                  className="absolute -top-5 -right-5 z-20 bg-error text-white p-2 border-4 border-on-background shadow-[4px_4px_0_var(--color-on-background)] hover:rotate-90 transition-transform"
                  aria-label="Close showreel"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-pixel text-[0.6rem] uppercase tracking-widest text-primary mb-1">
                      Now Playing
                    </p>
                    <h2 className="font-headline font-black text-2xl md:text-4xl uppercase tracking-tighter text-on-background">
                      Animation Showreel
                    </h2>
                  </div>
                </div>

                <div className="relative aspect-video overflow-hidden border-3 border-on-background bg-inverse-on-surface/20">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={showreelVideo}
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
