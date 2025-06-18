// components/product-section.tsx
import { Button } from "./ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  features?: string[];
}

interface ProductPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductPage({ products, addToCart }: ProductPageProps) {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center font-orbitron bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Our Trading Bots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-gray-900 rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all"
            >
              <div className="p-6">
                <div className="aspect-square w-full bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                  {product.name}
                </h3>
                {product.features && (
                  <ul className="mb-4 space-y-2">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <span className="text-pink-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}