
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { BlogCategory } from '@/types/BlogPost';

// Get sample categories from localStorage or use defaults
const getSavedCategories = (): BlogCategory[] => {
  const savedCategories = localStorage.getItem('orthodoxEchoesCategories');
  if (savedCategories) {
    return JSON.parse(savedCategories);
  }
  
  // Default categories
  return [
    { id: "theology", name: "Theology", slug: "theology", description: "Theological discussions and doctrine", iconName: "BookOpen" },
    { id: "liturgy", name: "Liturgy", slug: "liturgy", description: "Orthodox worship and services", iconName: "Calendar" },
    { id: "spirituality", name: "Spirituality", slug: "spirituality", description: "Orthodox spiritual practices", iconName: "Heart" },
    { id: "history", name: "Church History", slug: "history", description: "History of the Orthodox Church", iconName: "Clock" },
    { id: "saints", name: "Saints", slug: "saints", description: "Lives of Orthodox saints", iconName: "User" },
    { id: "art", name: "Orthodox Art", slug: "art", description: "Iconography and Orthodox art", iconName: "Image" }
  ];
};

interface BlogCategoryManagerProps {
  onCategoriesChange?: (categories: BlogCategory[]) => void;
}

export function BlogCategoryManager({ onCategoriesChange }: BlogCategoryManagerProps) {
  const [categories, setCategories] = useState<BlogCategory[]>(getSavedCategories());
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<BlogCategory | null>(null);
  
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  
  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orthodoxEchoesCategories', JSON.stringify(categories));
    if (onCategoriesChange) {
      onCategoriesChange(categories);
    }
  }, [categories, onCategoriesChange]);
  
  const handleAddCategory = () => {
    resetForm();
    setIsAddingCategory(true);
    setIsEditingCategory(false);
  };
  
  const handleEditCategory = (category: BlogCategory) => {
    setCurrentCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description || '');
    setIsEditingCategory(true);
    setIsAddingCategory(false);
  };
  
  const resetForm = () => {
    setName('');
    setSlug('');
    setDescription('');
    setCurrentCategory(null);
  };
  
  const cancelEdit = () => {
    resetForm();
    setIsAddingCategory(false);
    setIsEditingCategory(false);
  };
  
  const generateSlug = (text: string) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (!isEditingCategory || slug === '') {
      setSlug(generateSlug(newName));
    }
  };
  
  const handleSaveCategory = () => {
    if (!name || !slug) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Validate slug uniqueness (except for current category)
    const slugExists = categories.some(cat => 
      cat.slug === slug && (!currentCategory || cat.id !== currentCategory.id)
    );
    
    if (slugExists) {
      toast.error("A category with this slug already exists");
      return;
    }
    
    if (isAddingCategory) {
      const newCategory: BlogCategory = {
        id: slug,
        name,
        slug,
        description: description || undefined
      };
      
      setCategories([...categories, newCategory]);
      toast.success("New category created successfully");
    } else if (isEditingCategory && currentCategory) {
      const updatedCategories = categories.map(category => 
        category.id === currentCategory.id 
          ? {
              ...category,
              name,
              slug,
              description: description || undefined
            }
          : category
      );
      
      setCategories(updatedCategories);
      toast.success("Category updated successfully");
    }
    
    resetForm();
    setIsAddingCategory(false);
    setIsEditingCategory(false);
  };
  
  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category? Any posts in this category will need to be reassigned.")) {
      setCategories(categories.filter(category => category.id !== id));
      toast.success("Category deleted successfully");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-morphism border-gold/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-gold">Category Management</CardTitle>
          <Button 
            onClick={handleAddCategory} 
            className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" /> New Category
          </Button>
        </CardHeader>
        <CardContent>
          {categories.length > 0 ? (
            <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b bg-[#1A1F2C]/80">
                      <TableHead className="text-white/80">Name</TableHead>
                      <TableHead className="text-white/80">Slug</TableHead>
                      <TableHead className="text-white/80">Description</TableHead>
                      <TableHead className="text-right text-white/80">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                        <TableCell className="text-white/90">{category.name}</TableCell>
                        <TableCell className="text-white/70">{category.slug}</TableCell>
                        <TableCell className="text-white/70 max-w-[300px] truncate">
                          {category.description || "-"}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                            onClick={() => handleEditCategory(category)}
                            aria-label="Edit category"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                            onClick={() => handleDeleteCategory(category.id)}
                            aria-label="Delete category"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-white/60 glass-morphism rounded-md border border-gold/10 p-8">
              <p>No categories available. Create your first category!</p>
            </div>
          )}
          
          {/* Category Edit Form */}
          {(isAddingCategory || isEditingCategory) && (
            <div className="mt-6 p-4 border border-gold/20 rounded-md glass-morphism">
              <h3 className="text-lg font-semibold mb-4 text-gold">
                {isAddingCategory ? "Create New Category" : "Edit Category"}
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name" className="text-white/90">Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="category-name" 
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Category name" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-slug" className="text-white/90">Slug <span className="text-destructive">*</span></Label>
                  <Input 
                    id="category-slug" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="category-slug" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    required
                  />
                  <p className="text-xs text-white/60">
                    The "slug" is the URL-friendly version of the name. It should contain only lowercase letters, numbers, and hyphens.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-description" className="text-white/90">Description</Label>
                  <Textarea 
                    id="category-description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this category" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    onClick={cancelEdit}
                    className="border-gold/30 text-gold hover:bg-gold/10"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveCategory}
                    className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    {isAddingCategory ? "Create Category" : "Save Changes"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
