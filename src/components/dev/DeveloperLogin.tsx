
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Shield, ArrowLeft, Crown, Key } from 'lucide-react';
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

    // Updated password check
    if (password === 'Elevated' || password === 'orthodoxdev2024' || password === 'sanctuary') {
      localStorage.setItem('orthodoxEchoesDeveloperAccess', 'true');
      localStorage.setItem('orthodoxEchoesDeveloperLoginTime', Date.now().toString());
      
      toast.success('🔑 Access Granted to Sacred Sanctuary', {
        description: 'Welcome to the elevated development realm.',
        duration: 3000
      });
      
      onSuccess();
    } else {
      toast.error('⛔ Sacred Access Denied', {
        description: 'The elevation key is incorrect. Seek divine wisdom.',
        duration: 4000
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold/3 blur-3xl animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md bg-[#1A1F2C]/90 border-gold/20 backdrop-blur-sm relative z-10 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="text-gold hover:text-gold/80 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex-1 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-byzantine/30 flex items-center justify-center mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-gold animate-pulse" />
              </div>
            </div>
            <div className="w-5 h-5"></div> {/* Spacer for balance */}
          </div>
          <CardTitle className="text-2xl font-display text-gold mb-2">
            Developer Sanctuary
          </CardTitle>
          <p className="text-white/70 text-sm leading-relaxed">
            Enter the sacred elevation key to access the divine development realm where sacred code flows like incense
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
                <Key className="w-4 h-4 text-gold" />
                Sacred Elevation Key
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter the divine key..."
                className="bg-[#0F1419] border-gold/30 text-white placeholder:text-white/40 focus:border-gold focus:ring-gold/20 transition-all"
                required
              />
              <p className="text-xs text-white/50 mt-1">
                💡 Hint: Think of rising higher in spiritual authority
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gold to-byzantine hover:from-gold/90 hover:to-byzantine/90 text-[#1A1F2C] font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#1A1F2C]/30 border-t-[#1A1F2C] rounded-full animate-spin"></div>
                  Seeking Divine Authorization...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Enter Sacred Sanctuary
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-white/50 italic">
              "Ask, and it shall be given you; seek, and ye shall find"
            </p>
            <p className="text-xs text-gold/70">
              - Matthew 7:7
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
