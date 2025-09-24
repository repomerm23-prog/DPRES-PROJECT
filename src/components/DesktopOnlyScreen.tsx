import React from 'react';
import { Monitor, Smartphone, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface DesktopOnlyScreenProps {
  onBack: () => void;
}

export function DesktopOnlyScreen({ onBack }: DesktopOnlyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 dark:from-red-950 dark:via-orange-950 dark:to-red-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-red-200 dark:border-red-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
            <Monitor className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">Desktop Access Required</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          {/* Icon Illustration */}
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <Smartphone className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✕</span>
              </div>
            </div>
            
            <div className="text-gray-400 dark:text-gray-600 text-2xl">→</div>
            
            <div className="relative">
              <Monitor className="h-12 w-12 text-green-500" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              SDMA Admin Portal
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The admin portal is designed for desktop use only and requires a larger screen for optimal management of disaster response systems.
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">System Requirements:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 text-left">
              <li>• Desktop or laptop computer</li>
              <li>• Screen resolution: 1024px or wider</li>
              <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              <li>• Stable internet connection</li>
            </ul>
          </div>

          {/* Security Notice */}
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Security Notice:</h4>
            <p className="text-sm text-red-700 dark:text-red-300 text-left">
              Administrative functions require enhanced security measures and full-screen interface capabilities only available on desktop devices.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
            
            <div className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
              Please access this portal from a desktop computer to continue with administrative functions.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}