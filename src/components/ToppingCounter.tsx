import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Topping } from '@/types/pizza';
import { cn } from '@/lib/utils';

interface ToppingCounterProps {
  topping: Topping;
  count: number;
  onChange: (count: number) => void;
  max?: number;
}

export function ToppingCounter({ topping, count, onChange, max = 5 }: ToppingCounterProps) {
  const increment = () => {
    if (count < max) {
      onChange(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{topping.emoji}</span>
        <div>
          <p className="font-medium text-foreground">{topping.name}</p>
          <p className="text-sm text-muted-foreground">€{topping.price.toFixed(2)} per portion</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={decrement}
          disabled={count === 0}
          className="h-9 w-9"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <span
          className={cn(
            "w-8 text-center font-bold text-lg transition-all",
            count > 0 ? "text-primary" : "text-muted-foreground"
          )}
        >
          {count}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={increment}
          disabled={count === max}
          className="h-9 w-9"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
