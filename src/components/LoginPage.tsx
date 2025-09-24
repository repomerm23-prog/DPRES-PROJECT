import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Shield, 
  GraduationCap, 
  Users, 
  Lock,
  Waves,
  Mountain,
  Zap,
  School,
  Building2,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  X
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useIsMobile } from './hooks/useIsMobile';

interface LoginPageProps {
  onLogin: (userData: {
    schoolName: string;
    schoolCode: string;
    studentName: string;
    age: string;
    institutionType: 'school' | 'college';
  }) => void;
  onAdminLogin: (adminData: {
    email: string;
    password: string;
    displayName?: string;
  }) => void;
}

export function LoginPage({ onLogin, onAdminLogin }: LoginPageProps) {
  const { t } = useLanguage();
  const isMobile = useIsMobile(1024);
  const [currentStep, setCurrentStep] = useState<'userType' | 'institutionType' | 'details'>('userType');
  const [userType, setUserType] = useState<'student' | 'admin'>('student');
  const [institutionType, setInstitutionType] = useState<'school' | 'college'>('school');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolCode: '',
    studentName: '',
    age: '',
    institutionType: 'school' as 'school' | 'college'
  });

  // Force light mode on login page
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    return () => {
      // Cleanup when component unmounts
    };
  }, []);

  // Mock school and college data
  const schools = [
    { id: 'dps-001', name: 'Delhi Public School', code: 'DPS-001', type: 'school' },
    { id: 'kv-002', name: 'Kendriya Vidyalaya No. 1', code: 'KV-002', type: 'school' },
    { id: 'dav-003', name: 'DAV Public School', code: 'DAV-003', type: 'school' },
    { id: 'aps-004', name: 'Army Public School', code: 'APS-004', type: 'school' },
    { id: 'ryan-005', name: 'Ryan International School', code: 'RYAN-005', type: 'school' }
  ];

  const colleges = [
    { id: 'iit-001', name: 'IIT Delhi', code: 'IIT-001', type: 'college' },
    { id: 'du-002', name: 'Delhi University', code: 'DU-002', type: 'college' },
    { id: 'nit-003', name: 'NIT Warangal', code: 'NIT-003', type: 'college' },
    { id: 'bits-004', name: 'BITS Pilani', code: 'BITS-004', type: 'college' },
    { id: 'iim-005', name: 'IIM Bangalore', code: 'IIM-005', type: 'college' },
    { id: 'iisc-006', name: 'IISc Bangalore', code: 'IISC-006', type: 'college' }
  ];

  const getInstitutions = () => institutionType === 'school' ? schools : colleges;

  const handleInstitutionSelect = (institutionId: string) => {
    const institutions = getInstitutions();
    const institution = institutions.find(s => s.id === institutionId);
    if (institution) {
      setSelectedSchool(institutionId);
      setFormData(prev => ({
        ...prev,
        schoolName: institution.name,
        schoolCode: institution.code,
        institutionType: institutionType
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleNext = () => {
    if (currentStep === 'userType') {
      setCurrentStep('institutionType');
    } else if (currentStep === 'institutionType') {
      setCurrentStep('details');
    }
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('institutionType');
      setSelectedSchool('');
      setFormData(prev => ({
        ...prev,
        schoolName: '',
        schoolCode: '',
        studentName: '',
        age: ''
      }));
    } else if (currentStep === 'institutionType') {
      setCurrentStep('userType');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Authorized admin users with their display names
  const authorizedAdmins = {
    'repomerm23@gmail.com': 'Repome',
    'pratyasaha23@gmail.com': 'Pratya',
    'sayanpal066@gmail.com': 'Sayan',
    'muskankhatun0905@gmail.com': 'Muskan',
    'soumyarajnandi241@gmail.com': 'Soumyaraj'
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    
    // Check if user is on mobile device
    if (isMobile) {
      setAdminError('Admin portal access is restricted to desktop devices only. Please use a computer with screen width of 1024px or larger for administrative functions.');
      return;
    }
    
    // Validate admin credentials - password must be "9999" and email is required
    if (adminCredentials.password !== '9999') {
      setAdminError('Invalid password. Please enter the correct admin password.');
      return;
    }
    
    if (!adminCredentials.email) {
      setAdminError('Email is required.');
      return;
    }
    
    // Check if email is in the authorized list
    if (!authorizedAdmins[adminCredentials.email as keyof typeof authorizedAdmins]) {
      setAdminError('Access denied. This email is not authorized for admin access.');
      return;
    }
    
    // If validation passes, call the onAdminLogin function with display name
    const displayName = authorizedAdmins[adminCredentials.email as keyof typeof authorizedAdmins];
    onAdminLogin({ 
      ...adminCredentials, 
      displayName 
    });
  };

  const handleAdminCredentialChange = (field: 'email' | 'password', value: string) => {
    setAdminCredentials(prev => ({ ...prev, [field]: value }));
    setAdminError(''); // Clear error when user types
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-emerald-50 to-indigo-100 relative overflow-hidden transition-colors duration-200">
      {/* Enhanced Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Mandala with Indian Geometric Patterns */}
        <div className="absolute top-16 right-8 sm:right-16 w-48 h-48 sm:w-96 sm:h-96 opacity-8">
          <svg viewBox="0 0 384 384" className="w-full h-full animate-spin-slow">
            {/* Outer circle with Mughal-inspired patterns */}
            <circle cx="192" cy="192" r="180" fill="none" stroke="rgb(234 88 12)" strokeWidth="2" strokeDasharray="8,4" className="opacity-30" />
            <circle cx="192" cy="192" r="150" fill="none" stroke="rgb(79 70 229)" strokeWidth="1" strokeDasharray="12,6" className="opacity-40" />
            <circle cx="192" cy="192" r="120" fill="none" stroke="rgb(16 185 129)" strokeWidth="1" strokeDasharray="16,8" className="opacity-30" />
            
            {/* Traditional Rangoli-style center */}
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 30} 192 192)`}>
                <path
                  d="M192 72 L196 76 L192 80 L188 76 Z"
                  fill="rgb(234 88 12)"
                  className="opacity-20"
                />
                <path
                  d="M192 92 L200 100 L192 108 L184 100 Z"
                  fill="rgb(79 70 229)"
                  className="opacity-15"
                />
              </g>
            ))}
            
            {/* Central lotus-like pattern */}
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse
                key={i}
                cx="192"
                cy="192"
                rx="40"
                ry="15"
                fill="none"
                stroke="rgb(16 185 129)"
                strokeWidth="1"
                className="opacity-25"
                transform={`rotate(${i * 45} 192 192)`}
              />
            ))}
          </svg>
        </div>

        {/* Block Print Inspired Patterns */}
        <div className="absolute bottom-20 left-8 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 opacity-12">
          <svg viewBox="0 0 256 256" className="w-full h-full">
            {/* Traditional Indian block print motifs */}
            {Array.from({ length: 4 }, (_, row) =>
              Array.from({ length: 4 }, (_, col) => (
                <g key={`${row}-${col}`} transform={`translate(${col * 64} ${row * 64})`}>
                  <path
                    d="M32 8 Q48 16 32 32 Q16 48 32 56 Q48 48 56 32 Q48 16 32 8 Z"
                    fill="rgb(234 88 12)"
                    className="opacity-30"
                  />
                  <circle cx="32" cy="32" r="8" fill="rgb(79 70 229)" className="opacity-40" />
                </g>
              ))
            )}
          </svg>
        </div>

        {/* Floating Abstract Elements with Disaster Theme */}
        <div className="absolute top-32 left-8 sm:left-16 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 animate-float shadow-lg"></div>
        <div className="absolute top-48 right-16 sm:right-32 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full opacity-30 animate-float delay-300"></div>
        <div className="absolute bottom-48 left-16 sm:left-32 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-15 animate-float delay-600"></div>
        
        {/* Jali Pattern Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-emerald-500 to-indigo-500 opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-emerald-500 to-orange-500 opacity-20"></div>

        {/* Subtle Disaster Safety Elements */}
        <div className="absolute top-1/3 left-4 sm:left-8 opacity-8">
          <Waves className="w-8 h-8 sm:w-16 sm:h-16 text-indigo-400 animate-float delay-900" />
        </div>
        <div className="absolute bottom-1/3 right-4 sm:right-8 opacity-8">
          <Mountain className="w-10 h-10 sm:w-20 sm:h-20 text-emerald-400 animate-float delay-450" />
        </div>
        <div className="absolute top-2/3 left-1/4 opacity-8 hidden sm:block">
          <Zap className="w-8 h-8 sm:w-12 sm:h-12 text-orange-400 animate-float delay-750" />
        </div>

        {/* Made in India tricolor accent */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 opacity-30">
          <div className="w-4 h-1 bg-orange-500 rounded"></div>
          <div className="w-4 h-1 bg-white rounded border border-gray-200"></div>
          <div className="w-4 h-1 bg-emerald-500 rounded"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/90 backdrop-blur-md">
          <CardHeader className="text-center space-y-4 sm:space-y-6 pb-6 sm:pb-8 px-4 sm:px-6">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 via-emerald-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white relative z-10" />
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-orange-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent break-words">
                {t('login.title')}
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600 break-words">
                {t('login.subtitle')}
              </CardDescription>
              <div className="flex items-center justify-center space-x-2 flex-wrap">
                <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 text-xs sm:text-sm">
                  {t('login.madeInIndia')}
                </Badge>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-white border border-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'userType' ? 'bg-indigo-500' : 'bg-indigo-200'
              }`} />
              <div className={`w-8 h-0.5 transition-all duration-300 ${
                currentStep === 'institutionType' || currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'institutionType' ? 'bg-indigo-500' : currentStep === 'details' ? 'bg-indigo-200' : 'bg-gray-200'
              }`} />
              <div className={`w-8 h-0.5 transition-all duration-300 ${
                currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === 'details' ? 'bg-indigo-500' : 'bg-gray-200'
              }`} />
            </div>

            {/* Step Labels */}
            <div className="text-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 break-words">
              {currentStep === 'userType' && t('login.step1')}
              {currentStep === 'institutionType' && t('login.step2')}
              {currentStep === 'details' && t('login.step3')}
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6">
            {/* Step 1: User Type Selection */}
            {currentStep === 'userType' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 break-words">{t('login.welcome')}</h3>
                  <p className="text-sm text-gray-600 break-words">{t('login.selectType')}</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setUserType('student')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      userType === 'student'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base break-words">{t('login.student')}</div>
                        <div className="text-xs sm:text-sm opacity-75 break-words">{t('login.studentDesc')}</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => !isMobile && setShowAdminLogin(true)}
                    disabled={isMobile}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      isMobile 
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50' 
                        : 'border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base flex items-center flex-wrap">
                          <span className="break-words">SDMA Admin Access</span>
                          <Lock className="w-3 h-3 sm:w-4 sm:h-4 ml-2 flex-shrink-0" />
                        </div>
                        <div className="text-xs sm:text-sm opacity-75 break-words">
                          {isMobile 
                            ? 'Desktop access required (1024px+ screen width)' 
                            : 'Access administrator dashboard'
                          }
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={userType !== 'student'}
                  className="w-full h-10 sm:h-12 bg-gradient-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="break-words">{t('login.continue')}</span>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  </span>
                </Button>
              </div>
            )}

            {/* Step 2: Institution Type Selection */}
            {currentStep === 'institutionType' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 break-words">{t('login.selectInstitution')}</h3>
                  <p className="text-sm text-gray-600 break-words">{t('login.institutionQuestion')}</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setInstitutionType('school')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      institutionType === 'school'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <School className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base break-words">{t('login.school')}</div>
                        <div className="text-xs sm:text-sm opacity-75 break-words">{t('login.schoolDesc')}</div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setInstitutionType('college')}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      institutionType === 'college'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base break-words">{t('login.college')}</div>
                        <div className="text-xs sm:text-sm opacity-75 break-words">{t('login.collegeDesc')}</div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="flex-1 h-10 sm:h-12 text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="break-words">{t('login.back')}</span>
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white text-sm sm:text-base"
                  >
                    <span className="break-words">{t('login.continue')}</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2 flex-shrink-0" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Details Form */}
            {currentStep === 'details' && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-base sm:text-lg font-medium text-gray-800 break-words">{t('login.enterDetails')}</h3>
                  <p className="text-sm text-gray-600 break-words">
                    {t('login.provideInfo')} {institutionType === 'school' ? t('login.school').toLowerCase() : t('login.college').toLowerCase()} information
                  </p>
                </div>

                {/* Institution Selector */}
                <div className="space-y-2">
                  <Label htmlFor="institution-selector" className="text-gray-700 font-medium text-sm sm:text-base break-words">
                    {institutionType === 'school' ? t('login.selectSchool') : t('login.selectCollege')}
                  </Label>
                  <Select value={selectedSchool} onValueChange={handleInstitutionSelect}>
                    <SelectTrigger className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400/20 h-10 sm:h-11 text-sm sm:text-base">
                      <SelectValue placeholder={institutionType === 'school' ? t('login.chooseSchool') : t('login.chooseCollege')} />
                    </SelectTrigger>
                    <SelectContent>
                      {getInstitutions().map((institution) => (
                        <SelectItem key={institution.id} value={institution.id}>
                          <div className="flex items-center justify-between w-full">
                            <span className="break-words text-sm sm:text-base">{institution.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs capitalize">
                              {institution.type}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedSchool && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="institutionCode" className="text-gray-700 font-medium text-sm sm:text-base break-words">
                          {institutionType === 'school' ? t('login.schoolCode') : t('login.collegeCode')}
                        </Label>
                        <Input
                          id="institutionCode"
                          value={formData.schoolCode}
                          disabled
                          className="bg-gray-50 border-gray-200 text-gray-600 h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-700 font-medium text-sm sm:text-base break-words">{t('login.age')}</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder={t('login.enterAge')}
                          min={institutionType === 'school' ? '10' : '17'}
                          max={institutionType === 'school' ? '18' : '30'}
                          value={formData.age}
                          onChange={(e) => handleChange('age', e.target.value)}
                          required
                          className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20 h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentName" className="text-gray-700 font-medium text-sm sm:text-base break-words">{t('login.fullName')}</Label>
                      <Input
                        id="studentName"
                        placeholder={t('login.enterName')}
                        value={formData.studentName}
                        onChange={(e) => handleChange('studentName', e.target.value)}
                        required
                        className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 h-10 sm:h-11 text-sm sm:text-base"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <Button
                        type="button"
                        onClick={handleBack}
                        variant="outline"
                        className="w-full sm:flex-1 h-10 sm:h-12 text-sm sm:text-base"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="break-words">{t('login.back')}</span>
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:flex-1 h-10 sm:h-12 bg-gradient-to-r from-orange-500 via-emerald-500 to-indigo-600 hover:from-orange-600 hover:via-emerald-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group text-sm sm:text-base"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center justify-center space-x-1 sm:space-x-2 font-medium">
                          <span className="break-words">{t('login.enterHub')}</span>
                          <Shield className="w-4 h-4 flex-shrink-0" />
                        </span>
                      </Button>
                    </div>
                  </>
                )}
              </form>
            )}

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs text-gray-500 mb-2 break-words">
                {t('login.buildingSafety')}
              </p>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-400 flex-wrap">
                <span>{t('login.poweredBy')}</span>
                <span className="font-medium text-orange-600">NDMA</span>
                <span>•</span>
                <span className="font-medium text-indigo-600">Sendai Framework</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border-0 shadow-2xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-between items-center">
                <div></div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setAdminCredentials({ email: '', password: '' });
                    setAdminError('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-red-600">SDMA Admin Login</CardTitle>
              <CardDescription className="text-gray-600">
                Enter admin credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                {adminError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {adminError}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={adminCredentials.email}
                    onChange={(e) => handleAdminCredentialChange('email', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter admin password"
                      value={adminCredentials.password}
                      onChange={(e) => handleAdminCredentialChange('password', e.target.value)}
                      required
                      className="bg-white border-gray-300 focus:border-red-500 focus:ring-red-500/20 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminCredentials({ email: '', password: '' });
                      setAdminError('');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Access Portal
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}