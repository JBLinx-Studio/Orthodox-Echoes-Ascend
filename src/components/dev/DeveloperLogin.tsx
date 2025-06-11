
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Eye, EyeOff, Home } from 'lucide-react';
import { toast } from 'sonner';

interface DeveloperLoginProps {
  onSuccess: () => void;
}

export function DeveloperLogin({ onSuccess }: DeveloperLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Developer password - "Elevated" for elevated access
  const DEVELOPER_PASSWORD = 'Elevated';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === DEVELOPER_PASSWORD) {
      localStorage.setItem('orthodoxEchoesDeveloperAccess', 'true');
      localStorage.setItem('orthodoxEchoesDeveloperLoginTime', Date.now().toString());
      toast.success('Elevated access granted', {
        description: 'Welcome to the sacred development sanctuary.'
      });
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      toast.error('Access denied', {
        description: 'Invalid elevated credentials.'
      });
      setPassword('');
      
      if (attempts >= 2) {
        toast.error('Multiple failed attempts detected', {
          description: 'Access temporarily restricted.'
        });
      }
    }
    
    setIsLoading(false);
  };

  const handleReturnHome = () => {
    window.location.hash = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#1A1F2C]/90 border-gold/20 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-byzantine/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-gold" />
              </div>
            </div>
            <CardTitle className="text-2xl font-display text-gold">
              Developer Sanctuary
            </CardTitle>
            <p className="text-white/70 text-sm">
              Elevated development portal - authorized access only
            </p>
          </CardHeader>
          
          <CardContent>
            {attempts >= 3 && (
              <Alert className="mb-4 border-red-500/20 bg-red-500/10">
                <Lock className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-400">
                  Access temporarily restricted due to multiple failed attempts.
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">
                  Elevated Access Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter elevated password"
                    className="bg-[#0C1118] border-gold/30 text-white placeholder:text-white/50 pr-10"
                    disabled={attempts >= 3 || isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-white/50" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/50" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-byzantine hover:bg-byzantine-dark"
                disabled={attempts >= 3 || isLoading || !password}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Access Developer Portal'
                )}
              </Button>
              
              <Button 
                type="button"
                variant="ghost"
                className="w-full text-white/70 hover:text-white"
                onClick={handleReturnHome}
              >
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-white/50">
                Attempt {attempts}/3 • Secure development environment
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
