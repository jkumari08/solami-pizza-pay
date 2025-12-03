import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, saveOrder } = useCart();
  const { connected, connecting, connect, address } = useWallet();
  const [processing, setProcessing] = useState(false);

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
              <h1 className="text-3xl font-bold text-foreground mb-4">Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Add some pizzas to your cart before checking out.
              </p>
              <Link to="/menu">
                <Button variant="gradient" size="lg">Browse Menu</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePayment = async () => {
    if (!connected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Save the order
    const order = saveOrder(address);

    toast.success('Payment successful! 🎉', {
      description: `Order ${order.id} confirmed`,
    });

    // Navigate to confirmation
    navigate(`/confirmation/${order.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Checkout 💳</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Order Summary */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">{item.pizzaName}</p>
                      <p className="text-sm text-muted-foreground capitalize">{item.size} × {item.quantity}</p>
                      {(item.toppings.pepperoni > 0 || item.toppings.mushrooms > 0 || item.toppings.olives > 0) && (
                        <p className="text-xs text-muted-foreground">
                          {item.toppings.pepperoni > 0 && `+${item.toppings.pepperoni} Pepperoni `}
                          {item.toppings.mushrooms > 0 && `+${item.toppings.mushrooms} Mushrooms `}
                          {item.toppings.olives > 0 && `+${item.toppings.olives} Olives`}
                        </p>
                      )}
                    </div>
                    <span className="font-medium text-foreground">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>€{(getTotal() / 1.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (10%)</span>
                  <span>€{(getTotal() - getTotal() / 1.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-gradient">€{getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-xl font-bold text-foreground mb-6">Payment</h2>

              {/* Wallet Connection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Wallet Address
                </label>
                {connected ? (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <p className="font-mono text-sm text-foreground break-all">{address}</p>
                    <p className="text-xs text-secondary mt-2 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary" />
                      Connected
                    </p>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-muted/30 border border-border text-center">
                    <Wallet className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      Please connect your wallet to continue
                    </p>
                    <Button
                      variant="gradient"
                      onClick={connect}
                      disabled={connecting}
                    >
                      {connecting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="h-4 w-4" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <Button
                variant="success"
                size="xl"
                className="w-full"
                onClick={handlePayment}
                disabled={!connected || processing}
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing payment...
                  </>
                ) : (
                  <>
                    Pay €{getTotal().toFixed(2)} with USDC
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Test network (devnet) - no real money involved
              </p>

              {/* Supported Wallets */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center mb-3">Supported Wallets</p>
                <div className="flex justify-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">Phantom</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">Solflare</span>
                  <span className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">Torus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
