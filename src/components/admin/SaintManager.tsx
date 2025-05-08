
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';
import { Edit, Trash2, Plus, Check, Calendar, User, BookOpen } from 'lucide-react';

// Saint data type
interface Saint {
  id: string;
  name: string;
  title: string;
  feastDay: string;
  birthYear?: string;
  deathYear?: string;
  biography: string;
  imageUrl?: string;
  quote?: string;
  category: string;
  featured: boolean;
  region: string;
}

// Categories for saints
const SAINT_CATEGORIES = [
  { id: "apostle", name: "Apostle" },
  { id: "martyr", name: "Martyr" },
  { id: "confessor", name: "Confessor" },
  { id: "monastic", name: "Monastic Saint" },
  { id: "hierarch", name: "Hierarch" },
  { id: "wonderworker", name: "Wonderworker" },
  { id: "unmercenary", name: "Unmercenary Healer" }
];

// Regions for saints
const REGIONS = [
  { id: "byzantine", name: "Byzantine Empire" },
  { id: "russian", name: "Russian" },
  { id: "greek", name: "Greek" },
  { id: "levant", name: "Levantine" },
  { id: "coptic", name: "Coptic" },
  { id: "western", name: "Western" },
  { id: "other", name: "Other" }
];

// Sample saints data
const SAMPLE_SAINTS: Saint[] = [
  {
    id: "1",
    name: "St. Athanasius the Great",
    title: "Patriarch of Alexandria",
    feastDay: "May 2",
    birthYear: "296",
    deathYear: "373",
    biography: "St. Athanasius was the 20th bishop of Alexandria and is renowned as the chief defender of Trinitarian theology against Arianism. He attended the First Council of Nicaea in 325 and spent much of his life defending the Nicene Creed and the divinity of Christ.",
    imageUrl: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=1200&auto=format&fit=crop",
    quote: "The Son of God became man so that we might become God.",
    category: "hierarch",
    featured: true,
    region: "byzantine"
  },
  {
    id: "2",
    name: "St. John Chrysostom",
    title: "Archbishop of Constantinople",
    feastDay: "November 13",
    birthYear: "347",
    deathYear: "407",
    biography: "Known for his eloquent preaching and public denunciation of abuse of authority in the Church and Empire, St. John Chrysostom (\"Golden-mouthed\") is one of the most influential early Church Fathers and was among the most prolific authors in the early Christian Church.",
    imageUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1200&auto=format&fit=crop",
    quote: "Prayer is the place of refuge for every worry, a foundation for cheerfulness, a source of constant happiness, a protection against sadness.",
    category: "hierarch",
    featured: true,
    region: "byzantine"
  },
  {
    id: "3",
    name: "St. Mary of Egypt",
    title: "Desert Ascetic",
    feastDay: "April 1",
    deathYear: "421",
    biography: "St. Mary of Egypt was a desert ascetic who lived alone for 47 years in the Jordanian desert after a dramatic conversion. She is revered in both Eastern and Western Christianity as a model of repentance.",
    imageUrl: "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?q=80&w=1200&auto=format&fit=crop",
    category: "monastic",
    featured: false,
    region: "byzantine"
  }
];

