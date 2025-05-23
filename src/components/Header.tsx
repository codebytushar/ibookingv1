// app/components/Header.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-indigo-600/90 backdrop-blur-md text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <Link href="/" className="flex items-center space-x-2">
        {/* <img src="/images/logo.png" alt="Golokdham IBooking" className="h-8 w-auto" /> */}
        <span className="text-xl font-semibold">Golokdham IBooking</span>
      </Link>
      <div className="flex items-center space-x-4">
        {session && (
          <span className="text-sm">Welcome, {session.user.name}</span>
        )}
        <Button
          variant="ghost"
          className="text-white hover:text-indigo-200"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}