
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Callback() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [status, setStatus] = useState('Processing authentication...');
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
          toast.error('Authentication failed. Please try again.');
          navigate('/login');
          return;
        }

        if (!code) {
          console.error('No authorization code received');
          toast.error('Authentication failed. No authorization code received.');
          navigate('/login');
          return;
        }

        console.log('Processing Google OAuth callback with code:', code);
        setStatus('Exchanging authorization code...');
        
        // Parse the state parameter
        let parsedState;
        try {
          parsedState = state ? JSON.parse(atob(state)) : { variant: 'signin' };
        } catch {
          parsedState = { variant: 'signin' };
        }

        // Exchange the authorization code for tokens
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: '1019903498866-5q0lubbt5hasule4duhh6tcmq1d6emm6.apps.googleusercontent.com',
            client_secret: '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',
            code,
            grant_type: 'authorization_code',
            redirect_uri: 'https://jblinx-studio.github.io/Orthodox-Echoes-Ascend/callback',
          }),
        });

        const tokenData = await tokenResponse.json();
        
        if (tokenData.error) {
          console.error('Token exchange error:', tokenData.error);
          toast.error('Authentication failed during token exchange.');
          navigate('/login');
          return;
        }

        setStatus('Getting user information...');

        // Get user info from Google
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        const userInfo = await userResponse.json();
        console.log('Google user info:', userInfo);

        setStatus('Creating account...');

        // Create a secure password for the user
        const securePassword = btoa(userInfo.id + userInfo.email + Date.now()).substring(0, 32);

        try {
          if (parsedState.variant === 'signup') {
            // For signup, create a new user
            const { data, error } = await supabase.auth.signUp({
              email: userInfo.email,
              password: securePassword,
              options: {
                data: {
                  full_name: userInfo.name,
                  avatar_url: userInfo.picture,
                  google_id: userInfo.id,
                  provider: 'google',
                },
                emailRedirectTo: `${window.location.origin}/`
              }
            });

            if (error) {
              if (error.message.includes('already registered')) {
                // User already exists, try to sign them in instead
                setStatus('Account exists, signing in...');
                const { error: signInError } = await supabase.auth.signInWithPassword({
                  email: userInfo.email,
                  password: securePassword,
                });

                if (signInError) {
                  // Password doesn't match, user probably signed up differently
                  toast.error('This email is already registered. Please sign in using your original method.');
                  navigate('/login');
                  return;
                }
              } else {
                console.error('Supabase signup error:', error);
                toast.error('Failed to create account. Please try again.');
                navigate('/login');
                return;
              }
            }

            toast.success('Account created successfully!');
          } else {
            // For signin, attempt to sign in
            const { data, error } = await supabase.auth.signInWithPassword({
              email: userInfo.email,
              password: securePassword,
            });

            if (error) {
              // If sign in fails, the user might not exist yet
              console.log('Sign in failed, creating new account...');
              setStatus('Creating new account...');
              
              const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: userInfo.email,
                password: securePassword,
                options: {
                  data: {
                    full_name: userInfo.name,
                    avatar_url: userInfo.picture,
                    google_id: userInfo.id,
                    provider: 'google',
                  },
                  emailRedirectTo: `${window.location.origin}/`
                }
              });

              if (signUpError) {
                console.error('Supabase signup error:', signUpError);
                toast.error('Failed to create account. Please try again.');
                navigate('/login');
                return;
              }

              toast.success('Account created successfully!');
            } else {
              toast.success('Successfully signed in!');
            }
          }

          setStatus('Redirecting...');
          
          // Small delay to show the success message
          setTimeout(() => {
            navigate('/');
          }, 1500);

        } catch (supabaseError) {
          console.error('Supabase error:', supabaseError);
          toast.error('Authentication service error. Please try again.');
          navigate('/login');
        }
        
      } catch (error) {
        console.error('Callback processing error:', error);
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0d16] to-[#161a26] flex items-center justify-center p-4">
      <div className="text-center">
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
        
        <h1 className="text-gold font-display text-4xl mb-4">
          {isProcessing ? 'Authenticating with Google' : 'Authentication Complete'}
        </h1>
        <p className="text-white/70 text-lg mb-4">
          {status}
        </p>
        
        {isProcessing && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-3 h-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
