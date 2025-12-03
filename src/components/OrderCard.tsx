import React from 'react';
import { CheckCircle, Clock, Package } from 'lucide-react';
import { Order } from '@/types/pizza';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-secondary" />;
      case 'completed':
        return <Package className="h-5 w-5 text-primary" />;
      default:
        return <Clock className="h-5 w-5 text-accent" />;
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'confirmed':
        return 'bg-secondary/20 text-secondary';
      case 'completed':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-accent/20 text-accent';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getItemsSummary = () => {
    return order.items.map(item => `${item.quantity}x ${item.pizzaName}`).join(', ');
  };

  return (
    <div className="p-5 rounded-xl bg-card border border-border hover-lift animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono font-semibold text-foreground">{order.id}</p>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium capitalize",
          getStatusColor()
        )}>
          {getStatusIcon()}
          {order.status}
        </div>
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Items</p>
        <p className="text-foreground">{getItemsSummary()}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="text-foreground">{formatDate(order.timestamp)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-bold text-gradient">€{order.total.toFixed(2)}</p>
        </div>
      </div>

      {/* Wallet */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">Paid with</p>
        <p className="font-mono text-sm text-foreground truncate">
          {order.walletAddress}
        </p>
      </div>
    </div>
  );
}
