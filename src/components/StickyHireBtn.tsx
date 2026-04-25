import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, X } from "lucide-react";

interface StickyHireBtnProps {
  onHireUs: () => void;
}

export default function StickyHireBtn({ onHireUs }: StickyHireBtnProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-6 z-[90] flex items-center gap-2"
        >
          {/* Main CTA */}
          <motion.button
            onClick={onHireUs}
            whileHover={{
              x: -4,
              y: -4,
              boxShadow: "12px 12px 0px 0px var(--color-on-background)",
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-3 border-4 border-on-background font-headline font-black uppercase text-base tracking-tight shadow-[6px_6px_0px_0px_var(--color-on-background)] transition-shadow"
          >
            <Zap className="w-5 h-5 fill-tertiary-container" />
            Hire Us
          </motion.button>

          {/* Dismiss button */}
          <motion.button
            onClick={() => setDismissed(true)}
            whileHover={{ rotate: 90 }}
            className="bg-surface-container-lowest border-4 border-on-background p-1.5 shadow-[4px_4px_0px_0px_var(--color-on-background)] text-on-background"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
