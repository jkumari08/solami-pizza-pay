import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ArrowRight, Clock, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function Confirmation() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useCart();

  const order = useMemo(() => {
    return orders.find(o => o.id === orderId);
  }, [orders, orderId]);

  useEffect(() => {
    // Trigger confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#9945FF', '#00D4AA', '#FF6B35'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#9945FF', '#00D4AA', '#FF6B35'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find this order. Please check your order history.
            </p>
            <Link to="/orders">
              <Button variant="gradient">View Orders</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
              <CheckCircle className="h-16 w-16 text-secondary" />
            </div>

            {/* Header */}
            <h1 className="text-4xl font-bold text-foreground mb-4 animate-slide-up">
              Order Confirmed! ✅
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Thank you for your order! Your delicious pizza is being prepared. 🍕
            </p>

            {/* Order Details Card */}
            <div className="p-8 rounded-2xl bg-card border border-border text-left mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-semibold text-foreground">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="text-foreground">{formatDate(order.timestamp)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Items</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between p-3 rounded-lg bg-muted/30">
                      <span className="text-foreground">
                        {item.quantity}× {item.pizzaName} ({item.size})
                      </span>
                      <span className="font-medium text-foreground">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-border">
                <span className="text-lg font-semibold text-foreground">Total Paid</span>
                <span className="text-2xl font-bold text-gradient">€{order.total.toFixed(2)}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Paid with wallet</p>
                <p className="font-mono text-sm text-foreground break-all">{order.walletAddress}</p>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center gap-2 text-secondary">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold capitalize">{order.status}</span>
              </div>
            </div>

            {/* Estimated Time */}
            <div className="p-4 rounded-xl glass mb-8 inline-flex items-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Clock className="h-5 w-5 text-accent" />
              <span className="text-foreground">Estimated delivery: 25-35 minutes</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/orders">
                <Button variant="gradient" size="lg">
                  View Order History
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="mr-2 h-5 w-5" />
                  Order Another
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
