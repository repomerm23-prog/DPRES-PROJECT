import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  BarChart3,
  Building2,
  Bell,
  FileText,
  Settings,
  LogOut,
  Menu,
  Mail,
  Activity,
  Award,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { schools, colleges, allInstitutions } from './shared/institutionsData';
import { useAlerts } from './shared/AlertContext';
import { DashboardOverview } from './admin/DashboardOverview';
import { InstitutionsTable } from './admin/InstitutionsTable';
import { ReportsAnalytics } from './admin/ReportsAnalytics';
import { EmergencyAlertsManager } from './admin/EmergencyAlertsManager';
import { AdminSettings } from './admin/AdminSettings';
import { CertificateManager } from './CertificateManager';
import { SMSIVRManager } from './SMSIVRManager';

interface AdminDashboardProps {
  adminData?: {
    email: string;
    password: string;
    displayName?: string;
  } | null;
  onLogout: () => void;
}

export function AdminDashboard({ adminData, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : systemDark;
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('admin-theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Navigation handler for quick actions
  const handleNavigation = (section: string) => {
    const sectionMap: { [key: string]: string } = {
      'emergency-alerts': 'alerts',
      'sms-ivr': 'communications',
      'institutions': 'institutions',
      'reports': 'reports'
    };
    
    const targetTab = sectionMap[section];
    if (targetTab) {
      setActiveTab(targetTab);
    }
  };

  const { getActiveAlerts } = useAlerts();
  const activeAlerts = getActiveAlerts();

  // Calculate real stats from enrolled institutions
  const overviewStats = {
    totalSchools: schools.length,
    totalColleges: colleges.length,
    totalStudents: allInstitutions.reduce((sum, inst) => sum + inst.students, 0),
    avgCompletion: Math.round(allInstitutions.reduce((sum, inst) => sum + inst.avgProgress, 0) / allInstitutions.length),
    activeSosAlerts: activeAlerts.length
  };

  // Navigation component for both mobile and desktop
  const NavigationContent = ({ mobile = false }) => (
    <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
      <TabsList className={`grid w-full ${mobile ? 'grid-cols-1' : 'grid-rows-7'} h-auto gap-1 bg-gray-50 dark:bg-gray-700/50 p-1`}>
        <TabsTrigger 
          value="overview" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger 
          value="institutions" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <Building2 className="h-4 w-4 mr-2" />
          Institutions
        </TabsTrigger>
        <TabsTrigger 
          value="certificates" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <Award className="h-4 w-4 mr-2" />
          Certificates
        </TabsTrigger>
        <TabsTrigger 
          value="communications" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          SMS/IVR
        </TabsTrigger>
        <TabsTrigger 
          value="alerts" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <Bell className="h-4 w-4 mr-2" />
          Emergency Alerts  
        </TabsTrigger>
        <TabsTrigger 
          value="reports" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <FileText className="h-4 w-4 mr-2" />
          Reports & Analytics
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          className="justify-start text-gray-600 dark:text-gray-300 data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600" 
          onClick={() => mobile && setSidebarOpen(false)}
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-40 shadow-sm">
        <div className="px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 lg:space-x-4">
              {/* Mobile menu trigger */}
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <div className="mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h2 className="font-bold text-gray-900 dark:text-gray-100">SDMA Admin</h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {adminData?.displayName ? `Welcome, ${adminData.displayName}` : 'Admin Portal'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <NavigationContent mobile={true} />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">SDMA Admin Portal</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">State Disaster Management Authority</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {adminData?.displayName && (
                <div className="hidden md:flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <span className="truncate max-w-32 font-medium">{adminData.displayName}</span>
                  </div>
                </div>
              )}
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-700">
                <Activity className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Online</span>
                <span className="sm:hidden">{adminData?.displayName || 'Online'}</span>
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 lg:mr-1" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-screen sticky top-[73px]">
          <div className="p-4">
            <NavigationContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-6 max-w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="overview">
              <DashboardOverview overviewStats={overviewStats} onNavigation={handleNavigation} />
            </TabsContent>

            <TabsContent value="institutions">
              <InstitutionsTable />
            </TabsContent>

            <TabsContent value="certificates">
              <CertificateManager />
            </TabsContent>

            <TabsContent value="communications">
              <SMSIVRManager />
            </TabsContent>

            <TabsContent value="alerts" className="space-y-4 lg:space-y-6">
              <EmergencyAlertsManager />
            </TabsContent>

            <TabsContent value="reports">
              <ReportsAnalytics />
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 lg:space-y-6">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}