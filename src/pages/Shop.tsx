import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShopProductGrid } from "@/features/shop/ShopProductGrid";
import { ShopInfoPopup } from "@/features/shop/ShopInfoPopup";
import { ShopInfoSection } from "@/features/shop/ShopInfoSection";
import { shopProducts } from "@/features/shop/shopProducts";

export default function Shop() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Orthodox Marketplace | Orthodox Echoes";
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };
  const handleWishlist = (productName: string) => {
    toast.success(`${productName} added to wishlist!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] pt-20">
      {/* Popup Notice */}
      <ShopInfoPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onDetails={() => setSelectedProduct("beeside-collection")}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">
            Orthodox Marketplace
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Discover premium spiritual resources, blessed products, and educational materials
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
              <h2 className="text-2xl font-bold text-gold mb-2">
                🍯 BeeSide Honey & Beeswax
              </h2>
              <p className="text-white/80">
                Pure 100% delicious wild honey and beeswax
              </p>
              <p className="text-white/60 text-sm mt-1">
                Currently restocking – beeswax candles coming soon!
              </p>
            </div>
            <Badge className="bg-red-500 text-white font-bold">
              Out of Stock
            </Badge>
          </div>
        </motion.div>
        {/* Products Grid */}
        <ShopProductGrid
          products={shopProducts}
          selectedProductId={selectedProduct}
          onWishlist={handleWishlist}
          onAddToCart={handleAddToCart}
          onSelect={setSelectedProduct}
        />
        {/* Info Section */}
        <ShopInfoSection />
      </div>
    </div>
  );
}
