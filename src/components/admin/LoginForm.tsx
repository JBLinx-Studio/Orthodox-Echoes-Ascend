
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, Shield, EyeOff, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  isLoading?: boolean;
  attempts?: number;
  isSignUp?: boolean;
  onToggleMode: () => void;
}

export function LoginForm({ 
  onLogin, 
  isLoading = false, 
  attempts = 0,
  isSignUp = false,
  onToggleMode
}: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formShake, setFormShake] = useState(false);
  
  // Shake the form when login fails
  useEffect(() => {
    if (attempts > 0) {
      setFormShake(true);
      const timer = setTimeout(() => setFormShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [attempts]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      toast.error("Missing credentials", {
        description: "Please enter both username and password."
      });
      return;
    }
    
    onLogin(username, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <motion.div 
      animate={formShake ? { x: [-10, 10, -10, 10, -5, 5, -2, 2, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username" className="flex items-center">
            <User className="h-4 w-4 mr-2 text-gold" />
            Username
          </Label>
          <div className="relative">
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
              disabled={isLoading}
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Shield className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center">
            <Lock className="h-4 w-4 mr-2 text-gold" />
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              disabled={isLoading}
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 px-3 text-muted-foreground"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-byzantine hover:bg-byzantine-dark transition-colors text-white font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Shield className="mr-2 h-4 w-4" />
                {isSignUp ? "Create Account" : "Enter the Sanctuary"}
              </span>
            )}
          </Button>
        </div>
        
        <div className="text-center">
          <Button
            type="button"
            variant="link"
            className="text-gold hover:text-gold/80"
            onClick={onToggleMode}
          >
            {isSignUp ? "Already have an account? Sign in" : "Need an account? Sign up"}
          </Button>
        </div>
        
        {attempts > 0 && (
          <div className="text-center text-sm text-byzantine animate-pulse">
            {attempts === 1 ? (
              "Invalid credentials. Please try again."
            ) : (
              `${attempts} failed login attempts. Please verify your credentials.`
            )}
          </div>
        )}
      </form>
    </motion.div>
  );
}
