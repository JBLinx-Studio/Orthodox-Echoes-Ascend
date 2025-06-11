import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Package, 
  Download,
  BookOpen,
  ShoppingCart,
  DollarSign,
  Home,
  MapPin,
  Hash
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: string;
  priceZAR: string;
  originalPriceUSD: string;
  originalPriceZAR: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  quantity: number | null;
  location: string | null;
  type: 'physical' | 'digital' | 'course';
  features: string[];
  category: string;
}

export function ShopManager() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'beeside-collection',
      name: 'BeeSide Premium Collection',
      description: 'Pure 100% delicious wild honey and natural beeswax. Honey available in 500g (R100) and larger bottles (R200). Beeswax candles coming soon!',
      priceUSD: '$5.40',
      priceZAR: 'R100',
      originalPriceUSD: '$10.80',
      originalPriceZAR: 'R200',
      image: '/lovable-uploads/777f39ed-a494-4566-bc24-29941d4489ed.png',
      rating: 4.9,
      reviews: 127,
      inStock: false,
      quantity: 0,
      location: 'Despatch, South Africa 6219',
      type: 'physical',
      features: ['100% Pure Wild Honey', 'Natural Beeswax', 'Premium Quality', 'Contact: EthosofOrthodoxy@gmail.com'],
      category: 'BeeSide Collection'
    },
    {
      id: 'prayer-ebook',
      name: 'Digital Prayer Compendium',
      description: 'Complete collection of Orthodox prayers and daily devotions in digital format',
      priceUSD: '$4.99',
      priceZAR: 'R89.99',
      originalPriceUSD: '$9.99',
      originalPriceZAR: 'R179.99',
      image: '/placeholder.svg',
      rating: 4.7,
      reviews: 203,
      inStock: true,
      quantity: null,
      location: null,
      type: 'digital',
      features: ['Instant Download', 'PDF Format', '500+ Prayers', 'Mobile Friendly'],
      category: 'Digital Resources'
    },
    {
      id: 'theology-course',
      name: 'Orthodox Theology Online Course',
      description: 'Comprehensive 12-week course on Orthodox Christian theology and doctrine',
      priceUSD: '$49.99',
      priceZAR: 'R919.99',
      originalPriceUSD: '$99.99',
      originalPriceZAR: 'R1,839.99',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 45,
      inStock: true,
      quantity: null,
      location: null,
      type: 'course',
      features: ['12 Weeks', 'Video Lectures', 'Certificate', 'Expert Instructors'],
      category: 'Educational'
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleReturnHome = () => {
    window.location.hash = '/';
  };

  const createNewProduct = (): Product => ({
    id: `product-${Date.now()}`,
    name: '',
    description: '',
    priceUSD: '$0.00',
    priceZAR: 'R0.00',
    originalPriceUSD: '$0.00',
    originalPriceZAR: 'R0.00',
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 0,
    inStock: true,
    quantity: null,
    location: null,
    type: 'digital',
    features: [],
    category: 'Digital Resources'
  });

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingProduct(createNewProduct());
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!editingProduct) return;

    if (isCreating) {
      setProducts([...products, editingProduct]);
      toast.success('Product created successfully!');
    } else {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      toast.success('Product updated successfully!');
    }

    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleDelete = (productId: string) => {
    if (products.length <= 1) {
      toast.error('Cannot delete the last product. At least one product must remain.');
      return;
    }
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Product deleted successfully!');
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsCreating(false);
  };

  const updateEditingProduct = (field: keyof Product, value: any) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const addFeature = () => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: [...editingProduct.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingProduct) return;
    const newFeatures = [...editingProduct.features];
    newFeatures[index] = value;
    setEditingProduct({ ...editingProduct, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      features: editingProduct.features.filter((_, i) => i !== index)
    });
  };

  const getProductIcon = (type: string) => {
    switch (type) {
      case 'digital': return <Download className="h-4 w-4" />;
      case 'course': return <BookOpen className="h-4 w-4" />;
      case 'physical': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="h-6 w-6 text-gold" />
          <h2 className="text-2xl font-bold text-gold">Shop Management</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreate} className="bg-gold hover:bg-gold/90 text-black">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReturnHome}
            className="border-gold/30 text-gold hover:bg-gold/10"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>
      </div>

      {/* Product List */}
      {!editingProduct && (
        <div className="grid gap-4">
          {products.map((product) => (
            <Card key={product.id} className="bg-[#1A1F2C]/70 border-gold/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-contain bg-[#2A2F3C] rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getProductIcon(product.type)}
                        <span className="ml-1">{product.type}</span>
                      </Badge>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-sm text-white/60 mb-2">{product.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-gold font-bold">{product.priceUSD} / {product.priceZAR}</span>
                      <span className="text-sm text-white/50">Category: {product.category}</span>
                      <span className="text-sm text-white/50">Reviews: {product.reviews}</span>
                      {product.quantity && (
                        <div className="flex items-center gap-1 text-sm text-white/50">
                          <Hash className="h-3 w-3" />
                          <span>Qty: {product.quantity}</span>
                        </div>
                      )}
                      {product.location && (
                        <div className="flex items-center gap-1 text-sm text-white/50">
                          <MapPin className="h-3 w-3" />
                          <span>{product.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="border-gold/30 text-gold hover:bg-gold/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit/Create Form */}
      {editingProduct && (
        <Card className="bg-[#1A1F2C]/70 border-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gold">
              {isCreating ? <Plus className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
              {isCreating ? 'Create New Product' : 'Edit Product'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Product Name</Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => updateEditingProduct('name', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-white">Category</Label>
                <Input
                  id="category"
                  value={editingProduct.category}
                  onChange={(e) => updateEditingProduct('category', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={editingProduct.description}
                onChange={(e) => updateEditingProduct('description', e.target.value)}
                className="bg-[#2A2F3C] border-gold/20 text-white"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="priceUSD" className="text-white">Price USD</Label>
                <Input
                  id="priceUSD"
                  value={editingProduct.priceUSD}
                  onChange={(e) => updateEditingProduct('priceUSD', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="priceZAR" className="text-white">Price ZAR</Label>
                <Input
                  id="priceZAR"
                  value={editingProduct.priceZAR}
                  onChange={(e) => updateEditingProduct('priceZAR', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="originalPriceUSD" className="text-white">Original USD</Label>
                <Input
                  id="originalPriceUSD"
                  value={editingProduct.originalPriceUSD}
                  onChange={(e) => updateEditingProduct('originalPriceUSD', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="originalPriceZAR" className="text-white">Original ZAR</Label>
                <Input
                  id="originalPriceZAR"
                  value={editingProduct.originalPriceZAR}
                  onChange={(e) => updateEditingProduct('originalPriceZAR', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="type" className="text-white">Product Type</Label>
                <Select value={editingProduct.type} onValueChange={(value) => updateEditingProduct('type', value)}>
                  <SelectTrigger className="bg-[#2A2F3C] border-gold/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image" className="text-white">Image URL</Label>
                <Input
                  id="image"
                  value={editingProduct.image}
                  onChange={(e) => updateEditingProduct('image', e.target.value)}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="rating" className="text-white">Rating (1-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={editingProduct.rating}
                  onChange={(e) => updateEditingProduct('rating', parseFloat(e.target.value))}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="reviews" className="text-white">Reviews Count</Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  value={editingProduct.reviews}
                  onChange={(e) => updateEditingProduct('reviews', parseInt(e.target.value))}
                  className="bg-[#2A2F3C] border-gold/20 text-white"
                />
              </div>
            </div>

            {/* Physical Product Fields */}
            {editingProduct.type === 'physical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity" className="text-white">Quantity Available</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={editingProduct.quantity || ''}
                    onChange={(e) => updateEditingProduct('quantity', e.target.value ? parseInt(e.target.value) : 0)}
                    className="bg-[#2A2F3C] border-gold/20 text-white"
                    placeholder="Enter quantity (0 for out of stock)"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    value={editingProduct.location || ''}
                    onChange={(e) => updateEditingProduct('location', e.target.value || null)}
                    className="bg-[#2A2F3C] border-gold/20 text-white"
                    placeholder="Enter location"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                checked={editingProduct.inStock}
                onCheckedChange={(checked) => updateEditingProduct('inStock', checked)}
              />
              <Label className="text-white">In Stock</Label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-white">Features</Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={addFeature}
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {editingProduct.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="bg-[#2A2F3C] border-gold/20 text-white"
                      placeholder="Enter feature (e.g., Contact: email@example.com)"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSave}
                className="bg-gold hover:bg-gold/90 text-black"
              >
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Create Product' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="border-gold/30 text-gold hover:bg-gold/10"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
