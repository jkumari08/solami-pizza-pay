import React from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/pizza';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  const getToppingsString = () => {
    const toppings = [];
    if (item.toppings.pepperoni > 0) toppings.push(`${item.toppings.pepperoni}x Pepperoni`);
    if (item.toppings.mushrooms > 0) toppings.push(`${item.toppings.mushrooms}x Mushrooms`);
    if (item.toppings.olives > 0) toppings.push(`${item.toppings.olives}x Olives`);
    return toppings.length > 0 ? toppings.join(', ') : 'No extra toppings';
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-card border border-border animate-fade-in">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.pizzaImage}
          alt={item.pizzaName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{item.pizzaName}</h3>
        <p className="text-sm text-muted-foreground capitalize">{item.size} size</p>
        <p className="text-sm text-muted-foreground truncate">{getToppingsString()}</p>
        <p className="text-lg font-bold text-primary mt-1">
          €{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.id)}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center font-medium">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
