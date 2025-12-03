import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CartItemComponent } from '@/components/CartItem';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const { items, getSubtotal, getTax, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any pizzas yet. Start ordering to fill your cart!
              </p>
              <Link to="/menu">
                <Button variant="gradient" size="lg">
                  Browse Menu
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-8">Your Cart 🛒</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">€{getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground">€{getTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-gradient">€{getTotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/checkout" className="block">
                    <Button variant="gradient" size="lg" className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/menu" className="block">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  🔒 Secure checkout with Solana Pay
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
