import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Coins, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PizzaCard } from '@/components/PizzaCard';
import { pizzas } from '@/data/pizzas';

const Index = () => {
  const scrollToMenu = () => {
    document.getElementById('featured-menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 pt-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-sm text-muted-foreground">Powered by Solana</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="text-foreground">The Future of</span>
              <br />
              <span className="text-gradient">Pizza Payments</span>
              <span className="ml-4 animate-float inline-block">🍕</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Order delicious pizza. Pay with Solana.
              <br />
              <span className="text-foreground font-semibold">Fast. Cheap. Secure.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/menu">
                <Button variant="hero" size="xl">
                  Start Ordering
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="glass" size="lg" onClick={scrollToMenu}>
                View Menu
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 p-4 rounded-xl glass">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Instant Payments</p>
                  <p className="text-sm text-muted-foreground">Solana Pay</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl glass">
                <div className="p-2 rounded-lg bg-secondary/20">
                  <Coins className="h-5 w-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Multiple Tokens</p>
                  <p className="text-sm text-muted-foreground">SOL, USDC, BONK</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl glass">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Devnet Demo</p>
                  <p className="text-sm text-muted-foreground">No real money</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToMenu}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          >
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section id="featured-menu" className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Signature Pizzas 🍕
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handcrafted with love, baked to perfection, and ready to be paid with crypto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pizzas.map((pizza, index) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button variant="gradient" size="lg">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Order your pizza in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Choose Your Pizza', description: 'Browse our menu and customize your perfect pizza', emoji: '🍕' },
              { step: '02', title: 'Connect Wallet', description: 'Connect your Solana wallet (Phantom, Solflare, etc.)', emoji: '👛' },
              { step: '03', title: 'Pay & Enjoy', description: 'Complete payment with USDC and wait for your pizza', emoji: '✨' },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center p-6 rounded-2xl gradient-card border border-border animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-6xl mb-4 inline-block">{item.emoji}</span>
                <div className="text-sm font-bold text-primary mb-2">{item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl gradient-card border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Ready to Order? 🚀
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the future of pizza payments today. Fast, secure, and delicious.
              </p>
              <Link to="/menu">
                <Button variant="hero" size="xl">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
