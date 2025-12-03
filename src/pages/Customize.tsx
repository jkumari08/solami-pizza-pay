import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ToppingCounter } from '@/components/ToppingCounter';
import { SizeSelector } from '@/components/SizeSelector';
import { getPizzaById, toppings, sizeOptions } from '@/data/pizzas';
import { useCart } from '@/context/CartContext';
import { PizzaSize } from '@/types/pizza';

export default function Customize() {
  const { pizzaId } = useParams<{ pizzaId: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const pizza = getPizzaById(pizzaId || '');
  
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('medium');
  const [toppingCounts, setToppingCounts] = useState({
    pepperoni: 0,
    mushrooms: 0,
    olives: 0,
  });

  const totalPrice = useMemo(() => {
    const sizePrice = sizeOptions.find(s => s.id === selectedSize)?.price || 0;
    const toppingsPrice = 
      toppingCounts.pepperoni * 0.99 +
      toppingCounts.mushrooms * 0.99 +
      toppingCounts.olives * 0.99;
    return sizePrice + toppingsPrice;
  }, [selectedSize, toppingCounts]);

  if (!pizza) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Pizza Not Found</h1>
            <p className="text-muted-foreground mb-8">The pizza you're looking for doesn't exist.</p>
            <Link to="/menu">
              <Button variant="gradient">Back to Menu</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: `${pizza.id}-${Date.now()}`,
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      pizzaImage: pizza.image,
      size: selectedSize,
      toppings: toppingCounts,
      quantity: 1,
      price: totalPrice,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pizza Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-card border border-border">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full gradient-primary text-primary-foreground font-bold text-lg shadow-glow">
                €{totalPrice.toFixed(2)}
              </div>
            </div>

            {/* Customization Panel */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold glass text-foreground capitalize mb-3 inline-block">
                  {pizza.category}
                </span>
                <h1 className="text-4xl font-bold text-foreground mb-3">{pizza.name}</h1>
                <p className="text-lg text-muted-foreground">{pizza.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Choose Size</h3>
                <SizeSelector
                  sizes={sizeOptions}
                  selected={selectedSize}
                  onChange={setSelectedSize}
                />
              </div>

              {/* Toppings */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Extra Toppings</h3>
                <div className="space-y-3">
                  {toppings.map((topping) => (
                    <ToppingCounter
                      key={topping.id}
                      topping={topping}
                      count={toppingCounts[topping.id as keyof typeof toppingCounts]}
                      onChange={(count) =>
                        setToppingCounts(prev => ({
                          ...prev,
                          [topping.id]: count,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="p-6 rounded-xl bg-card border border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-muted-foreground">Base ({selectedSize})</span>
                  <span className="text-foreground">
                    €{sizeOptions.find(s => s.id === selectedSize)?.price.toFixed(2)}
                  </span>
                </div>
                {Object.entries(toppingCounts).map(([key, count]) => {
                  if (count === 0) return null;
                  const topping = toppings.find(t => t.id === key);
                  return (
                    <div key={key} className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">
                        {topping?.emoji} {topping?.name} x{count}
                      </span>
                      <span className="text-foreground">
                        €{(count * 0.99).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t border-border pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-gradient">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  variant="gradient"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <Link
                to="/menu"
                className="block text-center text-muted-foreground hover:text-primary transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
