
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";

// Reusable animated icon badge
function IconBadge({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-gold/40 to-byzantine/70 shadow-lg w-10 h-10 mb-0.5 text-white text-xl ${className}`}>
      {children}
    </span>
  );
}

export function ContactSidebarCards() {
  return (
    <motion.div 
      className="space-y-7"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      {/* Contact Info Card */}
      <Card className="backdrop-blur-xl glass-morphism border-gold/20 relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-gold flex items-center gap-2">
            <IconBadge><Mail className="w-6 h-6" /></IconBadge> Get In Touch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-byzantine" />
            <div>
              <p className="text-white font-medium">Phone</p>
              <p className="text-white/70">N/A (Email preferred)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-byzantine" />
            <div>
              <p className="text-white font-medium">Email</p>
              <p className="text-white/70">EthosofOrthodoxy@Gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-byzantine" />
            <div>
              <p className="text-white font-medium">Response Time</p>
              <p className="text-white/70">Within 24 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-byzantine" />
            <div>
              <p className="text-white font-medium">Community</p>
              <p className="text-white/70">Global Orthodox Network</p>
            </div>
          </div>
        </CardContent>
        <div className="pointer-events-none absolute -inset-3 z-0 hue-rotate-gold holy-glow-lg blur-sm"></div>
      </Card>
      {/* Prayer Requests */}
      <Card className="glass-morphism border-gold/30 relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-gold flex items-center gap-2">
            <IconBadge><Send className="w-5 h-5" /></IconBadge> Prayer Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 mb-3 font-medium">
            Submit your prayer intentions and our community will remember them in daily prayers.
          </p>
          <Button variant="outline" className="w-full border-gold/40 text-gold font-semibold hover:bg-gold/15 shadow-md">
            Submit Prayer Request
          </Button>
        </CardContent>
        <div className="absolute left-2 top-2 golden-glow-dot w-2 h-2 rounded-full bg-gold/80 blur-sm opacity-75"></div>
      </Card>
      {/* Spiritual Guidance */}
      <Card className="glass-morphism border-gold/30 relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-gold flex items-center gap-2">
            <IconBadge><MapPin className="w-5 h-5" /></IconBadge> Spiritual Guidance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 mb-3 font-medium">
            Seeking direction or have questions about Orthodoxy? We're here to help guide your journey.
          </p>
          <Button variant="outline" className="w-full border-gold/40 text-gold font-semibold hover:bg-gold/15 shadow-md">
            Request Guidance
          </Button>
        </CardContent>
        <div className="absolute right-2 bottom-2 golden-glow-dot w-2 h-2 rounded-full bg-gold/80 blur-sm opacity-75"></div>
      </Card>
    </motion.div>
  );
}
