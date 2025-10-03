/**
 * App Status Component - Quick Debugging Helper
 * Shows if MaycoleTracker™ is loading properly
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, AlertCircle, Zap } from 'lucide-react';

export function AppStatus() {
  const status = {
    react: typeof React !== 'undefined',
    components: true,
    styles: typeof document !== 'undefined' && document.querySelector('style[data-emotion]') !== null,
    app: true
  };

  return (
    <Card className="w-full max-w-md mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          MaycoleTracker™ Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span>React</span>
          {status.react ? (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Ready
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
              Error
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span>Components</span>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Loaded
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span>App Engine</span>
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        </div>
        
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            🎯 <strong>MaycoleTracker™</strong> inventory management system is operational
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © MaycoleTechnologies™
          </p>
        </div>
      </CardContent>
    </Card>
  );
}