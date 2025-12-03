import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Coins, Code, Globe, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient">Solami Pizza</span> 🍕
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to revolutionize how you order and pay for pizza 
              using the power of blockchain technology.
            </p>
          </div>

          {/* Mission */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="p-8 rounded-3xl gradient-card border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                Solami Pizza combines the joy of delicious, handcrafted pizzas with the 
                cutting-edge technology of Solana blockchain. We believe that payments 
                should be fast, cheap, and secure – just like our pizza deliveries.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <div className="p-6 rounded-2xl bg-card border border-border text-center hover-lift">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Solana processes transactions in milliseconds, not minutes. Your payment 
                is confirmed before you can say "pizza"!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border text-center hover-lift">
              <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-7 w-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Super Cheap</h3>
              <p className="text-muted-foreground">
                Transaction fees on Solana are fractions of a cent. More money for 
                extra toppings!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border text-center hover-lift">
              <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Secure</h3>
              <p className="text-muted-foreground">
                Blockchain technology ensures your transactions are immutable and 
                transparent. No chargebacks, no fraud.
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Built With</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'React', icon: Code },
                { name: 'TypeScript', icon: Code },
                { name: 'Solana', icon: Globe },
                { name: 'Tailwind CSS', icon: Heart },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-xl glass text-center"
                >
                  <tech.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <span className="font-medium text-foreground">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devnet Notice */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">⚠️ Devnet Demo</h3>
              <p className="text-muted-foreground">
                This is a demonstration app running on Solana Devnet. No real money 
                is involved. Feel free to test with devnet tokens!
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Try?</h2>
            <p className="text-muted-foreground mb-6">
              Experience the future of pizza payments today.
            </p>
            <Link to="/menu">
              <Button variant="gradient" size="lg">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
