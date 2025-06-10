
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeveloperLoginProps {
  onSuccess: () => void;
}

export function DeveloperLogin({ onSuccess }: DeveloperLoginProps) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple password check - in production, this would be more secure
    if (password === 'orthodoxdev2024' || password === 'sanctuary') {
      localStorage.setItem('orthodoxEchoesDeveloperAccess', 'true');
      localStorage.setItem('orthodoxEchoesDeveloperLoginTime', Date.now().toString());
      
      toast.success('Welcome to the Development Sanctuary', {
        description: 'Sacred access granted to the developer realm.'
      });
      
      onSuccess();
    } else {
      toast.error('Access Denied', {
        description: 'The sacred password is incorrect. Please seek wisdom.'
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md bg-[#1A1F2C]/90 border-gold/20 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-gold hover:text-gold/80 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex-1 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-gold" />
              </div>
            </div>
            <div className="w-5 h-5"></div> {/* Spacer for balance */}
          </div>
          <CardTitle className="text-2xl font-display text-gold">
            Developer Sanctuary
          </CardTitle>
          <p className="text-white/70 mt-2">
            Enter the sacred password to access the development realm
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Sacred Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the sacred key..."
                className="bg-[#0F1419] border-gold/30 text-white placeholder:text-white/40 focus:border-gold"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold/90 text-[#1A1F2C] font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#1A1F2C]/30 border-t-[#1A1F2C] rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                'Enter Sanctuary'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-white/50">
              "Seek and you shall find, knock and the door will be opened"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
