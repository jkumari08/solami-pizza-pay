import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Order } from '@/types/pizza';
import { toast } from 'sonner';

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  saveOrder: (walletAddress: string) => Order;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'solami-cart';
const ORDERS_STORAGE_KEY = 'solami-orders';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addItem = (item: CartItem) => {
    setItems(prev => [...prev, item]);
    toast.success(`${item.pizzaName} added to cart! 🍕`, {
      description: `${item.size} with your custom toppings`,
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.1;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const saveOrder = (walletAddress: string): Order => {
    const order: Order = {
      id: `SOL-${Date.now()}`,
      timestamp: Date.now(),
      items: [...items],
      total: getTotal(),
      status: 'confirmed',
      walletAddress,
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        orders,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTax,
        getTotal,
        getItemCount,
        saveOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
