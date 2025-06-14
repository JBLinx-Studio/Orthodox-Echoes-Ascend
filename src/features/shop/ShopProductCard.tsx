
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart, Star, Heart, Info, Hash, MapPin, Mail, Download, BookOpen, Package
} from "lucide-react";
import { toast } from "sonner";
import { ShopProduct } from "./shopProducts";

function getProductIcon(type: string) {
  switch (type) {
    case "digital":
      return <Download className="h-4 w-4" />;
    case "course":
      return <BookOpen className="h-4 w-4" />;
    case "physical":
      return <Package className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
}

interface ShopProductCardProps {
  product: ShopProduct;
  selected: boolean;
  onWishlist: (productName: string) => void;
  onAddToCart: (productName: string) => void;
}

export function ShopProductCard({ product, selected, onWishlist, onAddToCart }: ShopProductCardProps) {
  return (
    <Card className={`bg-[#1A1F2C]/80 border-gold/20 hover:border-gold/40 transition-all duration-300 group ${selected ? "ring-2 ring-gold" : ""}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain bg-[#2A2F3C] group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 left-2 bg-gold text-black flex items-center gap-1">
            {getProductIcon(product.type)}
            {product.category}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white/60 hover:text-gold hover:bg-gold/10"
            onClick={() => onWishlist(product.name)}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
            ))}
          </div>
          <span className="text-sm text-white/60">({product.reviews})</span>
        </div>

        <CardTitle className="text-white mb-2">{product.name}</CardTitle>
        <CardDescription className="text-white/60 mb-3">{product.description}</CardDescription>

        {product.type === "physical" && (
          <div className="space-y-2 mb-3 text-sm text-white/70">
            {product.quantity !== null && (
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3" />
                <span>{product.quantity} available</span>
              </div>
            )}
            {product.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{product.location}</span>
              </div>
            )}
            {product.contact && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="text-gold">{product.contact}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.map(feature => (
            <Badge key={feature} variant="outline" className="text-xs border-gold/30 text-gold">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gold">{product.priceUSD}</span>
              <span className="text-sm text-white/50 line-through">{product.originalPriceUSD}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gold">{product.priceZAR}</span>
              <span className="text-sm text-white/50 line-through">{product.originalPriceZAR}</span>
            </div>
          </div>
          <Badge variant={product.inStock ? "default" : "destructive"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            className="flex-1 bg-gold hover:bg-gold/90 text-black"
            onClick={() => onAddToCart(product.name)}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Contact for Stock"}
          </Button>
          <Button variant="outline" size="icon" className="border-gold/30 text-gold hover:bg-gold/10">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
