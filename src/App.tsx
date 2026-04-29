/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import KineticVault from "./components/KineticVault";
import AllProjects from "./components/AllProjects";
import Partners from "./components/Partners";
import Team from "./components/Team";
import Services from "./components/Services";
import HowWeWork from "./components/HowWeWork";
import WhyUs from "./components/WhyUs";
import Originals from "./components/Originals";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import ContactModal from "./components/ContactModal";
import StickyHireBtn from "./components/StickyHireBtn";

const projectCategories = [
  {
    id: "interior",
    title: "Interior",
    description: "Spatial storytelling, interiors, and cinematic walk-throughs.",
    accent: "bg-primary text-on-primary",
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Architectural exteriors, worldbuilding, and environment reveals.",
    accent: "bg-secondary-container text-on-secondary-container",
  },
  {
    id: "3d-models",
    title: "3D Models",
    description: "Characters, props, and polished modeling showcases.",
    accent: "bg-tertiary-container text-on-tertiary-container",
  },
  {
    id: "originals",
    title: "Originals",
    description: "Our in-house IP — Giggle Filmz shorts and Giggle Explains long-form content.",
    accent: "bg-error text-on-error",
  },
] as const;

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
}

interface RouteSchemaMeta {
  src: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Servayam | 3D Animation Studio in India",
    description:
      "Servayam is a 3D animation studio for brands, architecture, interiors, and original content. Explore cinematic animation, visualization, and modeling work.",
    canonical: "https://servayam.com/",
  },
  "/services": {
    title: "Animation and 3D Creative Services | Servayam",
    description:
      "Servayam creates 3D animation, architectural visualization, interior and exterior animations, character models, and animated brand content.",
    canonical: "https://servayam.com/services/",
  },
  "/portfolio": {
    title: "Animation Portfolio | Servayam",
    description:
      "Explore Servayam's animation portfolio including interior and exterior visualizations, 3D models, and original content projects.",
    canonical: "https://servayam.com/portfolio/",
  },
  "/projects/interior": {
    title: "Interior Animation Projects | Servayam",
    description:
      "Interior animation and cinematic walkthrough projects by Servayam for spaces, studios, and architectural storytelling.",
    canonical: "https://servayam.com/projects/interior/",
  },
  "/projects/exterior": {
    title: "Exterior Visualization Projects | Servayam",
    description:
      "Exterior visualization and architectural animation projects from Servayam for environment storytelling and design showcases.",
    canonical: "https://servayam.com/projects/exterior/",
  },
  "/projects/3d-models": {
    title: "3D Modeling Projects | Servayam",
    description:
      "Character, prop, and environment modeling work from Servayam's 3D creative production team.",
    canonical: "https://servayam.com/projects/3d-models/",
  },
  "/originals": {
    title: "Servayam Originals | Animated Content",
    description:
      "Watch original animated content from Servayam, including Giggle Filmz shorts and long-form educational storytelling.",
    canonical: "https://servayam.com/originals/",
  },
  "/about": {
    title: "About Servayam | 3D Animation Team",
    description:
      "Meet the Servayam team and learn why brands choose our studio for animation, cinematic storytelling, and visual production.",
    canonical: "https://servayam.com/about/",
  },
  "/contact": {
    title: "Contact Servayam | Animation Studio",
    description:
      "Contact Servayam for 3D animation, architectural visualization, and creative production enquiries.",
    canonical: "https://servayam.com/contact/",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Servayam",
    description:
      "Read the Servayam privacy policy covering data use, security, cookies, and user rights.",
    canonical: "https://servayam.com/privacy-policy/",
  },
};

