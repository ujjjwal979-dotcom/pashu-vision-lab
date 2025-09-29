import React from 'react';
import { Shield, Users, Activity, TrendingUp, AlertTriangle, Database, Server, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalytics() {
  const systemStats = {
    totalUsers: 2458,
    activeUsers: 1876,
    totalEvaluations: 12345,
    systemUptime: 99.8,
    storageUsed: 78.5,
    apiCalls: 145670
  };

  const userGrowthData = [
    { month: 'Jan', users: 450 },
    { month: 'Feb', users: 680 },
    { month: 'Mar', users: 890 },
    { month: 'Apr', users: 1250 },
    { month: 'May', users: 1680 },
    { month: 'Jun', users: 2458 }
  ];

  const evaluationTrends = [
    { date: '2024-01-01', evaluations: 45 },
    { date: '2024-01-02', evaluations: 52 },
    { date: '2024-01-03', evaluations: 48 },
    { date: '2024-01-04', evaluations: 67 },
    { date: '2024-01-05', evaluations: 73 },
    { date: '2024-01-06', evaluations: 58 },
    { date: '2024-01-07', evaluations: 82 }
  ];

  const userRoleData = [
    { role: 'Field Workers', count: 1456, color: '#8884d8' },
    { role: 'Researchers', count: 345, color: '#82ca9d' },
    { role: 'Govt Officers', count: 567, color: '#ffc658' },
    { role: 'Admins', count: 90, color: '#ff7c7c' }
  ];

  const regionPerformance = [
    { region: 'North India', evaluations: 4560, avgScore: 7.8 },
    { region: 'West India', evaluations: 3890, avgScore: 7.2 },
    { region: 'South India', evaluations: 2340, avgScore: 7.5 },
    { region: 'East India', superBottom: 1555, avgScore: 6.9 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Analytics</h1>
          <p className="text-muted-foreground">System administration and performance monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            System Online
          </Badge>
          <Badge variant="secondary">
            Last Updated: {new Date().toLocaleTimeString()}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="regions">Regions</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((systemStats.activeUsers / systemStats.totalUsers) * 100)}% activity rate
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalEvaluations.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.systemUptime}%</div>
                <Progress value={systemStats.systemUptime} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trend</CardTitle>
                <CardDescription>Monthly user registration growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Evaluations</CardTitle>
                <CardDescription>Recent evaluation activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={evaluationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <Line type="monotone" dataKey="evaluations" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Role Distribution</CardTitle>
                <CardDescription>Breakdown of users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userRoleData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ role, count }) => `${role}: ${count}`}
                    >
                      {userRoleData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Recent user engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Daily Active Users</span>
                      <span>1,245</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Weekly Active Users</span>
                      <span>1,876</span>
                    </div>
                    <Progress value={76} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Monthly Active Users</span>
                      <span>2,234</span>
                    </div>
                    <Progress value={91} />
                  </div>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>New Registrations (24h):</span>
                    <span className="font-medium">+45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Account Activations:</span>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Support Tickets:</span>
                    <span className="font-medium text-orange-600">7 Open</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>API Performance</CardTitle>
                <CardDescription>Request metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.apiCalls.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total API calls today</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Response Time:</span>
                    <span>245ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="text-green-600">99.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Error Rate:</span>
                    <span className="text-red-600">0.8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
                <CardDescription>Database and file storage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.storageUsed}%</div>
                <Progress value={systemStats.storageUsed} className="mt-2" />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Images:</span>
                    <span>156 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Database:</span>
                    <span>23 GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Backups:</span>
                    <span>89 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Queue</CardTitle>
                <CardDescription>AI analysis workload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Images in queue</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Avg Processing Time:</span>
                    <span>3.2s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completed Today:</span>
                    <span>1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Failed:</span>
                    <span className="text-red-600">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Regional Performance</CardTitle>
              <CardDescription>Evaluation statistics by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regionPerformance.map((region) => (
                  <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{region.region}</h3>
                      <p className="text-sm text-muted-foreground">
                        {region.evaluations} evaluations
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">{region.avgScore}</div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  System Health
                </CardTitle>
                <CardDescription>Current system status and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Database Connection</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>AI Processing Service</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">Running</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>File Storage</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Backup Service</span>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">Warning</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Service</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>System notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <Clock className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Backup Delay</p>
                    <p className="text-xs text-muted-foreground">Daily backup running 2 hours late</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">High Usage</p>
                    <p className="text-xs text-muted-foreground">API calls 150% above normal</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Security Update</p>
                    <p className="text-xs text-muted-foreground">System successfully updated</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}