import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PizzaCard } from '@/components/PizzaCard';
import { pizzas } from '@/data/pizzas';

export default function Menu() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Menu 🍕
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted pizzas made with the finest ingredients. 
              Customize your perfect pizza and pay with Solana.
            </p>
          </div>

          {/* Pizza Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzas.map((pizza, index) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={index} />
            ))}
          </div>

          {/* Info Banner */}
          <div className="mt-16 p-8 rounded-2xl glass text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              🔒 Secure Payments on Solana
            </h3>
            <p className="text-muted-foreground">
              All payments are processed securely on the Solana blockchain. 
              This is a devnet demo - no real money is involved.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
