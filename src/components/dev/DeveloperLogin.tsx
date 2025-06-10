
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface DeveloperLoginProps {
  onSuccess: () => void;
}

export function DeveloperLogin({ onSuccess }: DeveloperLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if password is "Elevated"
    if (password === 'Elevated') {
      localStorage.setItem('orthodoxEchoesDeveloperAccess', 'true');
      localStorage.setItem('orthodoxEchoesDeveloperLoginTime', Date.now().toString());
      toast.success('Access granted to the Developer Sanctuary');
      onSuccess();
    } else {
      toast.error('Access denied. Invalid sanctuary key.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1A1F2C]/90 border-gold/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-gold" />
          </div>
          <CardTitle className="text-2xl font-display text-gold">Developer Sanctuary</CardTitle>
          <p className="text-white/70">Enter the sacred key to access the inner sanctum</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Sanctuary Key</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter the elevated key..."
                  className="bg-[#0C1118] border-gold/30 text-white pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-gold/60 hover:text-gold"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold/90 text-black"
              disabled={isLoading}
            >
              {isLoading ? 'Validating...' : 'Enter Sanctuary'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-xs text-gold/60">Hint: The key represents spiritual ascension</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
