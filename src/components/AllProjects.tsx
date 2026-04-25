import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface ProjectCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  textColor: string;
  projects: {
    id: number;
    title: string;
    image?: string;
    link?: string;
    placeholder: string;
  }[];
}

const projectCategories: ProjectCategory[] = [
  {
    id: "interior",
    title: "Interior",
    description: "Stunning interior design animations bringing spaces to life",
    color: "bg-primary/10",
    borderColor: "border-primary",
    textColor: "text-primary",
    projects: [
      { id: 1, title: "Modern Loft", image: "/assets/A (1).png", placeholder: "Interior Design - 2024" },
      { id: 2, title: "Luxury Residence", image: "/assets/GF View (18).png", placeholder: "Interior Design - 2024" },
      { id: 3, title: "Minimalist Studio", image: "/assets/A (9).png",placeholder: "Interior Design - 2024" },
      { id: 4, title: "Industrial Space",image: "/assets/Scene 10.png", placeholder: "Interior Design - 2024" },
    ]
  },
  {
    id: "exterior",
    title: "Exterior",
    description: "Dynamic exterior visualization and architectural animations",
    color: "bg-secondary/10",
    borderColor: "border-secondary",
    textColor: "text-secondary",
    projects: [
      { id: 1, title: "Urban Facade", image: "/assets/Open Area  (11).png", placeholder: "Exterior Design - 2024" },
      { id: 2, title: "Landscape Flow", image: "/assets/View (19).png",placeholder: "Exterior Design - 2024" },
      { id: 3, title: "Architectural Marvel",image: "/assets/A (3).png",placeholder: "Exterior Design - 2024" },
      { id: 4, title: "Scenic Route", image: "/assets/Open Area  (11).png", placeholder: "Exterior Design - 2024" },
    ]
  },
  {
    id: "3d-models",
    title: "3D Models",
    description: "High-quality 3D character and object modeling",
    color: "bg-tertiary/10",
    borderColor: "border-tertiary",
    textColor: "text-tertiary",
    projects: [
      { id: 1, title: "Character Design A",image:"/assets/Mage 2K persp Half 2_4k.jpg", placeholder: "3D Modeling - 2024" },
      { id: 2, title: "Character Design B",  image: "/assets/CP_Back.jpg",placeholder: "3D Modeling - 2024" },
      { id: 3, title: "Environment Model",  image: "/assets/CP_Close2.jpg",placeholder: "3D Modeling - 2024" },
      { id: 4, title: "Prop Collection",  image: "/assets/AR15_4.jpg",placeholder: "3D Modeling - 2024" },
    ]
  },
  {
    id: "originals",
    title: "Originals",
    description: "Our in-house IP — Giggle Filmz (YouTube Shorts) and Giggle Explains (long-form geopolitics)",
    color: "bg-error/10",
    borderColor: "border-error",
    textColor: "text-error",
    projects: [
      { id: 1, title: "Giggle Filmz", link: "https://www.youtube.com/@GiggleFilmz/shorts", placeholder: "YouTube Shorts · 3D Animation" },
      { id: 2, title: "Giggle Explains", link: "https://www.youtube.com/@GiggleFilmz", placeholder: "Long-form · Geopolitics ELI5" },
    ]
  }
];

interface AllProjectsProps {
  onBack: () => void;
  selectedCategory?: string;
}

