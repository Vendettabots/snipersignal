"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lottie from "lottie-react";
import botScan from "@/public/lotties/bot-scan.json";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, XIcon, MinusIcon, PlusIcon, TrashIcon, ShoppingBag } from "lucide-react";
import ProductPage from "@/components/product-section";
import Header from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

// Simple placeholder 3D model
function BotModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1.5, 1]} />
      <meshStandardMaterial 
        color="#6366f1" 
        metalness={0.8}
        roughness={0.2}
      />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </mesh>
  );
}

const products = [
  { 
    id: 1, 
    name: "Project Management Pro", 
    price: 99.99, 
    image: "https://via.placeholder.com/1000",
    features: ["Real-time alerts", "Custom strategies", "24/7 monitoring"]
  },
  { 
    id: 2, 
    name: "Trading Algorithm X", 
    price: 149.99, 
    image: "https://via.placeholder.com/1000",
    features: ["AI-powered", "Backtesting", "Risk management"]
  },
  { 
    id: 3, 
    name: "Market Scanner Pro", 
    price: 79.99, 
    image: "https://via.placeholder.com/1000",
    features: ["Real-time data", "Custom alerts", "Multi-exchange"]
  }
];

export default function ECommerceApp() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Load cart from localStorage on first load
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
        localStorage.removeItem("cart");
      }
    }
    setHasHydrated(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (hasHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hasHydrated]);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Add to cart function
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity function
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const renderLandingPage = () => (
    <main className="flex-1">
      {/* Hero Section */}
      <section 
        ref={sectionRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900"
      >
        {/* 3D Model Background */}
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0 opacity-20"
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <BotModel />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </motion.div>
        
        {/* Content Container */}
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 font-orbitron"
              >
                <span className="inline-block text-overflow-guard">Algorithmic Trading</span>
                <br />
                <span className="inline-block text-overflow-guard">Reimagined</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-[600px] text-gray-300 md:text-xl mx-auto lg:mx-0"
              >
                Next-gen trading automation powered by machine learning and real-time market analysis.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  onClick={() => setCurrentPage("products")} 
                  className="inline-flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
                >
                  Explore Bots
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </div>
            
            {/* Lottie Animation */}
            <div className="relative mx-auto lg:order-last w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl -rotate-6" />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative z-10 w-full h-full"
              >
                <Lottie 
                  animationData={botScan} 
                  loop 
                  autoplay 
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-8 h-14 rounded-full border-2 border-white flex justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 20] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-3 h-3 bg-white rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:60px_60px]" />
        </div>
        
        <div className="container px-4 md:px-6 mx-auto relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16 text-center text-white"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Market-Dominating Features
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: "⚡", 
                title: "Real-Time Scan", 
                description: "Millisecond-level market analysis across all major exchanges",
                color: "from-yellow-400 to-amber-500"
              },
              { 
                icon: "🤖", 
                title: "AI-Powered", 
                description: "Machine learning models that adapt to market conditions",
                color: "from-blue-400 to-cyan-500"
              },
              { 
                icon: "📊", 
                title: "Advanced Analytics", 
                description: "Comprehensive reporting and performance metrics",
                color: "from-purple-400 to-pink-500"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
                className={`bg-gradient-to-br ${feature.color} p-0.5 rounded-2xl shadow-lg transition-all duration-300 ${hoveredFeature === i ? 'scale-105' : ''}`}
              >
                <div className="bg-gray-900 h-full rounded-2xl p-6 flex flex-col">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative w-full py-32 bg-[url('/grid-bg.jpg')] bg-cover bg-fixed bg-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center text-white">
            Trusted by Professional Traders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This bot paid for itself in the first week. The arbitrage detection is unmatched.",
                author: "Sarah K., Hedge Fund Manager",
                stats: "+47% ROI in 3 months"
              },
              {
                quote: "The AI adaptation feature has transformed my trading strategy completely.",
                author: "Michael T., Day Trader",
                stats: "+32% monthly gains"
              },
              {
                quote: "Best investment I've made for my trading business. The analytics are incredible.",
                author: "David R., Crypto Investor",
                stats: "5x returns in 6 months"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all"
              >
                <div className="text-2xl mb-6 text-white">"</div>
                <p className="text-lg text-gray-200 mb-6">{testimonial.quote}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-purple-300">{testimonial.stats}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );

  const renderCart = () => {
    return (
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-900 shadow-xl p-6 overflow-y-auto z-50 border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Cart</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsCartOpen(false)}
                >
                  <XIcon className="h-6 w-6" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <ShoppingCartIcon className="h-16 w-16 text-gray-500 mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                  <Button 
                    onClick={() => {
                      setCurrentPage("products");
                      setIsCartOpen(false);
                    }}
                    className="mt-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3"
                  >
                    Browse Products
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div layout className="space-y-4">
                    {cart.map((item) => (
                      <motion.div 
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <p className="text-sm text-gray-300">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-white border-white/20 hover:bg-white/10"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="mx-2 text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-white border-white/20 hover:bg-white/10"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 text-white hover:bg-white/10"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div 
                    layout
                    className="mt-6 border-t border-white/10 pt-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-gray-300">Subtotal:</span>
                      <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={async () => {
                        const res = await fetch('/api/create-now-invoice', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            productName: 'Cart Purchase',
                            amount: totalPrice,
                            currency: 'usdt',
                          }),
                        });

                        const data = await res.json();
                        if (data.invoice_url) {
                          window.open(data.invoice_url, '_blank');
                        } else {
                          alert('Payment failed.');
                        }
                      }}
                      className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 text-lg font-semibold hover:shadow-lg transition-all"
                    >
                      Pay with Crypto
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header
        setCurrentPage={setCurrentPage}
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
      />

      {currentPage === "landing" ? (
        renderLandingPage()
      ) : (
        <ProductPage products={products} addToCart={addToCart} />
      )}

      {renderCart()}
      <SiteFooter />
    </div>
  );
}
