import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { CathedralHeader } from "@/components/contact/CathedralHeader";
import { ContactSidebarCards } from "@/components/contact/ContactSidebarCards";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Message sent successfully!", {
      description: "We'll get back to you within 24 hours."
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c111f] via-[#1A1F2C] to-[#0c111f] py-24 relative overflow-hidden">
      {/* Subtle glowing cathedral cross backdrop */}
      <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-0">
        <span
          className="text-gold/10 text-[17rem] md:text-[21rem] font-display font-bold drop-shadow-glow animate-pulse select-none"
          style={{ filter: "blur(2px)", lineHeight: 1 }}
        >
          ☦
        </span>
      </div>
      {/* Decorative holy light gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 top-0 w-[800px] h-[180px] -translate-x-1/2 bg-gradient-to-b from-gold/25 via-transparent to-transparent blur-2xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Cathedral Style Header */}
        <CathedralHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto pt-2">
          {/* Contact Form */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.17 }}
              className="flex-1 flex flex-col justify-center"
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-7 bg-[#202538]/80 rounded-2xl byzantine-border shadow-2xl relative overflow-hidden border border-gold/25 px-6 py-9 md:p-12"
              >
                <div className="absolute -right-10 bottom-2 opacity-10 pointer-events-none select-none">
                  <span className="text-gold/50 text-8xl animate-spin-slow">✦</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gold/80 mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-[#12151e]/80 border-gold/30 text-white focus:ring-gold/70"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gold/80 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#12151e]/80 border-gold/30 text-white focus:ring-gold/70"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gold/80 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-[#12151e]/80 border-gold/30 text-white focus:ring-gold/70"
                    placeholder="Prayer request, question, etc."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gold/80 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#12151e]/80 border-gold/30 text-white focus:ring-gold/70"
                    placeholder="Share your thoughts, questions, or prayer requests..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-byzantine to-gold/80 hover:from-byzantine-dark hover:to-gold/90 text-white text-lg rounded-xl font-bold shadow-xl transition-all duration-300 ring-2 ring-gold/20"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
          {/* Sidebar: Contact info, prayer card, guidance */}
          <ContactSidebarCards />
        </div>
      </div>
    </div>
  );
};

export default Contact;
