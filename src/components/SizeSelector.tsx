import React from 'react';
import { PizzaSize, SizeOption } from '@/types/pizza';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: PizzaSize;
  onChange: (size: PizzaSize) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {sizes.map((size) => (
        <button
          key={size.id}
          onClick={() => onChange(size.id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all duration-200 text-center",
            selected === size.id
              ? "border-primary bg-primary/10 shadow-glow"
              : "border-border bg-muted/30 hover:border-muted-foreground"
          )}
        >
          <p className="font-semibold text-foreground">{size.name}</p>
          <p className={cn(
            "text-lg font-bold",
            selected === size.id ? "text-primary" : "text-muted-foreground"
          )}>
            €{size.price.toFixed(2)}
          </p>
        </button>
      ))}
    </div>
  );
}
