
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Callback() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Processing authentication...');
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          console.error('Google OAuth error:', error);
          setStatusMessage('Authentication was cancelled or failed');
          toast.error('Authentication failed', {
            description: 'Please try again.'
          });
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          setStatusMessage('No authorization code received');
          toast.error('Authentication failed', {
            description: 'No authorization code received.'
          });
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        setStatusMessage('Exchanging authorization code...');
        console.log('Processing Google OAuth callback with code:', code);
        
        // Parse state to determine signin/signup
        let variant = 'signin';
        try {
          if (state) {
            const parsedState = JSON.parse(atob(state));
            variant = parsedState.variant || 'signin';
          }
        } catch (e) {
          console.warn('Could not parse state parameter, defaulting to signin');
        }

        // Exchange the authorization code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '472513945629-2qed7qvfb4kn3njilhru2d2djqdm9e6n.apps.googleusercontent.com',
            client_secret: 'GOCSPX-your-client-secret-here', // You'll need to add your actual client secret
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://jblinx-studio.github.io/Orthodox-Echoes-Ascend/callback',
          }),
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
          console.error('Token exchange error:', tokenData.error);
          setStatusMessage('Token exchange failed');
          toast.error('Authentication failed', {
            description: 'Could not exchange authorization code for tokens.'
          });
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        setStatusMessage('Getting user information...');

        // Get user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        const userInfo = await userResponse.json();
        console.log('Google user info:', userInfo);

        setStatusMessage('Creating your account...');

        // Check if user already exists
        const { data: existingUser } = await supabase.auth.admin.getUserById(userInfo.id);
        
        if (variant === 'signup' || !existingUser) {
          // For signup or new users, create account
          const { data, error } = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.id + '_google_auth', // Use Google ID as password base
            options: {
              data: {
                full_name: userInfo.name,
                avatar_url: userInfo.picture,
                google_id: userInfo.id,
                provider: 'google'
              }
            }
          });

          if (error) {
            console.error('Supabase signup error:', error);
            setStatusMessage('Account creation failed');
            toast.error('Failed to create account', {
              description: error.message
            });
            setTimeout(() => navigate('/login'), 2000);
            return;
          }

          setStatusMessage('Account created successfully!');
          toast.success('Welcome to Orthodox Echoes!', {
            description: 'Your account has been created successfully.'
          });
        } else {
          // For existing users, sign them in
          const { data, error } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.id + '_google_auth',
          });

          if (error) {
            console.error('Supabase signin error:', error);
            setStatusMessage('Sign in failed');
            toast.error('Failed to sign in', {
              description: 'Please try creating an account first.'
            });
            setTimeout(() => navigate('/login'), 2000);
            return;
          }

          setStatusMessage('Successfully signed in!');
          toast.success('Welcome back!', {
            description: 'You have been successfully signed in.'
          });
        }

        // Redirect to home after a brief delay
        setTimeout(() => {
          navigate('/');
          if (onSuccess) onSuccess();
        }, 1500);
        
      } catch (error) {
        console.error('Callback processing error:', error);
        setStatusMessage('Authentication failed');
        toast.error('Authentication failed', {
          description: 'An unexpected error occurred. Please try again.'
        });
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/noise-pattern.png')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-transparent"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
        
        {/* Animated background orbs */}
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-1/3 w-48 h-48 rounded-full bg-byzantine/5 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute top-1/3 left-1/2 w-36 h-36 rounded-full bg-gold/8 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" style={{ animationDelay: "0.7s" }}></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto">
        <div className="mb-8 relative">
          <div className="w-32 h-32 relative flex items-center justify-center mx-auto">
            <div className="absolute w-32 h-32">
              <div className="absolute inset-0 rounded-full border-2 border-gold/30 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-byzantine/40 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
            </div>
            
            <svg className="w-16 h-16 text-gold relative z-10" viewBox="0 0 32 32" fill="currentColor">
              <g transform="translate(16,16)">
                <rect x="-2" y="-12" width="4" height="24" rx="1"/>
                <rect x="-8" y="-6" width="16" height="4" rx="1"/>
                <rect x="-6" y="4" width="12" height="3" rx="1"/>
                <circle cx="0" cy="-10" r="2" fill="#B8860B"/>
                <path d="M-1,-8 L1,-8 L1,-6 L-1,-6 Z" fill="#B8860B"/>
              </g>
            </svg>
          </div>
          <div className="absolute inset-0 rounded-full bg-gold/10 blur-xl animate-pulse"></div>
        </div>
        
        <h1 className="text-gold font-display text-4xl mb-4 animate-fade-in">
          {isProcessing ? 'Authenticating...' : 'Authentication Complete'}
        </h1>
        
        <div className="bg-[#1A1F2C]/80 backdrop-blur-sm border border-gold/20 rounded-lg p-6 mb-6">
          <p className="text-white/80 text-lg mb-2">{statusMessage}</p>
          
          {isProcessing && (
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
        
        <p className="text-white/60 text-sm">
          {isProcessing ? 'Please wait while we complete your authentication.' : 'Redirecting you now...'}
        </p>
      </div>
    </div>
  );
}
