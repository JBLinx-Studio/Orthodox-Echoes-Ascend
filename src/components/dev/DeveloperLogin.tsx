
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Lock, Eye, EyeOff, Terminal } from 'lucide-react';
import { toast } from 'sonner';

interface DeveloperLoginProps {
  onSuccess: () => void;
}

export function DeveloperLogin({ onSuccess }: DeveloperLoginProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const DEVELOPER_PASSWORD = 'Elevated'; // Updated password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (password === DEVELOPER_PASSWORD) {
        localStorage.setItem('orthodoxEchoesDeveloperAccess', 'true');
        localStorage.setItem('orthodoxEchoesDeveloperLoginTime', Date.now().toString());
        toast.success('Access granted to Developer Sanctuary');
        onSuccess();
      } else {
        toast.error('Invalid credentials. Access denied.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-[#1A1F2C]/90 border-gold/20 backdrop-blur-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <CardTitle className="text-2xl font-display text-gold">Developer Sanctuary</CardTitle>
            <p className="text-white/70">
              Enter the sacred password to access elevated controls
            </p>
            <div className="flex items-center justify-center space-x-2 text-gold/60 text-sm">
              <Terminal className="w-4 h-4" />
              <span>Password: "Elevated"</span>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">
                  Access Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#0C1118] border-gold/30 text-white pr-10"
                    placeholder="Enter developer password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold/90 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Enter Sanctuary</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-md">
              <div className="flex items-start space-x-2">
                <Shield className="w-5 h-5 text-gold mt-0.5" />
                <div className="text-sm">
                  <p className="text-gold font-medium">Security Notice</p>
                  <p className="text-white/70 mt-1">
                    This area contains sensitive development tools and system controls. 
                    Session expires after 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
