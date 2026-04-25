export default function Footer() {
  return (
    <footer className="w-full border-t-8 border-primary bg-on-background py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-surface font-black italic text-4xl tracking-tighter uppercase font-headline">
        Servayam
      </div>
      <div className="flex flex-wrap justify-center gap-8 font-body text-sm uppercase tracking-widest">
        <a
          href="https://www.instagram.com/gigglefilmz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-outline-variant hover:text-tertiary-fixed transition-all hover:scale-105"
        >
          Instagram
        </a>
        <a
          href="/privacy-policy/"
          className="text-outline-variant hover:text-tertiary-fixed transition-all hover:scale-105 font-body text-sm uppercase tracking-widest"
        >
          Privacy Policy
        </a>
      </div>
      <div className="text-outline-variant font-body text-xs uppercase tracking-widest text-center md:text-right">
        © 2025 SERVAYAM ANIMATION STUDIO. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
