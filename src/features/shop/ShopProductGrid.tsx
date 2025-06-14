
import { AnimatePresence, motion } from "framer-motion";
import { ShopProduct } from "./shopProducts";
import { ShopProductCard } from "./ShopProductCard";

interface ShopProductGridProps {
  products: ShopProduct[];
  selectedProductId: string | null;
  onWishlist: (productName: string) => void;
  onAddToCart: (productName: string) => void;
  onSelect: (productId: string) => void;
}

export function ShopProductGrid({
  products,
  selectedProductId,
  onWishlist,
  onAddToCart,
  onSelect
}: ShopProductGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      <AnimatePresence>
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className={selectedProductId === product.id ? "ring-2 ring-gold" : ""}
            onClick={() => onSelect(product.id)}
          >
            <ShopProductCard
              product={product}
              selected={selectedProductId === product.id}
              onWishlist={onWishlist}
              onAddToCart={onAddToCart}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
