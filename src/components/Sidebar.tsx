import { Calendar, Filter, MapPin, BarChart3, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const stats = [
    {
      title: "Total Claims",
      value: "745,823",
      change: "+12.5%",
      changeType: "positive" as const
    },
    {
      title: "Approved",
      value: "456,234",
      percentage: "61.2%",
      change: "+5.2%",
      changeType: "positive" as const
    },
    {
      title: "Pending",
      value: "234,567",
      percentage: "31.5%",
      change: "-2.1%",
      changeType: "negative" as const
    },
    {
      title: "Rejected",
      value: "55,022",
      percentage: "7.3%",
      change: "+0.8%",
      changeType: "neutral" as const
    }
  ];

  const recentActivities = [
    {
      type: "approval",
      message: "147 claims approved in Betul district",
      time: "2 hours ago",
      icon: FileText
    },
    {
      type: "submission",
      message: "New CFR claim from Khermai village",
      time: "4 hours ago",
      icon: MapPin
    },
    {
      type: "meeting",
      message: "Gram Sabha meeting scheduled",
      time: "6 hours ago",
      icon: Users
    }
  ];

  return (
    <aside className="w-80 bg-sidebar border-r border-sidebar-border p-4 space-y-6 overflow-y-auto">
      {/* Quick Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold font-heading text-sidebar-foreground">Overview</h2>
        <div className="grid grid-cols-1 gap-3">
          {stats.map((stat, index) => (
            <Card key={index} className="data-card">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                      {stat.percentage && (
                        <Badge variant="secondary" className="text-xs">
                          {stat.percentage}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-success' : 
                    stat.changeType === 'negative' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">Filters</h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-sidebar-foreground mb-2 block">State</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="mp">Madhya Pradesh</SelectItem>
                <SelectItem value="tripura">Tripura</SelectItem>
                <SelectItem value="odisha">Odisha</SelectItem>
                <SelectItem value="telangana">Telangana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-sidebar-foreground mb-2 block">District</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="betul">Betul</SelectItem>
                <SelectItem value="balaghat">Balaghat</SelectItem>
                <SelectItem value="mandla">Mandla</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-sidebar-foreground mb-2 block">Claim Type</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ifr">Individual Forest Rights (IFR)</SelectItem>
                <SelectItem value="cr">Community Rights (CR)</SelectItem>
                <SelectItem value="cfr">Community Forest Resource (CFR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-sidebar-foreground mb-2 block">Status</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full btn-government">
            Apply Filters
          </Button>
        </div>
      </div>

      <Separator />

      {/* Recent Activity */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">Recent Activity</h3>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors">
              <div className="p-1.5 rounded-full bg-primary/20">
                <activity.icon className="h-3 w-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-sidebar-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          View All Activities
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;