export function SaintManager() {
  const [saints, setSaints] = useState<Saint[]>(SAMPLE_SAINTS);
  const [isAddingSaint, setIsAddingSaint] = useState(false);
  const [isEditingSaint, setIsEditingSaint] = useState(false);
  const [currentSaint, setCurrentSaint] = useState<Saint | null>(null);
  
  // Form fields
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [feastDay, setFeastDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [deathYear, setDeathYear] = useState('');
  const [biography, setBiography] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [category, setCategory] = useState('hierarch');
  const [featured, setFeatured] = useState(false);
  const [region, setRegion] = useState('byzantine');
  
  const handleNewSaint = () => {
    resetForm();
    setIsAddingSaint(true);
    setIsEditingSaint(false);
  };
  
  const handleEditSaint = (saint: Saint) => {
    setCurrentSaint(saint);
    setName(saint.name);
    setTitle(saint.title);
    setFeastDay(saint.feastDay);
    setBirthYear(saint.birthYear || '');
    setDeathYear(saint.deathYear || '');
    setBiography(saint.biography);
    setImageUrl(saint.imageUrl || '');
    setQuote(saint.quote || '');
    setCategory(saint.category);
    setFeatured(saint.featured);
    setRegion(saint.region);
    
    setIsEditingSaint(true);
    setIsAddingSaint(false);
  };
  
  const resetForm = () => {
    setName('');
    setTitle('');
    setFeastDay('');
    setBirthYear('');
    setDeathYear('');
    setBiography('');
    setImageUrl('');
    setQuote('');
    setCategory('hierarch');
    setFeatured(false);
    setRegion('byzantine');
    setCurrentSaint(null);
  };
  
  const cancelEdit = () => {
    resetForm();
    setIsAddingSaint(false);
    setIsEditingSaint(false);
  };
  
  const handleSaveSaint = () => {
    if (!name || !biography || !feastDay || !category) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (isAddingSaint) {
      const newSaint: Saint = {
        id: (saints.length + 1).toString(),
        name,
        title,
        feastDay,
        birthYear: birthYear || undefined,
        deathYear: deathYear || undefined,
        biography,
        imageUrl: imageUrl || undefined,
        quote: quote || undefined,
        category,
        featured,
        region
      };
      
      setSaints([...saints, newSaint]);
      toast.success(`${name} added to saints database`);
    } else if (isEditingSaint && currentSaint) {
      const updatedSaints = saints.map(saint => 
        saint.id === currentSaint.id 
          ? {
              ...saint,
              name,
              title,
              feastDay,
              birthYear: birthYear || undefined,
              deathYear: deathYear || undefined,
              biography,
              imageUrl: imageUrl || undefined,
              quote: quote || undefined,
              category,
              featured,
              region
            }
          : saint
      );
      
      setSaints(updatedSaints);
      toast.success(`${name} updated successfully`);
    }
    
    resetForm();
    setIsAddingSaint(false);
    setIsEditingSaint(false);
  };
  
  const handleDeleteSaint = (id: string) => {
    setSaints(saints.filter(saint => saint.id !== id));
    toast.success("Saint removed from database");
  };
  
  const handleFeatureToggle = (id: string, featured: boolean) => {
    const updatedSaints = saints.map(saint => 
      saint.id === id ? { ...saint, featured } : saint
    );
    setSaints(updatedSaints);
    toast.success(`Saint ${featured ? 'featured' : 'unfeatured'} successfully`);
  };

  return (
    <div className="space-y-6">
      <Card className="glass-morphism border-gold/20 shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl text-gold">Saints Database</CardTitle>
          <Button onClick={handleNewSaint} className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg">
            <Plus className="h-4 w-4 mr-2" /> New Saint
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4 bg-[#1A1F2C] border border-gold/20">
              <TabsTrigger value="all">All Saints</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="hierarchs">Hierarchs</TabsTrigger>
              <TabsTrigger value="monastics">Monastics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-[#1A1F2C]/80">
                        <th className="py-3 px-4 text-left font-medium text-white/80">Name</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Title</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Feast Day</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Category</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Featured</th>
                        <th className="py-3 px-4 text-right font-medium text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saints.map((saint) => (
                        <tr key={saint.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="py-3 px-4 text-white/90">{saint.name}</td>
                          <td className="py-3 px-4 text-white/70">{saint.title}</td>
                          <td className="py-3 px-4 text-white/70">{saint.feastDay}</td>
                          <td className="py-3 px-4 text-white/70">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-byzantine/20 text-byzantine-light">
                              {SAINT_CATEGORIES.find(c => c.id === saint.category)?.name || saint.category}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Switch 
                              checked={saint.featured} 
                              onCheckedChange={(checked) => handleFeatureToggle(saint.id, checked)}
                              className="data-[state=checked]:bg-byzantine"
                            />
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                              onClick={() => handleEditSaint(saint)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteSaint(saint.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="featured">
              <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-[#1A1F2C]/80">
                        <th className="py-3 px-4 text-left font-medium text-white/80">Name</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Title</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Feast Day</th>
                        <th className="py-3 px-4 text-right font-medium text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saints.filter(s => s.featured).map((saint) => (
                        <tr key={saint.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="py-3 px-4 text-white/90">{saint.name}</td>
                          <td className="py-3 px-4 text-white/70">{saint.title}</td>
                          <td className="py-3 px-4 text-white/70">{saint.feastDay}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                              onClick={() => handleEditSaint(saint)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteSaint(saint.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="hierarchs">
              <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-[#1A1F2C]/80">
                        <th className="py-3 px-4 text-left font-medium text-white/80">Name</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Title</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Feast Day</th>
                        <th className="py-3 px-4 text-right font-medium text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saints.filter(s => s.category === 'hierarch').map((saint) => (
                        <tr key={saint.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="py-3 px-4 text-white/90">{saint.name}</td>
                          <td className="py-3 px-4 text-white/70">{saint.title}</td>
                          <td className="py-3 px-4 text-white/70">{saint.feastDay}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                              onClick={() => handleEditSaint(saint)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteSaint(saint.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="monastics">
              <div className="rounded-md border border-gold/20 overflow-hidden glass-morphism">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-[#1A1F2C]/80">
                        <th className="py-3 px-4 text-left font-medium text-white/80">Name</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Title</th>
                        <th className="py-3 px-4 text-left font-medium text-white/80">Feast Day</th>
                        <th className="py-3 px-4 text-right font-medium text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saints.filter(s => s.category === 'monastic').map((saint) => (
                        <tr key={saint.id} className="border-b border-gold/10 hover:bg-gold/5 transition-colors">
                          <td className="py-3 px-4 text-white/90">{saint.name}</td>
                          <td className="py-3 px-4 text-white/70">{saint.title}</td>
                          <td className="py-3 px-4 text-white/70">{saint.feastDay}</td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gold hover:text-gold/80 hover:bg-gold/10"
                              onClick={() => handleEditSaint(saint)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                              onClick={() => handleDeleteSaint(saint.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {(isAddingSaint || isEditingSaint) && (
        <Card className="glass-morphism border-gold/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gold">
              {isAddingSaint ? "Add New Saint" : "Edit Saint Information"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/90">Name <span className="text-destructive">*</span></Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="St. John Chrysostom" 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white/90">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Archbishop of Constantinople" 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="feastDay" className="text-white/90">Feast Day <span className="text-destructive">*</span></Label>
                  <Input 
                    id="feastDay" 
                    value={feastDay}
                    onChange={(e) => setFeastDay(e.target.value)}
                    placeholder="November 13" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="birthYear" className="text-white/90">Birth Year</Label>
                  <Input 
                    id="birthYear" 
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    placeholder="347" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deathYear" className="text-white/90">Death Year</Label>
                  <Input 
                    id="deathYear" 
                    value={deathYear}
                    onChange={(e) => setDeathYear(e.target.value)}
                    placeholder="407" 
                    className="bg-[#1A1F2C]/50 border-gold/30"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white/90">Category <span className="text-destructive">*</span></Label>
                  <Select 
                    value={category} 
                    onValueChange={setCategory}
                  >
                    <SelectTrigger className="bg-[#1A1F2C]/50 border-gold/30">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SAINT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-white/90">Region</Label>
                  <Select 
                    value={region} 
                    onValueChange={setRegion}
                  >
                    <SelectTrigger className="bg-[#1A1F2C]/50 border-gold/30">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((reg) => (
                        <SelectItem key={reg.id} value={reg.id}>{reg.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white/90">Image URL</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg" 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                />
                {imageUrl && (
                  <div className="mt-2 rounded-md overflow-hidden h-32 bg-black/20">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="biography" className="text-white/90">Biography <span className="text-destructive">*</span></Label>
                <Textarea 
                  id="biography" 
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Saint's life and significance..." 
                  rows={5} 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quote" className="text-white/90">Notable Quote</Label>
                <Textarea 
                  id="quote" 
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Famous saying by this saint..." 
                  rows={2} 
                  className="bg-[#1A1F2C]/50 border-gold/30"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                  className="data-[state=checked]:bg-byzantine"
                />
                <Label htmlFor="featured" className="text-white/90">Feature this saint on the homepage</Label>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button 
                  variant="outline" 
                  onClick={cancelEdit}
                  className="border-gold/30 text-gold hover:bg-gold/10"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-byzantine hover:bg-byzantine-dark shadow-gold/10 shadow-lg" 
                  onClick={handleSaveSaint}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {isAddingSaint ? "Add Saint" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
