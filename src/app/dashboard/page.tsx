// app/dashboard/page.tsx
'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    redirect('/login');
  }

  return <div>Welcome, {session.user.name}!</div>;
}