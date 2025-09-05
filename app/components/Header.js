"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, School } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Add New School", href: "/addSchool", icon: <PlusCircle size={18} /> },
    { name: "Show Schools", href: "/showSchools", icon: <School size={18} /> },
  ];

  return (
    <header className="w-full shadow-md bg-white px-6 py-4">
      <nav className="flex items-center gap-8 lg:gap-15 justify-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center p-1 lg:px-4 gap-2 text-md font-medium ${
                isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
