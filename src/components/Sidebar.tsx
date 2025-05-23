// app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Satsangis', href: '/satsangis' },
    { name: 'Shivir Planning', href: '/shivir-planning' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`bg-white/90 backdrop-blur-md w-64 p-6 fixed lg:static h-full lg:h-auto transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8">
          <h2 className="text-xl font-bold text-indigo-800">Navigation</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 px-4 text-gray-800 hover:bg-indigo-100/50 rounded-md"
              onClick={() => setIsOpen(false)} // Close sidebar on mobile click
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}