import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface KineticVaultProps {
  onExploreProjects?: () => void;
  onCategoryClick?: (categoryId: string) => void;
}

const projects = [
  {
    title: "Neon Drift",
    category: "3D Character / 2024",
    categoryId: "3d-models",
    image: "/assets/Mage 2K persp Half 2_4k.webp",
    alt: "Neon Drift 3D character design by Servayam Animation Studio",
    color: "bg-primary/20",
    rotate: "-rotate-2"
  },
  {
    title: "Ves Book",
    category: "Interior Design / 2024",
    categoryId: "interior",
    image: "/assets/Scene 10.webp",
    alt: "Ves Book interior 3D visualization by Servayam",
    featured: true,
    color: "bg-error/20",
    rotate: "rotate-0"
  },
  {
    title: "Cyber Shell",
    category: "3D Models / 2024",
    categoryId: "3d-models",
    image: "/assets/CP_Close2.webp",
    alt: "Cyber Shell 3D model render by Servayam Animation Studio Lucknow",
    color: "bg-secondary/20",
    rotate: "rotate-2"
  }
];

export default function KineticVault({ onExploreProjects, onCategoryClick }: KineticVaultProps) {
  return (
    <section id="portfolio" className="py-24 px-8 bg-on-background text-surface">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-4">The Kinetic Vault</h2>
            <p className="text-surface/80 text-xl uppercase tracking-widest font-bold">Latest Animation Cycles</p>
          </div>
          <motion.button 
            onClick={onExploreProjects}
            whileHover={{ x: 10 }}
            className="text-surface hover:text-primary-fixed font-headline font-black uppercase flex items-center gap-2 text-xl transition-all bg-transparent border-none cursor-pointer"
          >
            Explore All Projects <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-8 border-surface bg-surface"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => onCategoryClick?.(project.categoryId)}
              className={`group relative overflow-hidden border-4 border-on-background aspect-4/5 bg-surface-container cursor-pointer ${project.featured ? 'lg:scale-105 z-10 ink-offset-primary' : ''}`}
            >
              <img
                className={`w-full h-full object-cover transition-all duration-500 ${project.featured ? '' : 'grayscale group-hover:grayscale-0'} group-hover:scale-105`}
                src={project.image}
                alt={project.alt || project.title}
              />

              {project.featured && (
                <div className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 border-2 border-on-background font-headline font-black uppercase text-sm italic">
                  Featured
                </div>
              )}

              <div className={`absolute inset-0 ${project.color} opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8`}>
                <div className={`bg-surface text-on-background p-4 border-4 border-on-background ${project.rotate}`}>
                  <h3 className="font-headline font-black text-2xl uppercase">{project.title}</h3>
                  <p className="font-body font-medium">{project.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
