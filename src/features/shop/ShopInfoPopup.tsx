
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";

interface ShopInfoPopupProps {
  show: boolean;
  onClose: () => void;
  onDetails: () => void;
}

export function ShopInfoPopup({ show, onClose, onDetails }: ShopInfoPopupProps) {
  if (!show) return null;
  return (
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
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <div className="mb-4">
            <img
              src="/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png"
              alt="BeeSide Collection"
              className="w-24 h-24 mx-auto object-contain"
            />
          </div>
          <h3 className="text-xl font-bold text-gold mb-2">
            🍯 BeeSide Honey & Beeswax
          </h3>
          <p className="text-white/80 mb-4">
            Pure 100% delicious wild honey and beeswax. Honey sold as R100 (500g), R200 (bigger bottle); beeswax also available. All stock currently out—beeswax candles coming soon!
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => {
                onClose();
                onDetails();
              }}
              className="bg-gold hover:bg-gold/90 text-black"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gold/30 text-gold hover:bg-gold/10"
            >
              Later
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
