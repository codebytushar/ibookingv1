// app/(protected)/layout.tsx
'use client';

import { SessionProvider } from 'next-auth/react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 lg:p-8">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </SessionProvider>
  );
}