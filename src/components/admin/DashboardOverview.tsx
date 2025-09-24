import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  School,
  Building2,
  Users,
  Target,
  AlertTriangle,
  MapIcon,
  Bell,
  Activity
} from 'lucide-react';
import { allInstitutions } from '../shared/institutionsData';
import { useAlerts } from '../shared/AlertContext';
import { IndiaMap } from '../IndiaMap';

interface DashboardOverviewProps {
  overviewStats: {
    totalSchools: number;
    totalColleges: number;
    totalStudents: number;
    avgCompletion: number;
    activeSosAlerts: number;
  };
  onNavigation: (section: string) => void;
}

export function DashboardOverview({ overviewStats, onNavigation }: DashboardOverviewProps) {
  const { alerts, getActiveAlerts } = useAlerts();
  const activeAlerts = getActiveAlerts();
  
  // Filter SOS alerts from enrolled institutions only
  const sosAlerts = alerts.filter(alert => 
    allInstitutions.some(inst => inst.id === alert.institutionId)
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Schools</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{overviewStats.totalSchools}</p>
              </div>
              <School className="h-6 w-6 lg:h-8 lg:w-8 text-blue-500 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Colleges</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{overviewStats.totalColleges}</p>
              </div>
              <Building2 className="h-6 w-6 lg:h-8 lg:w-8 text-green-500 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Students</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{overviewStats.totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-6 w-6 lg:h-8 lg:w-8 text-purple-500 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-100">{overviewStats.avgCompletion}%</p>
              </div>
              <Target className="h-6 w-6 lg:h-8 lg:w-8 text-orange-500 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">SOS Alerts</p>
                <p className="text-lg lg:text-2xl font-bold text-red-600 dark:text-red-400">{overviewStats.activeSosAlerts}</p>
              </div>
              <AlertTriangle className="h-6 w-6 lg:h-8 lg:w-8 text-red-500 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map and Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        {/* India Map */}
        <Card className="xl:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="flex items-center text-base lg:text-lg text-gray-900 dark:text-gray-100">
              <Activity className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              System Control Center
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring and quick actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            {/* System Status Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 lg:p-4 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Online</Badge>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">System Status</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 lg:p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Active</Badge>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">SMS Gateway</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 lg:p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">Ready</Badge>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Alert System</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 lg:p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Synced</Badge>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Data Backup</p>
              </div>
            </div>

            {/* Quick Actions & Real-time Alerts */}
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Quick Actions
                </h4>
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  <button 
                    onClick={() => onNavigation('emergency-alerts')}
                    className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-left hover:scale-105 transform"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="text-xs font-medium text-red-900 dark:text-red-100">Emergency Alert</p>
                      <p className="text-xs text-red-600 dark:text-red-400">Send to all</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => onNavigation('sms-ivr')}
                    className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors text-left hover:scale-105 transform"
                  >
                    <Bell className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-xs font-medium text-blue-900 dark:text-blue-100">Announcement</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">Broadcast</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => onNavigation('institutions')}
                    className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-left hover:scale-105 transform"
                  >
                    <School className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-xs font-medium text-green-900 dark:text-green-100">Add Institution</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Register new</p>
                    </div>
                  </button>
                  
                  <button 
                    onClick={() => onNavigation('reports')}
                    className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors text-left hover:scale-105 transform"
                  >
                    <Users className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-xs font-medium text-purple-900 dark:text-purple-100">User Report</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">Generate</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </h4>
                <div className="space-y-2 max-h-32 lg:max-h-40 overflow-y-auto">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">New user registration</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Delhi Public School, Delhi</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Training module completed</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Fire Safety - Phase 1</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">5 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">System backup completed</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">All data synchronized</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">12 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100">Alert resolved</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">Earthquake drill - Mumbai</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">18 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3 lg:pb-4">
            <CardTitle className="flex items-center text-base lg:text-lg text-gray-900 dark:text-gray-100">
              <Bell className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
              Recent Alerts
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">Latest SOS and emergency alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sosAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800">
                <AlertTriangle className="h-4 w-4 lg:h-5 lg:w-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate text-gray-900 dark:text-gray-100">{alert.institution}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{alert.studentName} • {alert.type}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{alert.timestamp}</p>
                  <Badge className={`text-xs mt-1 ${
                    alert.severity === 'high' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                      : alert.severity === 'medium' 
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' 
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
            {sosAlerts.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                <p className="text-sm">No active alerts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}