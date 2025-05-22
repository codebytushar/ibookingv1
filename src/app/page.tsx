'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center px-4 py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Welcome to Golokdham IBooking
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600">
          Effortless room booking and satsangi management for every shivir.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight size={18} />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-24 max-w-6xl mx-auto">
        {[
          {
            title: "Room Allocation",
            desc: "Manage room properties, types and occupancy with ease.",
          },
          {
            title: "Satsangi Management",
            desc: "Track seva, preferences, and check-in/out status.",
          },
          {
            title: "Shivir Planning",
            desc: "Organize events with full visibility and control.",
          },
        ].map((feat) => (
          <Card key={feat.title} className="rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-8">
        © {new Date().getFullYear()} Golokdham IBooking. All rights reserved.
      </footer>
    </main>
  );
}