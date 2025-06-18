// components/site-header.tsx
import { ShoppingCartIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>; // ✅ bunu ekle
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Header({ setCurrentPage, cart, setIsCartOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentPage("landing")}
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent font-orbitron">
              TradeBot
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setCurrentPage("products")}
            className="text-white/80 hover:text-white transition-colors font-medium"
          >
            Products
          </button>
          <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">
            Features
          </a>
          <a href="#testimonials" className="text-white/80 hover:text-white transition-colors font-medium">
            Testimonials
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Cart Button - Always Visible */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:bg-white/10 ml-4"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm md:hidden">
            <div className="fixed right-0 top-0 bottom-0 w-3/4 p-6 bg-gray-900 shadow-lg border-l border-white/10">
              <button
                className="absolute right-4 top-4 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>
              
              <div className="flex flex-col space-y-8 mt-12">
                <button
                  onClick={() => {
                    setCurrentPage("products");
                    setIsMenuOpen(false);
                  }}
                  className="text-white text-lg font-medium"
                >
                  Products
                </button>
                <a 
                  href="#features" 
                  className="text-white text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className="text-white text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testimonials
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
