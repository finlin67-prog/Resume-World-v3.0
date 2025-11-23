"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Simple helper to check active nav item
function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-opacity duration-200 ${
        active ? "bg-white/20 text-white" : "text-white/80 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export default function NavBar() {
  return (
    <header className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-rose-500 shadow-lg py-4 px-6 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-white">
          Career Theme Park
        </Link>

        {/* Navigation Items */}
        <div className="flex gap-6 items-center">
          <NavItem href="/" label="Roles" />
          <NavItem href="/skills" label="Skills" />
          <NavItem href="/projects" label="Projects" />
          <NavItem href="/certifications" label="Certifications" />
        </div>
      </nav>
    </header>
  );
}
