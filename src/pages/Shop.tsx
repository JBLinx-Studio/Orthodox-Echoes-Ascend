
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Info, 
  X, 
  Package, 
  Truck, 
  Shield,
  Honey,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Shop | Orthodox Echoes';
    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      id: 'beeside-honey',
      name: 'BeeSide Wild Honey',
      description: 'Premium raw wild honey sourced from pristine Orthodox monastery lands',
      price: '$24.99',
      originalPrice: '$34.99',
      image: '/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png',
      rating: 4.9,
      reviews: 127,
      inStock: true,
      features: ['100% Raw & Unfiltered', 'Monastery Sourced', 'Premium Quality', 'Traditional Methods'],
      category: 'Honey Products'
    },
    {
      id: 'beehive-wax',
      name: 'Pure Beehive Wax',
      description: 'Natural beeswax candles and blocks for prayer and meditation',
      price: '$18.99',
      originalPrice: '$24.99',
      image: '/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png',
      rating: 4.8,
      reviews: 89,
      inStock: true,
      features: ['100% Natural Wax', 'Long Burning', 'Sacred Tradition', 'Handcrafted'],
      category: 'Wax Products'
    }
  ];

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  const handleWishlist = (productName: string) => {
    toast.success(`${productName} added to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] pt-20">
      {/* Popup Notice */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1F2C] border border-gold/30 rounded-lg p-6 max-w-md w-full relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={() => setShowPopup(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src="/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png"
                    alt="BeeSide Premium Honey"
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gold mb-2">
                  🍯 BeeSide Premium Honey
                </h3>
                <p className="text-white/80 mb-4">
                  Discover our monastery-sourced wild honey collection. Pure, raw, and blessed by tradition.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => {
                      setShowPopup(false);
                      setSelectedProduct('beeside-honey');
                    }}
                    className="bg-gold hover:bg-gold/90 text-black"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Shop Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPopup(false)}
                    className="border-gold/30 text-gold hover:bg-gold/10"
                  >
                    Later
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Sacred Shop
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover premium honey and wax products blessed by Orthodox tradition
          </p>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-gold/20 to-byzantine/20 rounded-lg p-6 mb-8 border border-gold/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gold mb-2">🍯 BeeSide Collection</h2>
              <p className="text-white/80">Premium honey and wax from sacred monastery lands</p>
            </div>
            <Badge className="bg-gold text-black font-bold">Featured</Badge>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`${selectedProduct === product.id ? 'ring-2 ring-gold' : ''}`}
            >
              <Card className="bg-[#1A1F2C]/80 border-gold/20 hover:border-gold/40 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-contain bg-[#2A2F3C] group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-gold text-black">
                      {product.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-white/60 hover:text-gold hover:bg-gold/10"
                      onClick={() => handleWishlist(product.name)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/60">({product.reviews})</span>
                  </div>
                  
                  <CardTitle className="text-white mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-white/60 mb-3">
                    {product.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs border-gold/30 text-gold">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gold">{product.price}</span>
                      <span className="text-sm text-white/50 line-through">{product.originalPrice}</span>
                    </div>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gold hover:bg-gold/90 text-black"
                      onClick={() => handleAddToCart(product.name)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" size="icon" className="border-gold/30 text-gold hover:bg-gold/10">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
            <Package className="h-8 w-8 text-gold mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
            <p className="text-white/60 text-sm">Monastery-sourced products with traditional methods</p>
          </Card>
          
          <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
            <Truck className="h-8 w-8 text-gold mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Free Shipping</h3>
            <p className="text-white/60 text-sm">Free delivery on orders over $50</p>
          </Card>
          
          <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
            <Shield className="h-8 w-8 text-gold mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Blessed Products</h3>
            <p className="text-white/60 text-sm">All products blessed by Orthodox tradition</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
