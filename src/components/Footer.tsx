import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <span className="text-2xl">🍕</span>
              <span className="text-gradient">Solami</span>
              <span className="text-foreground">Pizza</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The future of pizza payments. Order delicious pizza and pay with Solana. 
              Fast, cheap, and secure transactions on the blockchain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Payment</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span>◎</span> Solana (SOL)
              </li>
              <li className="flex items-center gap-2">
                <span>💵</span> USDC
              </li>
              <li className="flex items-center gap-2">
                <span>🐕</span> BONK
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Solami Pizza. Built on Solana.
          </p>
          <p className="text-xs text-muted-foreground">
            🔒 Devnet Demo - No real money involved
          </p>
        </div>
      </div>
    </footer>
  );
}
