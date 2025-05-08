
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Shield, AlertCircle, User } from 'lucide-react';
import { LoginForm } from '@/components/admin/LoginForm';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { isAuthenticated, login, checkPassword, registerUser } from '@/utils/auth-utils';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = (username: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (isSignUp) {
        // Handle sign up
        registerUser(username, password);
        toast.success(`Welcome, ${username}!`, {
          description: "Your account has been created successfully.",
          icon: <User className="h-5 w-5 text-byzantine" />
        });
        navigate('/');
      } else {
        // Handle login - check if admin
        if (username.toLowerCase() === 'admin' && checkPassword(password)) {
          login(username, true); // login as admin
          
          toast.success(`Welcome, ${username}!`, {
            description: "You have entered the sanctuary admin area.",
            icon: <Shield className="h-5 w-5 text-byzantine" />
          });
          
          navigate('/admin');
        } else if (checkUserCredentials(username, password)) {
          // Regular user login
          login(username, false);
          
          toast.success(`Welcome back, ${username}!`, {
            description: "You have successfully logged in.",
            icon: <User className="h-5 w-5 text-byzantine" />
          });
          
          navigate('/');
        } else {
          setLoginAttempts(prev => prev + 1);
          
          toast.error("Authentication failed", {
            description: "Invalid credentials.",
            icon: <AlertCircle className="h-5 w-5 text-red-500" />
          });
          
          // After 3 failed attempts, add a delay
          if (loginAttempts >= 2) {
            toast.warning("Too many failed attempts", {
              description: "Please wait a moment before trying again.",
              duration: 5000
            });
          }
        }
      }
      setIsLoading(false);
    }, 1200);
  };

  // Check if user exists and password matches
  const checkUserCredentials = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('orthodoxEchoesUsers') || '{}');
    return users[username] && users[username].password === password;
  };
  
  const toggleSignUpMode = () => {
    setIsSignUp(!isSignUp);
    setLoginAttempts(0);
  };
  
  const handleContinueAsGuest = () => {
    toast.info("Continuing as guest", {
      description: "You can sign up or login anytime.",
      icon: <User className="h-5 w-5 text-gold" />
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0c111f] to-[#1A1F2C]">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 20h40M20 0v40" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        {/* Enhanced candle glow effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-byzantine/20 rounded-full filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-gold/10 rounded-full filter blur-[60px] opacity-30"></div>
        
        {/* Cathedral light rays */}
        <div className="absolute top-0 left-1/3 w-20 h-screen bg-gold/3 -rotate-6 animate-pulse" style={{animationDuration: "12s"}}></div>
        <div className="absolute top-0 right-1/4 w-32 h-screen bg-gold/2 rotate-12 animate-pulse" style={{animationDuration: "15s"}}></div>
      </div>
      
      <Container>
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative flex items-center justify-center w-16 h-16">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-byzantine to-byzantine-dark opacity-80"></span>
                <span className="relative text-white font-display font-bold text-3xl">Ω</span>
                <span className="absolute inset-0 rounded-full bg-gold/20 animate-pulse"></span>
              </div>
            </div>
            <h1 className="text-2xl font-display text-gold">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </h1>
            <p className="text-white/70 mt-2">
              {isSignUp 
                ? "Join our community and explore the Orthodox faith"
                : "Enter your credentials to access the sanctuary"
              }
            </p>
          </div>
          
          <div className="backdrop-blur-lg bg-[#1A1F2C]/80 border border-gold/20 shadow-xl rounded-lg">
            <div className="p-6">
              <LoginForm 
                onLogin={handleLogin} 
                isLoading={isLoading} 
                attempts={loginAttempts}
                isSignUp={isSignUp}
                onToggleMode={toggleSignUpMode}
              />
              
              <div className="mt-6 pt-4 border-t border-gold/10">
                <div className="flex justify-center mb-4">
                  <Button
                    variant="ghost"
                    className="text-white/60 hover:text-gold"
                    onClick={handleContinueAsGuest}
                  >
                    Continue as Guest
                  </Button>
                </div>
                <p className="text-white/50 text-xs text-center">
                  Protected area of Orthodox Echoes. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-white/60 text-sm hover:text-gold transition-colors"
            >
              Return to Sanctuary
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
