
import { Card, CardContent } from "@/components/ui/card";
import { Package, Truck, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function ShopInfoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="grid md:grid-cols-3 gap-6"
    >
      <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
        <Package className="h-8 w-8 text-gold mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Premium Quality</h3>
        <p className="text-white/60 text-sm">Blessed products with traditional methods</p>
      </Card>
      <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
        <Truck className="h-8 w-8 text-gold mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Local Delivery</h3>
        <p className="text-white/60 text-sm">Contact for delivery arrangements in South Africa</p>
      </Card>
      <Card className="bg-[#1A1F2C]/60 border-gold/20 p-6 text-center">
        <Shield className="h-8 w-8 text-gold mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Secure & Blessed</h3>
        <p className="text-white/60 text-sm">All products blessed by Orthodox tradition</p>
      </Card>
    </motion.div>
  );
}
