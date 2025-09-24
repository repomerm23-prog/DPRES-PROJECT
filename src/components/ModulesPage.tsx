import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  FileText, 
  Shield, 
  Zap, 
  Play,
  Clock,
  Users,
  CheckCircle,
  Lock,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface UserData {
  schoolName: string;
  schoolCode: string;
  studentName: string;
  age: string;
  institutionType: 'school' | 'college'; // Add institutionType
}

interface ModulesPageProps {
  userData: UserData | null;
}

export function ModulesPage({ userData }: ModulesPageProps) {
  const { t } = useLanguage();
  const [selectedFriend, setSelectedFriend] = useState<string>('');

  // Mock progress data
  const progressData = {
    student: {
      overall: 68,
      modules: 4,
      totalModules: 6,
      vrTrainings: 2,
      totalVrTrainings: 3,
      averageQuiz: 85
    },
    schoolAverage: {
      overall: 72,
      averageQuiz: 78
    },
    friends: [
      { name: 'Aditi Sharma', overall: 58, averageQuiz: 82 },
      { name: 'Rohan Patel', overall: 75, averageQuiz: 88 },
      { name: 'Priya Mehta', overall: 62, averageQuiz: 76 },
      { name: 'Arjun Singh', overall: 80, averageQuiz: 91 }
    ]
  };

  const selectedFriendData = progressData.friends.find(f => f.name === selectedFriend);

  // Generate encouraging messages based on progress
  const getProgressEmoji = (score: number) => {
    if (score >= 80) return '🔥';
    if (score >= 60) return '🌱';
    return '🛠';
  };

  const getProgressMessage = (studentScore: number, schoolAverage: number) => {
    if (studentScore > schoolAverage) {
      return t('modules.aheadOfAverage');
    } else if (studentScore >= schoolAverage - 10) {
      return t('modules.catchingUp');
    } else {
      return t('modules.keepGoing');
    }
  };

  const modules = [
    {
      id: 1,
      title: 'Guided Disaster Risk Management Plan',
      description: 'Learn to identify and assess disaster risks in your environment, and create effective management strategies.',
      progress: 100,
      duration: '45 min',
      students: 234,
      status: 'completed',
      type: 'video',
      topics: ['Risk Assessment', 'Vulnerability Analysis', 'Mitigation Strategies']
    },
    {
      id: 2,
      title: 'Operational Plans',
      description: 'Master emergency response protocols and learn to create actionable plans for various disaster scenarios.',
      progress: 75,
      duration: '60 min',
      students: 198,
      status: 'in-progress',
      type: 'interactive',
      topics: ['Emergency Protocols', 'Resource Management', 'Communication Plans']
    },
    {
      id: 3,
      title: 'Disaster Deduction & Management',
      description: 'Advanced techniques for predicting disasters and managing crises effectively when they occur.',
      progress: 30,
      duration: '90 min',
      students: 156,
      status: 'in-progress',
      type: 'mixed',
      topics: ['Early Warning Systems', 'Crisis Management', 'Recovery Planning']
    },
    {
      id: 4,
      title: 'Experimental Preparedness Training',
      description: 'Hands-on practical training for earthquake and fire scenarios with real-world simulations.',
      progress: 0,
      duration: '120 min',
      students: 89,
      status: 'locked',
      type: 'simulation',
      topics: ['Earthquake Response', 'Fire Safety', 'Evacuation Procedures']
    },
    {
      id: 5,
      title: 'Community Response Coordination',
      description: 'Learn to coordinate with local authorities and community groups during emergency situations.',
      progress: 0,
      duration: '75 min',
      students: 67,
      status: 'locked',
      type: 'interactive',
      topics: ['Community Engagement', 'Authority Coordination', 'Public Communication']
    },
    {
      id: 6,
      title: 'Recovery & Rehabilitation',
      description: 'Understand post-disaster recovery processes and how to help communities rebuild effectively.',
      progress: 0,
      duration: '90 min',
      students: 45,
      status: 'locked',
      type: 'mixed',
      topics: ['Recovery Planning', 'Rehabilitation Strategies', 'Long-term Sustainability']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400';
      case 'locked': return 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Play className="h-4 w-4" />;
      case 'locked': return <Lock className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground dark:text-foreground mb-2 break-words leading-tight">{t('modules.title')}</h1>
          <p className="text-muted-foreground dark:text-muted-foreground break-words">{t('modules.subtitle')}</p>
        </div>

        {/* Progress Comparison Section */}
        <div className="mb-8 space-y-6">
          <Card className="bg-gradient-to-r from-orange-50 dark:from-orange-950/30 to-indigo-50 dark:to-indigo-950/30 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground dark:text-foreground">
                <TrendingUp className="h-5 w-5 text-orange-500 dark:text-orange-400" />
                <span className="break-words">{t('modules.journey')}</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground dark:text-muted-foreground break-words">
                {getProgressMessage(progressData.student.overall, progressData.schoolAverage.overall)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Your Progress */}
                <div className="bg-card dark:bg-card p-4 rounded-lg border border-border dark:border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground dark:text-card-foreground break-words">{t('modules.yourProgress')}</h3>
                    <span className="text-2xl">{getProgressEmoji(progressData.student.overall)}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.overall')}</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.student.overall}%</span>
                      </div>
                      <Progress value={progressData.student.overall} className="h-2" />
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.modules')}:</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.student.modules}/{progressData.student.totalModules}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.vrTrainings')}:</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.student.vrTrainings}/{progressData.student.totalVrTrainings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.quizAverage')}:</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.student.averageQuiz}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School/College Average */}
                <div className="bg-card dark:bg-card p-4 rounded-lg border border-border dark:border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground dark:text-card-foreground break-words">
                      {userData?.institutionType === 'college' ? t('modules.collegeAverage') : t('modules.schoolAverage')}
                    </h3>
                    <span className="text-2xl">{getProgressEmoji(progressData.schoolAverage.overall)}</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.overall')}</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.schoolAverage.overall}%</span>
                      </div>
                      <Progress value={progressData.schoolAverage.overall} className="h-2" />
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground dark:text-muted-foreground">
                          {userData?.institutionType === 'college' ? t('modules.college') : t('modules.school')}:
                        </span>
                        <span className="font-medium text-foreground dark:text-foreground">{userData?.schoolName || (userData?.institutionType === 'college' ? 'Your College' : 'Your School')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.quizAverage')}:</span>
                        <span className="font-medium text-foreground dark:text-foreground">{progressData.schoolAverage.averageQuiz}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Friend Comparison */}
                <div className="bg-card dark:bg-card p-4 rounded-lg border border-border dark:border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-card-foreground dark:text-card-foreground break-words">{t('modules.friendComparison')}</h3>
                    {selectedFriendData && (
                      <span className="text-2xl">{getProgressEmoji(selectedFriendData.overall)}</span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Select value={selectedFriend} onValueChange={setSelectedFriend}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('modules.selectFriend')} />
                      </SelectTrigger>
                      <SelectContent>
                        {progressData.friends.map((friend) => (
                          <SelectItem key={friend.name} value={friend.name}>
                            {friend.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {selectedFriendData && (
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.overall')}</span>
                            <span className="font-medium text-foreground dark:text-foreground">{selectedFriendData.overall}%</span>
                          </div>
                          <Progress value={selectedFriendData.overall} className="h-2" />
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.quizAverage')}:</span>
                            <span className="font-medium text-foreground dark:text-foreground">{selectedFriendData.averageQuiz}%</span>
                          </div>
                          <div className="text-xs text-muted-foreground dark:text-muted-foreground mt-2">
                            {progressData.student.overall > selectedFriendData.overall 
                              ? t('modules.aheadOfFriend').replace('{percent}', (progressData.student.overall - selectedFriendData.overall).toString())
                              : t('modules.behindFriend').replace('{percent}', (selectedFriendData.overall - progressData.student.overall).toString())
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-card-foreground dark:text-card-foreground break-words">{module.title}</CardTitle>
                    <CardDescription className="mb-4 text-muted-foreground dark:text-muted-foreground break-words">{module.description}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(module.status)} border-0`}>
                    {getStatusIcon(module.status)}
                    <span className="ml-1 capitalize">{module.status === 'in-progress' ? t('modules.inProgress') : module.status === 'completed' ? t('modules.completed') : t('modules.locked')}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground dark:text-muted-foreground">{t('modules.progress')}</span>
                    <span className="text-foreground dark:text-foreground">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="w-full h-2" />
                </div>

                {/* Module Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {module.duration.replace('min', t('modules.minutesShort'))}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {module.students} {t('modules.students')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {module.type === 'video' && <FileText className="h-4 w-4" />}
                    {module.type === 'interactive' && <Zap className="h-4 w-4" />}
                    {module.type === 'mixed' && <BookOpen className="h-4 w-4" />}
                    {module.type === 'simulation' && <Shield className="h-4 w-4" />}
                    <span className="capitalize">{module.type === 'video' ? t('modules.video') : 
                                                      module.type === 'interactive' ? t('modules.interactive') : 
                                                      module.type === 'mixed' ? t('modules.mixed') : 
                                                      module.type === 'simulation' ? t('modules.simulation') : module.type}</span>
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <div className="text-sm font-medium mb-2 text-foreground dark:text-foreground">{t('modules.keyTopics')}:</div>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {module.status === 'completed' ? (
                    <Button variant="outline" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {t('modules.reviewModule')}
                    </Button>
                  ) : module.status === 'in-progress' ? (
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700">
                      <Play className="h-4 w-4 mr-2" />
                      {t('modules.continueLearning')}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      {t('modules.completePrevious')}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8 bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground dark:text-card-foreground">{t('modules.additionalResources')}</CardTitle>
            <CardDescription className="text-muted-foreground dark:text-muted-foreground">{t('modules.resourcesDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                <FileText className="h-6 w-6" />
                <span>{t('modules.resourceLibrary')}</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                <BookOpen className="h-6 w-6" />
                <span>{t('modules.bestPractices')}</span>
              </Button>
              <Button variant="outline" className="h-16 flex flex-col items-center space-y-2">
                <Shield className="h-6 w-6" />
                <span>{t('modules.caseStudies')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}