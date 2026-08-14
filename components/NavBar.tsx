import Link from "next/link";

const links = [
  { href: "/plan", label: "Plan" },
  { href: "/itinerary", label: "Itinerary" },
];

export default function NavBar() {
  return (
    <header className="glass-panel sticky top-4 z-10 mx-4 mt-4 flex items-center justify-between px-6 py-4 sm:mx-8 sm:px-8">
      <Link
        href="/"
        className="font-display text-lg tracking-[0.2em] text-white-soft"
      >
        VOYARA
      </Link>
      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-white-muted transition-colors hover:text-gold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
