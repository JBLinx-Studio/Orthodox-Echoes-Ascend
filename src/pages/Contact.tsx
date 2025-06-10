
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-b from-[#0c111f] via-[#1A1F2C] to-[#0c111f] py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="orthodox-heading text-5xl md:text-6xl font-bold text-gold mb-6">Contact Us</h1>
          <div className="w-24 h-1 bg-byzantine mx-auto mb-6"></div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We welcome your questions, prayers requests, and spiritual inquiries. 
            Reach out to our Orthodox community and let us walk together in faith.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-[#1A1F2C]/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-2xl text-gold flex items-center">
                  <Send className="mr-3 h-6 w-6" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-[#0c111f]/50 border-gold/30 text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-[#0c111f]/50 border-gold/30 text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-[#0c111f]/50 border-gold/30 text-white"
                      placeholder="Prayer request, question, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-[#0c111f]/50 border-gold/30 text-white"
                      placeholder="Share your thoughts, questions, or prayer requests..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-byzantine hover:bg-byzantine-dark text-white"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-[#1A1F2C]/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-gold">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-byzantine" />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-white/70">EthosofOrthodoxy@Gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-byzantine" />
                  <div>
                    <p className="text-white font-medium">Response Time</p>
                    <p className="text-white/70">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-byzantine" />
                  <div>
                    <p className="text-white font-medium">Community</p>
                    <p className="text-white/70">Global Orthodox Network</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1F2C]/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-gold">Prayer Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Submit your prayer requests and our community will pray for your intentions during our daily prayers.
                </p>
                <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10">
                  Submit Prayer Request
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1F2C]/80 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-xl text-gold">Spiritual Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4">
                  Seeking spiritual direction or have questions about Orthodox Christianity? We're here to help guide your journey.
                </p>
                <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10">
                  Request Guidance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
