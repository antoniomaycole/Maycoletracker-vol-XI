import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Award, Globe, Users } from 'lucide-react';
import { FooterMaycoleMethodBranding } from './MaycoleMethodBranding';

export function ProfessionalFooter() {
  return (
    <Card className="mt-8 border-t-2 border-primary/20">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <Shield className="w-6 h-6 mx-auto text-green-600" />
            <div className="text-sm font-medium">99.9% Uptime</div>
            <div className="text-xs text-muted-foreground">Enterprise reliability</div>
          </div>
          
          <div className="space-y-2">
            <Users className="w-6 h-6 mx-auto text-blue-600" />
            <div className="text-sm font-medium">10,000+ Businesses</div>
            <div className="text-xs text-muted-foreground">Worldwide trust</div>
          </div>
          
          <div className="space-y-2">
            <Award className="w-6 h-6 mx-auto text-amber-600" />
            <div className="text-sm font-medium">ISO 27001 Certified</div>
            <div className="text-xs text-muted-foreground">Security compliant</div>
          </div>
          
          <div className="space-y-2">
            <Globe className="w-6 h-6 mx-auto text-purple-600" />
            <div className="text-sm font-medium">Global Coverage</div>
            <div className="text-xs text-muted-foreground">Multi-region support</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>© 2024 MaycoleTechnologies™</span>
              <Badge variant="outline" className="text-xs">Enterprise Grade</Badge>
            </div>
            
            {/* MAYCOLE Method Branding */}
            <FooterMaycoleMethodBranding />
          </div>
          
          {/* Professional Contact Information */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">
              Get Professional Setup Services
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
              <a 
                href="mailto:sales@maycoletechnologies.com" 
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
              >
                📧 sales@maycoletechnologies.com
              </a>
              <a 
                href="mailto:support@maycoletechnologies.com" 
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
              >
                🎧 support@maycoletechnologies.com
              </a>
              <a 
                href="tel:+1-213-312-7814" 
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
              >
                📞 (213) 312-7814
              </a>
            </div>
            <div className="text-xs text-muted-foreground">
              Fortune 500 Setup: $15,000-$25,000 • Enterprise: $3,500-$7,500 • Professional: $750-$2,500
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Trusted by Fortune 500 companies • SOC 2 Type II Compliant • 24/7 Support
          </div>
        </div>
      </div>
    </Card>
  );
}