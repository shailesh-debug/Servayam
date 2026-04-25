import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  onHireUs: () => void;
}

const navLinks = [
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Services", href: "/services/" },
  { label: "Originals", href: "/originals/" },
  { label: "Why Us", href: "/about/" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar({ isDark, toggleTheme, onHireUs }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,100,121,1)]">
        <div className="flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <a
            href="/"
            onClick={closeMenu}
            className="text-2xl md:text-3xl font-black text-on-background italic tracking-tighter uppercase font-headline hover:text-primary transition-colors shrink-0"
            aria-label="Servayam home"
          >
            Servayam
          </a>

          {/* Desktop nav links — only at lg+ */}
          <div className="hidden lg:flex gap-6 items-center">
            {navLinks.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ skewX: 2 }}
                className="font-headline font-bold uppercase tracking-tighter whitespace-nowrap text-on-background hover:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 border-4 border-on-background bg-surface-container text-on-background transition-all"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Hire Us — always visible */}
            <motion.button
              whileHover={{ skewX: 2 }}
              whileTap={{ y: 4 }}
              onClick={onHireUs}
              className="bg-primary text-on-primary px-4 py-2 border-b-4 border-r-4 border-on-background font-headline font-bold uppercase transition-all duration-100 text-sm whitespace-nowrap"
            >
              Hire Us
            </motion.button>

            {/* Hamburger — hidden on lg+ */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="lg:hidden p-2 border-4 border-on-background bg-surface-container text-on-background"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile / Tablet dropdown menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t-4 border-on-background bg-background"
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={closeMenu}
                    className="font-headline font-black text-xl uppercase tracking-tighter text-on-background hover:text-primary transition-colors py-3 border-b-2 border-on-background/20 last:border-b-0"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
