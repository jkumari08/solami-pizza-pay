import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Percent, Gift, ArrowRight, Check, Copy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const promos = [
  {
    id: 'SOLANA20',
    code: 'SOLANA20',
    title: '20% Off First Order',
    description: 'New to Solami? Get 20% off your first pizza order when you pay with any crypto!',
    discount: '20%',
    icon: Tag,
    color: 'primary',
    validUntil: 'Dec 31, 2025',
  },
  {
    id: 'BONK10',
    code: 'BONK10',
    title: '10% Off with BONK',
    description: 'Pay with BONK tokens and get an extra 10% discount on your entire order.',
    discount: '10%',
    icon: Percent,
    color: 'secondary',
    validUntil: 'Jan 15, 2026',
  },
  {
    id: 'FREEPIZZA',
    code: 'FREEPIZZA',
    title: 'Buy 2 Get 1 Free',
    description: 'Order any 2 large pizzas and get a third one absolutely free!',
    discount: 'Free Pizza',
    icon: Gift,
    color: 'accent',
    validUntil: 'Dec 25, 2025',
  },
];

export default function Deals() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Code "${code}" copied!`, {
      description: 'Apply at checkout',
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm text-foreground">Limited Time Offers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Deals & Promo Codes 🎉
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Save big on your favorite pizzas! Copy a promo code and apply it at checkout.
            </p>
          </div>

          {/* Promo Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {promos.map((promo, index) => (
              <div
                key={promo.id}
                className="p-6 rounded-2xl bg-card border border-border hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-${promo.color}/20 flex items-center justify-center mb-4`}>
                  <promo.icon className={`h-7 w-7 text-${promo.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-2">{promo.title}</h3>
                <p className="text-muted-foreground mb-4">{promo.description}</p>

                {/* Discount Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-bold mb-4">
                  {promo.discount} OFF
                </div>

                {/* Code & Copy */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border mb-4">
                  <code className="flex-1 font-mono font-bold text-foreground">{promo.code}</code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyCode(promo.code)}
                    className="h-8 w-8"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="h-4 w-4 text-secondary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Valid Until */}
                <p className="text-xs text-muted-foreground">
                  Valid until {promo.validUntil}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/menu">
              <Button variant="gradient" size="lg">
                Start Ordering
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
