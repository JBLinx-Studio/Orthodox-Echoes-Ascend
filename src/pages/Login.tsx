
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { GoogleAuth } from '@/components/auth/GoogleAuth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Login | Orthodox Echoes";

    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        toast.success(`Welcome back!`, {
          description: "You've successfully signed in."
        });
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username: username,
          }
        }
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.user) {
        toast.success(`Welcome, ${username}!`, {
          description: "Please check your email to confirm your account."
        });
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      {/* Enhanced Cathedral Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 rounded-full bg-gold/8 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" style={{animationDelay: "0.7s"}}></div>
        <div className="absolute bottom-40 right-1/3 w-3 h-3 bg-gold/70 rounded-full animate-[candle-flicker_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/60 rounded-full animate-[candle-flicker_3s_ease-in-out_infinite]" style={{animationDelay: "0.5s"}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-gold/60 rounded-full animate-[candle-flicker_5s_ease-in-out_infinite]" style={{animationDelay: "1.2s"}}></div>
        <div className="absolute top-60 left-20 w-20 h-20 rounded-full bg-byzantine/10 blur-xl animate-[pulse_7s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-80 right-40 w-24 h-24 rounded-full bg-byzantine/10 blur-xl animate-[pulse_9s_ease-in-out_infinite]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-[#1A1F2C]/90 backdrop-blur-md border border-gold/20 rounded-lg p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="orthodox-heading text-3xl font-bold text-gold text-center mb-2">
              Welcome to Orthodox Echoes
            </h2>
            <p className="text-white/70 text-center">
              Sign in or create an account to continue your spiritual journey.
            </p>
          </div>

          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-[#0a0d16]/50">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signInEmail">Email</Label>
                  <Input
                    type="email"
                    id="signInEmail"
                    placeholder="Enter your email"
                    className="bg-[#1A1F2C]/70 border-gold/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signInPassword">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="signInPassword"
                      placeholder="Enter your password"
                      className="bg-[#1A1F2C]/70 border-gold/30 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-byzantine hover:bg-byzantine-dark"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gold/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1A1F2C] px-2 text-white/60">Or continue with</span>
                </div>
              </div>

              <GoogleAuth variant="signin" onSuccess={() => navigate('/')} />
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signUpUsername">Username</Label>
                  <Input
                    type="text"
                    id="signUpUsername"
                    placeholder="Choose a username"
                    className="bg-[#1A1F2C]/70 border-gold/30"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signUpEmail">Email</Label>
                  <Input
                    type="email"
                    id="signUpEmail"
                    placeholder="Enter your email"
                    className="bg-[#1A1F2C]/70 border-gold/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signUpPassword">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      id="signUpPassword"
                      placeholder="Enter your password"
                      className="bg-[#1A1F2C]/70 border-gold/30 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      className="bg-[#1A1F2C]/70 border-gold/30 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-byzantine hover:bg-byzantine-dark"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gold/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1A1F2C] px-2 text-white/60">Or continue with</span>
                </div>
              </div>

              <GoogleAuth variant="signup" onSuccess={() => navigate('/')} />
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gold hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