export default function AllProjects({ onBack, selectedCategory }: AllProjectsProps) {
  const categoriesToDisplay = selectedCategory 
    ? projectCategories.filter(cat => cat.id === selectedCategory)
    : projectCategories;
  return (
    <div className="min-h-screen bg-surface py-12 px-8">
      {/* Halftone texture background */}
      <div className="absolute inset-0 halftone opacity-10 text-on-background pointer-events-none"></div>

      <div className="relative z-10 max-w-400 mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center gap-4"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary text-on-primary font-pixel text-xs tracking-tighter uppercase px-4 py-3 border-4 border-on-background ink-offset-black hover:shadow-[8px_8px_0_var(--color-on-background)] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>

          <div>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter"
            >
              All Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-on-surface-variant text-lg font-medium mt-2"
            >
              Explore our complete portfolio across all categories
            </motion.p>
          </div>
        </motion.div>

        {/* Project Categories */}
        {categoriesToDisplay.map((category, categoryIdx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIdx * 0.1 }}
            className="mb-20"
          >
            {/* Category Header */}
            <div className={`mb-8 p-6 border-6 ${category.borderColor} bg-surface-container border-on-background ink-offset-black`}>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3"
              >
                <div className={`w-6 h-6 border-4 border-on-background ${category.textColor}`}></div>
                <div>
                  <h2 className={`font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter ${category.textColor}`}>
                    {category.title}
                  </h2>
                  <p className="text-on-surface-variant font-medium text-lg mt-2">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Projects Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${category.color} p-6 border-6 border-on-background`}>
              {category.projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.05, y: -8, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group cursor-pointer"
                  {...(project.link ? { as: "a", href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={project.link ? () => window.open(project.link, "_blank", "noopener,noreferrer") : undefined}
                >
                  <div className={`relative aspect-square overflow-hidden border-6 border-on-background bg-surface-container shadow-[8px_8px_0_var(--color-on-background)] hover:shadow-[12px_12px_0_var(--color-on-background)] transition-all duration-300`}>
                    {/* Image or Placeholder Container */}
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-surface via-surface-dim to-surface-container overflow-hidden relative">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          {/* Animated placeholder pattern */}
                          <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <defs>
                                <pattern id={`pattern-${category.id}-${project.id}`} patternUnits="userSpaceOnUse" width="20" height="20">
                                  <circle cx="10" cy="10" r="3" fill="currentColor" />
                                </pattern>
                              </defs>
                              <rect width="100" height="100" fill={`url(#pattern-${category.id}-${project.id})`} />
                            </svg>
                          </motion.div>

                          {/* Content Overlay */}
                          <div className="relative z-10 text-center px-4">
                            <div className={`w-16 h-16 mx-auto mb-4 border-4 border-on-background flex items-center justify-center ${category.color} bg-surface`}>
                              <div className="text-2xl font-black">{project.link ? "▶" : "📹"}</div>
                            </div>
                            <p className="font-headline font-black text-xl uppercase text-on-background mb-1">
                              {project.title}
                            </p>
                            <p className="font-pixel text-xs uppercase tracking-widest text-on-surface-variant">
                              {project.link ? "Watch on YouTube" : "Click to add image"}
                            </p>
                          </div>

                          {/* Hover Overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-on-background/10 flex items-center justify-center backdrop-blur-sm"
                          >
                            <div className={`px-4 py-2 border-4 border-on-background bg-surface ${category.textColor} font-headline font-black uppercase text-sm italic`}>
                              {project.link ? "Open Channel" : "Add Image"}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Project Info Card */}
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex flex-col justify-end p-4 bg-linear-to-t from-on-background via-on-background/60 to-transparent"
                    >
                      <div className={`bg-surface text-on-background p-3 border-3 border-on-background`}>
                        <h3 className="font-headline font-black text-lg uppercase mb-1">
                          {project.title}
                        </h3>
                        <p className="font-body text-sm">
                          {project.placeholder}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block border-8 border-on-background bg-primary/20 p-8 shadow-[16px_16px_0_var(--color-on-background)]">
            <p className="font-pixel text-sm uppercase tracking-widest text-on-background mb-4">
              Ready to bring your vision to life?
            </p>
            <h3 className="font-headline font-black text-3xl uppercase mb-6 text-on-background">
              Let's Create Something Extraordinary
            </h3>
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, boxShadow: "12px 12px 0px 0px var(--color-on-background)" }}
              whileTap={{ scale: 0.95 }}
              style={{ perspective: 1000 }}
              className="bg-secondary text-on-secondary font-pixel text-sm tracking-tighter uppercase px-8 py-4 border-4 border-on-background ink-offset-black transition-all hover:shadow-[12px_12px_0_var(--color-on-background)]"
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
