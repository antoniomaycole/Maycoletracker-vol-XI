import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Building, 
  Star, 
  Clock,
  CheckCircle,
  Send,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { ProfessionalFooter } from './ProfessionalFooter';

interface ContactSupportProps {
  onNavigate: (screen: string) => void;
}

export function ContactSupport({ onNavigate }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    serviceType: 'general'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create professional email with form data
    const subject = `${formData.serviceType === 'enterprise' ? 'Enterprise Setup Services' : 
                     formData.serviceType === 'professional' ? 'Professional Setup Services' :
                     formData.serviceType === 'fortune500' ? 'Fortune 500 Implementation' :
                     'General Inquiry'} - MaycoleTracker`;
    
    const body = `Hi MaycoleTechnologies team,

${formData.message}

Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Service Interest: ${formData.serviceType === 'enterprise' ? 'Enterprise Setup ($3,500-$7,500)' :
                   formData.serviceType === 'professional' ? 'Professional Setup ($750-$2,500)' :
                   formData.serviceType === 'fortune500' ? 'Fortune 500 Complete Setup ($15,000-$25,000)' :
                   'General Support'}

Best regards,
${formData.name}`;

    const mailtoLink = `mailto:sales@maycoletechnologies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building className="w-8 h-8 text-primary" />
            <h1 className="text-primary">Contact MaycoleTechnologies™</h1>
          </div>
          <p className="text-muted-foreground mb-2">Professional Setup Services & Enterprise Support</p>
          <p className="text-sm text-muted-foreground">
            Trusted by Fortune 500 companies worldwide • Available 24/7 • Enterprise-grade support
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Quick Contact
                </CardTitle>
                <CardDescription>Get immediate assistance from our team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <a 
                    href="mailto:sales@maycoletechnologies.com"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Sales & Setup Services</div>
                      <div className="text-sm text-muted-foreground">sales@maycoletechnologies.com</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  
                  <a 
                    href="mailto:support@maycoletechnologies.com"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Technical Support</div>
                      <div className="text-sm text-muted-foreground">support@maycoletechnologies.com</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                  
                  <a 
                    href="tel:+1-213-312-7814"
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Sales & Enterprise</div>
                      <div className="text-sm text-muted-foreground">(213) 312-7814</div>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Service Packages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Setup Services
                </CardTitle>
                <CardDescription>Professional implementation packages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Fortune 500</div>
                      <Badge variant="secondary">Premium</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">$15,000 - $25,000</div>
                    <div className="text-sm text-muted-foreground">Complete enterprise setup & training</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Enterprise</div>
                      <Badge variant="outline">Popular</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">$3,500 - $7,500</div>
                    <div className="text-sm text-muted-foreground">Multi-location deployment</div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Professional</div>
                      <Badge variant="outline">Starter</Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">$750 - $2,500</div>
                    <div className="text-sm text-muted-foreground">Single business setup</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enterprise Clients</span>
                  <Badge variant="secondary">4-8 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Professional Clients</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">General Inquiries</span>
                  <Badge variant="outline">48-72 hours</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Tell us about your business needs and we'll get back to you with a customized solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">Company Name</label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="serviceType" className="text-sm font-medium">Service Interest</label>
                    <select
                      id="serviceType"
                      className="w-full p-3 border border-input bg-background rounded-md"
                      value={formData.serviceType}
                      onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="professional">Professional Setup ($750-$2,500)</option>
                      <option value="enterprise">Enterprise Setup ($3,500-$7,500)</option>
                      <option value="fortune500">Fortune 500 Implementation ($15,000-$25,000)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message *</label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your business, inventory needs, number of locations, team size, and any specific requirements..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="flex-1" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.location.href = 'tel:+1-213-312-7814'}
                      size="lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call (213) 312-7814
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Why Choose MaycoleTechnologies™?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Fortune 500 Trusted</div>
                        <div className="text-sm text-muted-foreground">Proven track record with enterprise clients</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Multi-Industry Expertise</div>
                        <div className="text-sm text-muted-foreground">Experience across 50+ business types</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Complete Implementation</div>
                        <div className="text-sm text-muted-foreground">From setup to training to ongoing support</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Dedicated Project Management</div>
                        <div className="text-sm text-muted-foreground">Personal attention throughout the process</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Data Migration Included</div>
                        <div className="text-sm text-muted-foreground">Seamless transition from existing systems</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">24/7 Enterprise Support</div>
                        <div className="text-sm text-muted-foreground">Round-the-clock assistance when you need it</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Professional Footer */}
        <ProfessionalFooter />

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={() => onNavigate('dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}