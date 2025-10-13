/**
 * MaycoleTracker™ vol. XI - About Page
 * Complete information about the world's first universal business management platform
 */

import React from 'react';
import { Globe, Building2, Users, TrendingUp, Shield, Zap, Info } from 'lucide-react';
import { Award, Crown, Star } from '@/lib/icons';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import UniversalBackButton from './UniversalBackButton';
import MaycoleTrackerIconButton from './MaycoleTrackerIconButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <UniversalBackButton customBackPath="/home" showHomeOption={true} />
            
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-600" />
                About MaycoleTracker™
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            WORLD'S FIRST UNIVERSAL BUSINESS MANAGEMENT PLATFORM
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionary AI-Powered
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Business Transformation
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Industry-First Technology: Complete Business Operations Platform serving Healthcare, 
            Restaurants, Construction, Retail, Manufacturing, Hospitality, Education, Automotive, 
            and Real Estate industries.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">17+</div>
            <div className="text-sm text-gray-600">Business Modules</div>
          </Card>
          <Card className="p-6 text-center border-green-200">
            <div className="text-3xl font-bold text-green-600 mb-2">9</div>
            <div className="text-sm text-gray-600">Industries Supported</div>
          </Card>
          <Card className="p-6 text-center border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Business Operations Focus</div>
          </Card>
          <Card className="p-6 text-center border-amber-200">
            <div className="text-3xl font-bold text-amber-600 mb-2">0%</div>
            <div className="text-sm text-gray-600">404 Error Rate</div>
          </Card>
        </div>

        {/* Primary Business Focus */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Primary Business Management (85% Focus)
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h3 className="text-xl font-semibold">Business Dashboard</h3>
              </div>
              <p className="text-gray-600 mb-4">Executive overview & KPI metrics with real-time business intelligence</p>
              <Badge variant="secondary">All Industries</Badge>
            </Card>

            <Card className="p-6 border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-green-600 flex items-center justify-center">💰</div>
                <h3 className="text-xl font-semibold">Financial Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Accounting, budgeting, cash flow & revenue management</p>
              <Badge variant="secondary">All Industries</Badge>
            </Card>

            <Card className="p-6 border-purple-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <h3 className="text-xl font-semibold">Customer Management</h3>
              </div>
              <p className="text-gray-600 mb-4">CRM, lead management, sales pipeline & customer relations</p>
              <Badge variant="secondary">8 Industries</Badge>
            </Card>

            <Card className="p-6 border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-8 h-8 text-indigo-600" />
                <h3 className="text-xl font-semibold">Project Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Task management, resource allocation & team collaboration</p>
              <Badge variant="secondary">4 Industries</Badge>
            </Card>

            <Card className="p-6 border-amber-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl font-semibold">Main Business Hub</h3>
              </div>
              <p className="text-gray-600 mb-4">Central operations center & business module launcher</p>
              <Badge variant="secondary">Universal</Badge>
            </Card>
          </div>
        </div>

        {/* Secondary Support Systems */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Secondary Support Systems (15% Support)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-orange-600 flex items-center justify-center">📦</div>
                <h3 className="text-xl font-semibold">Supply Chain & Inventory</h3>
              </div>
              <p className="text-gray-600 mb-4">Inventory management & supply chain operations (repositioned as secondary support)</p>
              <Badge variant="outline">Supporting Role</Badge>
            </Card>

            <Card className="p-6 border-cyan-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-cyan-600 flex items-center justify-center">📊</div>
                <h3 className="text-xl font-semibold">Business Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">Advanced analytics & business intelligence</p>
              <Badge variant="outline">All Industries</Badge>
            </Card>

            <Card className="p-6 border-pink-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-pink-600 flex items-center justify-center">📱</div>
                <h3 className="text-xl font-semibold">Business Scanner</h3>
              </div>
              <p className="text-gray-600 mb-4">Document scanning, QR codes & data capture</p>
              <Badge variant="outline">4 Industries</Badge>
            </Card>
          </div>
        </div>

        {/* Advanced System Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Advanced System Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-gray-600 flex items-center justify-center">📹</div>
                <h3 className="text-lg font-semibold">Camera System</h3>
              </div>
              <p className="text-gray-600">Image capture & visual documentation</p>
            </Card>

            <Card className="p-6 border-gold-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-yellow-600" />
                <h3 className="text-lg font-semibold">Premium Dashboard</h3>
              </div>
              <p className="text-gray-600">Advanced premium features & enterprise tools</p>
            </Card>

            <Card className="p-6 border-red-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-red-600" />
                <h3 className="text-lg font-semibold">System Recovery</h3>
              </div>
              <p className="text-gray-600">System health monitoring & recovery tools</p>
            </Card>

            <Card className="p-6 border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
                <h3 className="text-lg font-semibold">Voice Activation</h3>
              </div>
              <p className="text-gray-600">AI-powered voice commands & automation</p>
            </Card>
          </div>
        </div>

        {/* Industries Supported */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Industries Supported
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Healthcare', icon: '🏥', desc: 'Patient management, medical records' },
              { name: 'Restaurants', icon: '🍽️', desc: 'Orders, staff, suppliers' },
              { name: 'Construction', icon: '🏗️', desc: 'Project management, materials' },
              { name: 'Retail', icon: '🛍️', desc: 'Sales, customers, inventory' },
              { name: 'Manufacturing', icon: '🏭', desc: 'Production, quality control' },
              { name: 'Hospitality', icon: '🏨', desc: 'Bookings, guest services' },
              { name: 'Education', icon: '🎓', desc: 'Student management, curriculum' },
              { name: 'Automotive', icon: '🚗', desc: 'Service management, parts' },
              { name: 'Real Estate', icon: '🏘️', desc: 'Property management, clients' }
            ].map((industry, index) => (
              <Card key={index} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-2">{industry.icon}</div>
                <h3 className="font-semibold text-sm mb-2">{industry.name}</h3>
                <p className="text-xs text-gray-600">{industry.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Subscriptions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Premium Subscription Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-600">Basic business features</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Basic dashboard access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Core business modules
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Standard support
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-blue-200 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-blue-600 text-white">POPULAR</Badge>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">$89</div>
                <p className="text-gray-600">Advanced business features</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Multi-industry support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Voice activation
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-purple-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">$199</div>
                <p className="text-gray-600">Complete enterprise solution</p>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Full platform access
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Custom integrations
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  AI automation
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Technical Excellence */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Technical Excellence
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Advanced Technology Stack
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React 18+ with TypeScript</li>
                <li>• Tailwind CSS v4.0</li>
                <li>• Advanced bonding system</li>
                <li>• Component interconnection matrix</li>
                <li>• 8 AI agents with automated initialization</li>
                <li>• Cross-platform optimization</li>
                <li>• PWA-ready deployment</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                System Reliability
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Zero 404 errors guaranteed</li>
                <li>• Universal business redirection</li>
                <li>• Smart page verification system</li>
                <li>• Production-ready error handling</li>
                <li>• Complete business continuity</li>
                <li>• Advanced monitoring & recovery</li>
                <li>• 99.9% uptime reliability</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Design Leadership & Creative Vision */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Design Leadership & Creative Vision
          </h2>
          
          <Card className="p-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Antonio GM</h3>
                  <p className="text-lg text-blue-600 font-semibold">Chief Design Engineer & Creative Architect</p>
                  <Badge className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    UI/UX Design Leader
                  </Badge>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Design Philosophy</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Antonio GM brings visionary design leadership to MaycoleTracker™, architecting 
                    user experiences that seamlessly blend enterprise functionality with intuitive design. 
                    His expertise in cross-platform UI/UX design has been instrumental in creating 
                    the world's first truly universal business management platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With a deep understanding of multi-industry requirements, Antonio has crafted 
                    a design system that adapts flawlessly across healthcare, retail, manufacturing, 
                    and eight other major industries while maintaining consistent visual excellence 
                    and user accessibility.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technical Expertise</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Advanced React & TypeScript Architecture</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-gray-700">Enterprise-Grade UI Component Systems</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-gray-700">Cross-Platform Design Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">Progressive Web App (PWA) Innovation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-gray-700">Responsive & Accessible Design Systems</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                    <h5 className="font-semibold text-gray-900 mb-2">Innovation Highlights</h5>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>• Pioneered adaptive UI for 9+ industry verticals</div>
                      <div>• Designed scalable component architecture serving 17+ modules</div>
                      <div>• Created unified brand identity with kinetic logo system</div>
                      <div>• Implemented advanced voice and camera integration</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-blue-200 pt-6 mt-8">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Recognition</h4>
                  <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Antonio's design leadership has been pivotal in establishing MaycoleTracker™ as 
                    the industry-leading universal business platform. His commitment to user-centered 
                    design and technical excellence has resulted in a production-ready system trusted 
                    by enterprises across multiple industries for mission-critical business operations.
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">9+</div>
                      <div className="text-xs text-gray-600">Industries Designed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">17+</div>
                      <div className="text-xs text-gray-600">Modules Architected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">100%</div>
                      <div className="text-xs text-gray-600">Enterprise Ready</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-xs text-gray-600">Design Compromises</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MaycoleTrackerIconButton 
                size={32}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="MaycoleTracker™ vol. XI"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">MaycoleTracker™ vol. XI</h3>
                <p className="text-sm text-gray-600">Enterprise Edition</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">
              World's First Universal Business Management Platform
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Revolutionary AI-Powered Business Transformation Ecosystem
            </p>

            {/* MaycoleTechnologies™ Company Promotion */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6 border border-blue-100">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h4 className="text-lg font-bold text-gray-900">Powered by MaycoleTechnologies™</h4>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                MaycoleTracker™ is proudly developed by <strong className="text-blue-600">MaycoleTechnologies.com</strong> — 
                a cutting-edge innovation company specializing in transformative technologies across multiple industries.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 justify-center">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Robotics Engineering</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Music Innovation</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Film Technology</span>
                </div>
              </div>

              <div className="bg-white rounded-md p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">
                  🚀 <strong>Coming Soon from MaycoleTechnologies™:</strong>
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Revolutionary robotics solutions, next-generation music production tools, and cutting-edge 
                  film technology innovations. Visit <strong className="text-blue-600">maycoletechnologies.com</strong> for updates.
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-3 italic">
                "Contributing and changing the future one product at a time."
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="outline" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Production Ready
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                Multi-Industry
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Enterprise Grade
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}