import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { WalletProvider } from "@/context/WalletContext";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Customize from "./pages/Customize";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Orders from "./pages/Orders";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WalletProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/customize/:pizzaId" element={<Customize />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation/:orderId" element={<Confirmation />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WalletProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
