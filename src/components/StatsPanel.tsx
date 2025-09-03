import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileX,
  Download,
  RefreshCw
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const StatsPanel = () => {
  // Mock data for charts
  const claimStatusData = [
    { name: 'Approved', value: 456234, color: 'hsl(145 48% 42%)' },
    { name: 'Pending', value: 234567, color: 'hsl(42 67% 51%)' },
    { name: 'Rejected', value: 55022, color: 'hsl(0 79% 57%)' }
  ];

  const monthlyData = [
    { month: 'Jan', approved: 12543, submitted: 15678 },
    { month: 'Feb', approved: 13422, submitted: 16234 },
    { month: 'Mar', approved: 14567, submitted: 17456 },
    { month: 'Apr', approved: 15234, submitted: 18123 },
    { month: 'May', approved: 16789, submitted: 19567 },
    { month: 'Jun', approved: 17456, submitted: 20234 }
  ];

  const processingMetrics = [
    {
      title: "Average Processing Time",
      value: "47 days",
      change: "-12%",
      trend: "down",
      icon: Clock,
      description: "Avg time from submission to decision"
    },
    {
      title: "Documents Processed Today",
      value: "5,247",
      change: "+18%",
      trend: "up", 
      icon: FileX,
      description: "AI-powered document analysis"
    },
    {
      title: "Success Rate",
      value: "61.2%",
      change: "+3.2%",
      trend: "up",
      icon: CheckCircle,
      description: "Overall claim approval rate"
    },
    {
      title: "Priority Cases",
      value: "1,456",
      change: "-8%",
      trend: "down",
      icon: AlertCircle,
      description: "Cases requiring immediate attention"
    }
  ];

  const recentAlerts = [
    {
      type: "urgent",
      message: "89 claims pending beyond 60-day limit in Balaghat",
      time: "30 mins ago"
    },
    {
      type: "info", 
      message: "New satellite imagery available for verification",
      time: "2 hours ago"
    },
    {
      type: "success",
      message: "Bulk approval completed for Mandla district",
      time: "4 hours ago"
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-96 bg-card border-l border-border p-6 space-y-6 overflow-y-auto">
      {/* Processing Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold font-heading">Key Metrics</h3>
          <Button size="icon" variant="ghost">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {processingMetrics.map((metric, index) => (
            <Card key={index} className="data-card">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <metric.icon className="h-4 w-4 text-primary" />
                      <p className="text-sm font-medium">{metric.title}</p>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                  <div className={`flex items-center text-xs font-medium ${
                    metric.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Claim Status Distribution */}
      <Card className="data-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Claim Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={claimStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {claimStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [value.toLocaleString(), 'Claims']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-4 mt-2">
            {claimStatusData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card className="data-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Monthly Processing Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(211 25% 32%)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'hsl(215 20.2% 65.1%)' }}
                  stroke="hsl(215 20.2% 65.1%)"
                />
                <YAxis 
                  hide 
                  stroke="hsl(215 20.2% 65.1%)"
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="approved" 
                  stroke="hsl(145 48% 42%)" 
                  strokeWidth={2}
                  name="Approved"
                />
                <Line 
                  type="monotone" 
                  dataKey="submitted" 
                  stroke="hsl(145 48% 42%)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Submitted"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Progress Indicators */}
      <Card className="data-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">State-wise Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Madhya Pradesh</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Odisha</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tripura</span>
                <span className="font-medium">52%</span>
              </div>
              <Progress value={52} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Telangana</span>
                <span className="font-medium">43%</span>
              </div>
              <Progress value={43} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-heading">Alerts & Notifications</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <Card key={index} className="data-card">
              <CardContent className="pt-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'urgent' ? 'bg-destructive' :
                    alert.type === 'info' ? 'bg-primary' :
                    'bg-success'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button variant="outline" className="w-full">
          View All Notifications
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold font-heading">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button className="btn-government justify-start">
            <Download className="h-4 w-4 mr-2" />
            Export Monthly Report
          </Button>
          <Button variant="outline" className="justify-start">
            <CheckCircle className="h-4 w-4 mr-2" />
            Bulk Approve Claims
          </Button>
          <Button variant="outline" className="justify-start">
            <AlertCircle className="h-4 w-4 mr-2" />
            Review Priority Cases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;