import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { EmergencySOS } from './EmergencySOS';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Shield, 
  Clock,
  Users,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Award,
  Target,
  X
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useAlerts } from './shared/AlertContext';
import { getInstitutionById } from './shared/institutionsData';

interface DashboardProps {
  userData?: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  } | null;
}

export function Dashboard({ userData }: DashboardProps) {
  const { t } = useLanguage();
  const { addAlert } = useAlerts();
  
  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: t('dashboard.alerts.heavyRainfall'),
      description: t('dashboard.alerts.rainfallDesc'),
      time: t('dashboard.alerts.timeAgo2h'),
      region: t('dashboard.alerts.chennaiDistrict')
    },
    {
      id: 2,
      type: 'warning',
      title: t('dashboard.alerts.earthquakeTremors'),
      description: t('dashboard.alerts.seismicDesc'),
      time: t('dashboard.alerts.timeAgo6h'),
      region: t('TamilNadu Region')
    }
  ]);

  // Student's learning progress data
  const [studentProgress] = useState({
    overallProgress: 72,
    modulesCompleted: 4,
    totalModules: 6,
    vrTrainingsCompleted: 2,
    totalVrTrainings: 3,
    latestQuizScore: 85
  });

  // Modal and panel states
  const [contactsSheetOpen, setContactsSheetOpen] = useState(false);
  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const [incidentSubmitted, setIncidentSubmitted] = useState(false);

  // Incident form state
  const [incidentForm, setIncidentForm] = useState({
    type: '',
    location: '',
    description: ''
  });

  // Emergency contacts data
  const emergencyContacts = [
    { name: t('dashboard.emergencyContacts.fire'), number: '101', icon: '🔥' },
    { name: t('dashboard.emergencyContacts.police'), number: '100', icon: '👮' },
    { name: t('dashboard.emergencyContacts.medical'), number: '108', icon: '🚑' },
    { name: t('dashboard.emergencyContacts.disaster'), number: '1070', icon: '🌊' }
  ];

  const handleSosConfirm = () => {
    // Find the institution details
    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData) {
      // Add real SOS alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: 'General Emergency',
        status: 'active',
        location: 'Student Dashboard',
        severity: 'high',
        description: `Emergency SOS alert triggered by student ${userData.studentName}`,
        coordinates: institution.coordinates
      });
    }
    
    setSosConfirmed(true);
    // Reset after 3 seconds
    setTimeout(() => setSosConfirmed(false), 3000);
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the institution details
    const institution = getInstitutionById(userData?.schoolCode || '');
    
    if (institution && userData && incidentForm.type && incidentForm.location && incidentForm.description) {
      // Map incident types to alert types
      const alertTypeMap: Record<string, any> = {
        'fire': 'Fire Alert',
        'earthquake': 'Earthquake Alert',
        'medical': 'Medical Emergency',
        'other': 'General Emergency'
      };
      
      // Add incident report as alert to AlertContext
      addAlert({
        institution: institution.name,
        institutionId: institution.id,
        district: institution.district,
        state: institution.state,
        studentName: userData.studentName,
        type: alertTypeMap[incidentForm.type] || 'General Emergency',
        status: 'pending',
        location: incidentForm.location,
        severity: incidentForm.type === 'fire' || incidentForm.type === 'medical' ? 'high' : 'medium',
        description: incidentForm.description,
        coordinates: institution.coordinates
      });
    }
    
    setIncidentSubmitted(true);
    setIncidentModalOpen(false);
    setIncidentForm({ type: '', location: '', description: '' });
    // Reset after 3 seconds
    setTimeout(() => setIncidentSubmitted(false), 3000);
  };

  const handleCall = (number: string) => {
    // In a real app, this would trigger the device's call functionality
    window.open(`tel:${number}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 break-words">{t('dashboard.welcome')}</h1>
          <p className="text-gray-600 dark:text-gray-400 break-words">{t('dashboard.overview')}</p>
        </div>

        {/* Emergency Tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <EmergencySOS onConfirm={handleSosConfirm} variant="dashboard">
            <Button 
              className="h-16 sm:h-20 bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg w-full"
            >
              <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="font-semibold text-sm sm:text-base">{t('landing.sos')}</span>
            </Button>
          </EmergencySOS>
          
          <Button 
            onClick={() => setContactsSheetOpen(true)}
            variant="outline" 
            className="h-16 sm:h-20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg"
          >
            <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="font-semibold text-sm sm:text-base">{t('landing.contacts')}</span>
          </Button>
          
          <Button 
            onClick={() => setIncidentModalOpen(true)}
            variant="outline" 
            className="h-16 sm:h-20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 shadow-lg"
          >
            <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
            <span className="font-semibold text-sm sm:text-base">{t('landing.report')}</span>
          </Button>
        </div>

        {/* Success Messages */}
        {sosConfirmed && (
          <div className="mb-8">
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                ✅ {t('dashboard.sos.success')}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {incidentSubmitted && (
          <div className="mb-8">
            <Alert className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200 font-medium">
                ✅ {t('dashboard.incident.success')}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Alerts */}
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-card-foreground dark:text-card-foreground">
                  <AlertTriangle className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                  <span className="break-words">{t('dashboard.alerts.title')}</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground dark:text-muted-foreground break-words">
                  {t('dashboard.alerts.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} className={alert.type === 'warning' ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20' : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'}>
                    <div className="flex items-start space-x-3">
                      {alert.type === 'warning' ? (
                        <AlertCircle className="h-5 w-5 text-orange-500 dark:text-orange-400 mt-0.5" />
                      ) : (
                        <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-foreground dark:text-foreground break-words">{alert.title}</h4>
                          <Badge variant="outline" className="text-xs text-[12px]">
                            <MapPin className="h-3 w-3 mr-1" />
                            {alert.region}
                          </Badge>
                        </div>
                        <AlertDescription className="text-sm text-muted-foreground dark:text-muted-foreground break-words">{alert.description}</AlertDescription>
                        <div className="flex items-center text-xs text-muted-foreground dark:text-muted-foreground mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quickAccess.title')}</CardTitle>
                <CardDescription>{t('dashboard.quickAccess.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Shield className="h-6 w-6" />
                    <span>{t('dashboard.quickAccess.safetyProtocols')}</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <MapPin className="h-6 w-6" />
                    <span>{t('dashboard.quickAccess.evacuationRoutes')}</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <Users className="h-6 w-6" />
                    <span>{t('dashboard.quickAccess.emergencyDirectory')}</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>{t('dashboard.quickAccess.incidentReports')}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Student's Learning Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span>{t('dashboard.learningProgress')}</span>
                </CardTitle>
                <CardDescription>{t('dashboard.progressDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{studentProgress.overallProgress}%</div>
                  <Progress value={studentProgress.overallProgress} className="w-full" />
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {t('dashboard.modulesCompleted')}
                    </span>
                    <span className="text-green-600 font-medium">
                      {studentProgress.modulesCompleted}/{studentProgress.totalModules}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Target className="h-4 w-4 text-purple-500 mr-2" />
                      {t('dashboard.vrTrainingsCompleted')}
                    </span>
                    <span className="text-purple-600 font-medium">
                      {studentProgress.vrTrainingsCompleted}/{studentProgress.totalVrTrainings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Award className="h-4 w-4 text-orange-500 mr-2" />
                      {t('dashboard.latestQuizScore')}
                    </span>
                    <span className="text-orange-600 font-medium">{studentProgress.latestQuizScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity - Student Centric */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
                <CardDescription>{t('dashboard.recentActivityDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">{t('dashboard.recentActivity.module4')}</p>
                    <p className="text-gray-500">{t('dashboard.recentActivity.keepProgress')}</p>
                    <p className="text-xs text-gray-400">{t('dashboard.recentActivity.timeAgo1h')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">{t('dashboard.recentActivity.vrFire')}</p>
                    <p className="text-gray-500">{t('dashboard.recentActivity.evacuationTime')}</p>
                    <p className="text-xs text-gray-400">{t('dashboard.recentActivity.timeAgo2d')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">{t('dashboard.recentActivity.quizEarthquake')}</p>
                    <p className="text-gray-500">{t('dashboard.recentActivity.performance')}</p>
                    <p className="text-xs text-gray-400">{t('dashboard.recentActivity.timeAgo3d')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>{t('dashboard.emergencyContacts')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('dashboard.emergencyContacts.fire')}</span>
                  <Button variant="outline" size="sm">101</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('dashboard.emergencyContacts.police')}</span>
                  <Button variant="outline" size="sm">100</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('dashboard.emergencyContacts.medical')}</span>
                  <Button variant="outline" size="sm">108</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('dashboard.emergencyContacts.disaster')}</span>
                  <Button variant="outline" size="sm">1070</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>



      {/* Quick Contacts Sheet */}
      <Sheet open={contactsSheetOpen} onOpenChange={setContactsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-orange-500" />
              <span>{t('dashboard.emergencyContacts')}</span>
            </SheetTitle>
            <SheetDescription>
              {t('dashboard.emergencyContacts.tapToCall')}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.number}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCall(contact.number)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    📞 {t('dashboard.emergencyContacts.call')}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Report Incident Modal */}
      <Dialog open={incidentModalOpen} onOpenChange={setIncidentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>{t('dashboard.incident.title')}</span>
            </DialogTitle>
            <DialogDescription>
              {t('dashboard.incident.description')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleIncidentSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="incident-type">{t('dashboard.incident.type')}</Label>
              <Select
                value={incidentForm.type}
                onValueChange={(value) => setIncidentForm(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger id="incident-type">
                  <SelectValue placeholder={t('dashboard.incident.selectType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire">{t('dashboard.incident.fire')}</SelectItem>
                  <SelectItem value="earthquake">{t('dashboard.incident.earthquake')}</SelectItem>
                  <SelectItem value="medical">{t('dashboard.incident.medical')}</SelectItem>
                  <SelectItem value="other">{t('dashboard.incident.other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('dashboard.incident.location')}</Label>
              <Input
                id="location"
                placeholder={t('dashboard.incident.locationPlaceholder')}
                value={incidentForm.location}
                onChange={(e) => setIncidentForm(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('dashboard.incident.descriptionLabel')}</Label>
              <Textarea
                id="description"
                placeholder={t('dashboard.incident.descriptionPlaceholder')}
                value={incidentForm.description}
                onChange={(e) => setIncidentForm(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('dashboard.incident.submit')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIncidentModalOpen(false)}
              >
                {t('common.cancel')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}