import type { SimpleIcon } from "simple-icons";
import {
  siAutodesk,
  siAutodeskmaya,
  siSketchup,
  siUnrealengine
} from "simple-icons";

type Tool = {
  name: string;
  icon?: SimpleIcon;
  badge: string;
  badgeClassName: string;
  iconBadgeClassName?: string;
  iconColor?: string;
};

function LogoBadge({ tool }: { tool: Tool }) {
  if (tool.icon) {
    return (
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-on-background shadow-[4px_4px_0_var(--color-on-background)] ${tool.iconBadgeClassName ?? "bg-surface"}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill={tool.iconColor ?? `#${tool.icon.hex}`}
        >
          <path d={tool.icon.path} />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-on-background font-headline font-black text-base shadow-[4px_4px_0_var(--color-on-background)] ${tool.badgeClassName}`}
      aria-hidden="true"
    >
      {tool.badge}
    </div>
  );
}

export default function Partners() {
  const tools: Tool[] = [
    { name: "Maya", icon: siAutodeskmaya, badge: "MY", badgeClassName: "bg-[#37A5CC] text-surface" },
    { name: "Unreal Engine", icon: siUnrealengine, badge: "UE", badgeClassName: "bg-on-background text-surface", iconBadgeClassName: "bg-white", iconColor: "#111111" },
    { name: "After Effects", badge: "Ae", badgeClassName: "bg-[#1F003F] text-[#D7B3FF]" },
    { name: "Premiere Pro", badge: "Pr", badgeClassName: "bg-[#00005B] text-[#CFA9FF]" },
    { name: "Photoshop", badge: "Ps", badgeClassName: "bg-[#001E36] text-[#31A8FF]" },
    { name: "D5 Render", badge: "D5", badgeClassName: "bg-[#121212] text-white" },
    { name: "SketchUp", icon: siSketchup, badge: "SU", badgeClassName: "bg-[#005F9E] text-surface" },
    { name: "3ds Max", icon: siAutodesk, badge: "3M", badgeClassName: "bg-[#0F766E] text-surface", iconBadgeClassName: "bg-white", iconColor: "#111111" }
  ];
  
  return (
    <section className="py-24 px-8 bg-surface">
      <div className="container mx-auto">
        <div className="bg-primary-container p-5 sm:p-8 lg:p-12 border-8 border-on-background ink-offset-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 halftone opacity-20 text-on-primary-container pointer-events-none -mr-32 -mt-32"></div>
          <h2 className="font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter mb-12 flex items-center gap-4">
            <span className="bg-on-primary-container text-surface px-4 py-1 -skew-x-6">OUR</span> TOOLKIT
          </h2>
          <p className="max-w-3xl font-pixel text-xs sm:text-sm leading-loose text-on-primary-container mb-10">
            We build with industry-standard software across animation, visualization, post-production, and cinematic storytelling.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div 
                key={tool.name}
                className="min-h-28 bg-white/60 backdrop-blur border-4 border-on-background flex flex-col items-center justify-center gap-4 p-5 text-center transition-all hover:-translate-y-1 hover:bg-white cursor-pointer"
              >
                <LogoBadge tool={tool} />
                <span className="font-headline font-black text-lg md:text-xl leading-tight text-on-background">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