const ROUTE_SCHEMA: Record<string, RouteSchemaMeta> = {
  "/": { src: "/schema/home.jsonld" },
  "/services": { src: "/schema/services.jsonld" },
  "/portfolio": { src: "/schema/portfolio.jsonld" },
  "/projects/interior": { src: "/schema/projects-interior.jsonld" },
  "/projects/exterior": { src: "/schema/projects-exterior.jsonld" },
  "/projects/3d-models": { src: "/schema/projects-3d-models.jsonld" },
  "/originals": { src: "/schema/originals.jsonld" },
  "/about": { src: "/schema/about.jsonld" },
  "/contact": { src: "/schema/contact.jsonld" },
  "/privacy-policy": { src: "/schema/privacy-policy.jsonld" },
};

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function upsertMeta(selector: string, attr: "name" | "property", value: string) {
  let tag = document.querySelector(`meta[${attr}="${selector}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, selector);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function upsertJsonLd(src: string) {
  document
    .querySelectorAll('script[type="application/ld+json"][data-route-schema="true"]')
    .forEach((node) => node.remove());

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.src = src;
  script.setAttribute("data-route-schema", "true");
  document.head.appendChild(script);
}

function RouteIntro({ title, description }: { title: string; description: string }) {
  return (
    <section className="px-8 pt-14 pb-4 bg-surface">
      <div className="max-w-5xl mx-auto border-4 border-on-background bg-surface-container-lowest p-6 sm:p-8">
        <h1 className="font-headline font-black text-3xl sm:text-5xl uppercase tracking-tighter text-on-background">
          {title}
        </h1>
        <p className="mt-4 text-on-surface-variant leading-relaxed text-base sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);

  const normalizedPath = normalizePath(location.pathname);
  const selectedCategory = normalizedPath.startsWith("/projects/")
    ? normalizedPath.replace("/projects/", "")
    : undefined;

  const isHomePage = normalizedPath === "/";
  const isProjectsPage =
    normalizedPath === "/portfolio" || normalizedPath === "/projects" || normalizedPath.startsWith("/projects/");
  const isPrivacyPage = normalizedPath === "/privacy-policy";
  const isServicesPage = normalizedPath === "/services";
  const isOriginalsPage = normalizedPath === "/originals";
  const isAboutPage = normalizedPath === "/about";
  const isContactPage = normalizedPath === "/contact";

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "originals") {
      setIsCategoryPickerOpen(false);
      navigate("/originals/");
      return;
    }
    setIsCategoryPickerOpen(false);
    navigate(`/projects/${categoryId}/`);
    window.scrollTo(0, 0);
  };

  const handleExploreProjects = () => {
    if (isHomePage) {
      setIsCategoryPickerOpen(true);
      return;
    }
    navigate("/portfolio/");
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (isContactPage) {
      setIsContactOpen(true);
    }
  }, [isContactPage]);

  useEffect(() => {
    const routeMeta =
      ROUTE_META[normalizedPath] ||
      (normalizedPath.startsWith("/projects/") ? ROUTE_META["/projects/3d-models"] : ROUTE_META["/"]);
    const routeSchema =
      ROUTE_SCHEMA[normalizedPath] ||
      (normalizedPath.startsWith("/projects/") ? ROUTE_SCHEMA["/projects/3d-models"] : ROUTE_SCHEMA["/"]);

    document.title = routeMeta.title;
    upsertMeta("description", "name", routeMeta.description);
    upsertMeta("og:title", "property", routeMeta.title);
    upsertMeta("og:description", "property", routeMeta.description);
    upsertMeta("og:url", "property", routeMeta.canonical);
    upsertMeta("twitter:title", "name", routeMeta.title);
    upsertMeta("twitter:description", "name", routeMeta.description);
    upsertJsonLd(routeSchema.src);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", routeMeta.canonical);
  }, [normalizedPath]);

  const renderHomePage = () => (
    <>
      <main className="grow">
        <Hero onHireUs={() => setIsContactOpen(true)} />
        <KineticVault onExploreProjects={handleExploreProjects} onCategoryClick={handleCategoryClick} />
        <Partners />
        <Team />
        <Services />
        <HowWeWork />
        <WhyUs />
        <Originals />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );

  const renderProjectsPage = () => (
    <>
      <main className="grow">
        <RouteIntro
          title={selectedCategory ? `${selectedCategory.replace("-", " ")} Projects` : "Servayam Animation Portfolio"}
          description="Explore our portfolio across interior animation, exterior visualization, 3D modeling, and original creative work."
        />
        <AllProjects onBack={() => navigate("/")} selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </>
  );

  const renderServicesPage = () => (
    <>
      <main className="grow">
        <RouteIntro
          title="Animation and 3D Creative Services"
          description="Servayam delivers cinematic animation, interior and exterior visualization, film production, and editing services for ambitious brands and teams."
        />
        <Services />
        <HowWeWork />
        <FAQ />
      </main>
      <Footer />
    </>
  );

  const renderOriginalsPage = () => (
    <>
      <main className="grow">
        <RouteIntro
          title="Original Animated Content"
          description="Discover Servayam Originals, including high-performing short-form animations and long-form storytelling formats built in-house."
        />
        <Originals />
        <Testimonials />
      </main>
      <Footer />
    </>
  );

  const renderAboutPage = () => (
    <>
      <main className="grow">
        <RouteIntro
          title="About Servayam"
          description="Meet the team and see why brands choose Servayam for storytelling, production quality, and measurable audience engagement."
        />
        <Team />
        <WhyUs />
        <Partners />
      </main>
      <Footer />
    </>
  );

  const renderContactPage = () => (
    <>
      <main className="grow">
        <RouteIntro
          title="Contact Servayam"
          description="Tell us what you are building and we will help shape the right animation and visual strategy for your project."
        />
        <section className="px-8 pb-16 bg-surface">
          <div className="max-w-5xl mx-auto border-4 border-on-background bg-surface-container p-6 sm:p-8">
            <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase tracking-tighter text-on-background">
              Start Your Project Conversation
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Use our contact form to share your project goals, timeline, and requirements. We typically reply within one business day.
            </p>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="mt-6 bg-primary text-on-primary text-sm font-pixel tracking-tighter uppercase px-6 py-4 border-4 border-on-background ink-offset-black transition-all"
            >
              Open Contact Form
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );

  const renderPrivacyPage = () => (
    <>
      <main className="grow">
        <PrivacyPolicy onBack={() => { navigate("/"); window.scrollTo(0, 0); }} />
      </main>
      <Footer />
    </>
  );

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
        onHireUs={() => setIsContactOpen(true)}
      />

      {isPrivacyPage
        ? renderPrivacyPage()
        : isProjectsPage
          ? renderProjectsPage()
          : isServicesPage
            ? renderServicesPage()
            : isOriginalsPage
              ? renderOriginalsPage()
              : isAboutPage
                ? renderAboutPage()
                : isContactPage
                  ? renderContactPage()
                  : renderHomePage()}
      
      <AnimatePresence>
        {isCategoryPickerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryPickerOpen(false)}
              className="absolute inset-0 bg-on-background/70 backdrop-blur-sm"
              aria-label="Close project category popup"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95, rotate: -1 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: 24, scale: 0.95, rotate: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative z-10 w-full max-w-5xl border-8 border-on-background bg-surface p-6 sm:p-8 shadow-[16px_16px_0_var(--color-on-background)]"
            >
              <button
                type="button"
                onClick={() => setIsCategoryPickerOpen(false)}
                className="absolute -top-5 -right-5 bg-error text-white p-2 border-4 border-on-background shadow-[4px_4px_0_var(--color-on-background)] hover:rotate-90 transition-transform"
                aria-label="Close project category popup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8 max-w-2xl">
                <p className="font-pixel text-[0.65rem] uppercase tracking-widest text-primary mb-3">
                  Choose a lane
                </p>
                <h2 className="font-headline font-black text-3xl sm:text-5xl uppercase tracking-tighter text-on-background">
                  Explore The Projects
                </h2>
                <p className="mt-3 text-on-surface-variant text-base sm:text-lg font-medium">
                  Pick the category you want to open and we&apos;ll take you straight into that project vault.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projectCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category.id)}
                    className="group text-left border-4 border-on-background bg-surface-container p-5 sm:p-6 shadow-[8px_8px_0_var(--color-on-background)] hover:shadow-[12px_12px_0_var(--color-on-background)] transition-all"
                  >
                    <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 border-on-background font-pixel text-[0.6rem] uppercase tracking-widest ${category.accent}`}>
                      {category.title}
                    </div>
                    <p className="mt-4 font-headline font-black text-2xl uppercase tracking-tighter text-on-background">
                      {category.title}
                    </p>
                    <p className="mt-2 text-on-surface-variant font-medium leading-relaxed">
                      {category.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2 font-headline font-black uppercase text-primary">
                      Open Projects
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <StickyHireBtn onHireUs={() => setIsContactOpen(true)} />
    </div>
  );
}
