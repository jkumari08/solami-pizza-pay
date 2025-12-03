import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWallet } from '@/context/WalletContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Cart', path: '/cart' },
  { name: 'Orders', path: '/orders' },
  { name: 'About', path: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { connected, connecting, connect, disconnect, shortAddress } = useWallet();
  const itemCount = getItemCount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">🍕</span>
            <span className="text-gradient">Solami</span>
            <span className="text-foreground">Pizza</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center animate-bounce-in">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Wallet Button */}
            <Button
              variant={connected ? "outline" : "gradient"}
              size="sm"
              onClick={connected ? disconnect : connect}
              disabled={connecting}
              className="hidden sm:flex"
            >
              <Wallet className="h-4 w-4" />
              {connecting ? (
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Connecting...
                </span>
              ) : connected ? (
                shortAddress
              ) : (
                'Connect Wallet'
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                variant={connected ? "outline" : "gradient"}
                onClick={connected ? disconnect : connect}
                disabled={connecting}
                className="mt-2"
              >
                <Wallet className="h-4 w-4" />
                {connecting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : connected ? (
                  shortAddress
                ) : (
                  'Connect Wallet'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
