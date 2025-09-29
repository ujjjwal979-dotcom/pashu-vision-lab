import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Clock,
  Award,
  Activity,
  Calendar
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { 
  getDashboardStats, 
  getScoreDistributionData, 
  getBreedDistributionData, 
  getTrendData,
  mockCattleData 
} from '@/lib/mock-data';

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

const StatCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: string;
  color: string;
}> = ({ title, value, description, icon: Icon, trend, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="hover-lift shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
          {trend && (
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const RecentActivity = () => {
  const recentRecords = mockCattleData.slice(-5).reverse();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Recent Evaluations</span>
        </CardTitle>
        <CardDescription>Latest cattle assessments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                {record.breed.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{record.name}</p>
                <p className="text-sm text-muted-foreground">{record.breed} • {record.location}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant="outline" 
                className={record.atcScore >= 7 ? 'bg-success/10 text-success border-success' : 
                         record.atcScore >= 5 ? 'bg-warning/10 text-warning border-warning' : 
                         'bg-destructive/10 text-destructive border-destructive'}
              >
                {record.atcScore}/10
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {record.createdAt.toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

const InsightWidget = () => {
  const insights = [
    "Average ATC scores have improved by 12% this month",
    "Holstein breed showing consistent high performance",
    "Health monitoring alerts decreased by 8%",
    "New evaluation technique reduces processing time by 30%"
  ];
  
  const [currentInsight, setCurrentInsight] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <Card className="bg-gradient-primary text-primary-foreground">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="w-5 h-5" />
          <span>Daily Insight</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.p
          key={currentInsight}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-sm leading-relaxed"
        >
          {insights[currentInsight]}
        </motion.p>
        <div className="flex space-x-1 mt-4">
          {insights.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentInsight ? 'bg-primary-foreground' : 'bg-primary-foreground/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  const stats = getDashboardStats();
  const scoreDistribution = getScoreDistributionData();
  const breedDistribution = getBreedDistributionData();
  const trendData = getTrendData();

  const radarData = [
    { trait: 'Body Length', value: 7.8 },
    { trait: 'Height', value: 8.2 },
    { trait: 'Chest Girth', value: 7.5 },
    { trait: 'Milk Yield', value: 8.7 },
    { trait: 'Fertility', value: 7.9 },
    { trait: 'Health', value: 8.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">AI-powered cattle evaluation insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Evaluations"
          value={stats.todayEvaluations}
          description="Cattle assessed today"
          icon={BarChart3}
          trend="+12%"
          color="bg-gradient-primary"
        />
        <StatCard
          title="Average ATC Score"
          value={stats.avgAtcScore}
          description="Overall performance rating"
          icon={Award}
          trend="+0.3"
          color="bg-gradient-success"
        />
        <StatCard
          title="Reports Synced"
          value={stats.reportsSynced}
          description="Successfully synchronized"
          icon={CheckCircle}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Sync"
          value={stats.pendingSync}
          description="Awaiting synchronization"
          icon={Clock}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>ATC Score Distribution</CardTitle>
            <CardDescription>Performance range analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Breed Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Breed Distribution</CardTitle>
            <CardDescription>Cattle breed composition</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={breedDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="count"
                    label={({ breed, percentage }) => `${breed}: ${percentage}%`}
                  >
                    {breedDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluation Trends</CardTitle>
          <CardDescription>30-day performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Area 
                  type="monotone" 
                  dataKey="evaluations" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="avgScore" 
                  stroke="hsl(var(--success))" 
                  fill="hsl(var(--success))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>Average Performance Traits</CardTitle>
            <CardDescription>Key evaluation metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="trait" />
                  <PolarRadiusAxis domain={[0, 10]} />
                  <Radar
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <RecentActivity />

        {/* Insights Widget */}
        <InsightWidget />
      </div>
    </div>
  );
};