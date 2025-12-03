import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Pizza } from '@/types/pizza';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PizzaCardProps {
  pizza: Pizza;
  index?: number;
}

export function PizzaCard({ pizza, index = 0 }: PizzaCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl gradient-card border border-border hover-lift",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < pizza.rating
                  ? "fill-accent text-accent"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>

        {/* Name & Description */}
        <h3 className="text-xl font-bold text-foreground mb-1">{pizza.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {pizza.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gradient">
            €{pizza.basePrice.toFixed(2)}
          </span>
          <Link to={`/customize/${pizza.id}`}>
            <Button variant="gradient" size="sm">
              Customize & Add 🍕
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold glass text-foreground capitalize">
          {pizza.category}
        </span>
      </div>
    </div>
  );
}
