import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Settings as SettingsIcon,
  Map,
  Bot,
  BarChart3,
  Users,
  Shield,
  Globe,
  Smartphone,
  Wrench,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Mail,
  Key,
  Activity,
  Clock,
  ToggleLeft,
  ToggleRight,
  Languages,
  Accessibility,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

const Settings = () => {
  console.log('Settings component loaded'); // Force rebuild
  const [activeSection, setActiveSection] = useState("general");
  const { register, handleSubmit, watch, setValue } = useForm();

  const settingsSections = [
    { id: "general", label: "General Settings", icon: SettingsIcon },
    { id: "map", label: "Map & Visualization", icon: Map },
    { id: "ai", label: "AI & Processing", icon: Bot },
    { id: "analytics", label: "Analytics & Reporting", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "security", label: "Security & Privacy", icon: Shield },
    { id: "integration", label: "Integration & APIs", icon: Globe },
    { id: "mobile", label: "Mobile & Accessibility", icon: Smartphone },
    { id: "system", label: "System Administration", icon: Wrench }
  ];

  const onSubmit = (data: any) => {
    console.log("Settings saved:", data);
    // Handle settings save
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header Section */}
      <div className="border-b bg-muted/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FRA Atlas - System Configuration</h1>
            <p className="text-muted-foreground">Configure system settings and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">System Admin</Badge>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import Config
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Config
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 border-r bg-muted/30 p-4">
          <nav className="space-y-1">
            {settingsSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {section.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* General Settings */}
            {activeSection === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    
                    {/* User Profile */}
                    <Card>
                      <CardHeader>
                        <CardTitle>User Profile & Personalization</CardTitle>
                        <CardDescription>Manage your personal information and preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...register("profile.name")} placeholder="Enter your name" />
                          </div>
                          <div>
                            <Label htmlFor="designation">Designation</Label>
                            <Input id="designation" {...register("profile.designation")} placeholder="Your role" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="organization">Organization</Label>
                          <Input id="organization" {...register("profile.organization")} placeholder="Department/Organization" />
                        </div>
                        <div>
                          <Label htmlFor="language">Interface Language</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="hindi">हिंदी</SelectItem>
                              <SelectItem value="odia">ଓଡ଼ିଆ</SelectItem>
                              <SelectItem value="telugu">తెలుగు</SelectItem>
                              <SelectItem value="bengali">বাংলা</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Regional Settings */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Regional Settings</CardTitle>
                        <CardDescription>Configure your working area and regional preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="primaryState">Primary State</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select primary state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mp">Madhya Pradesh</SelectItem>
                              <SelectItem value="tripura">Tripura</SelectItem>
                              <SelectItem value="odisha">Odisha</SelectItem>
                              <SelectItem value="telangana">Telangana</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="workingDistricts">Working Districts</Label>
                          <Input id="workingDistricts" placeholder="Search and select districts" />
                        </div>
                        <div>
                          <Label htmlFor="timezone">Time Zone</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Auto-detect" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ist">IST (UTC+05:30)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Dashboard Customization */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Dashboard Customization</CardTitle>
                      <CardDescription>Personalize your dashboard layout and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="defaultPage">Default Landing Page</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Analytics Dashboard" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="analytics">Analytics</SelectItem>
                              <SelectItem value="map">Map View</SelectItem>
                              <SelectItem value="claims">Claims Dashboard</SelectItem>
                              <SelectItem value="documents">Document Processing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="refreshInterval">Data Refresh Interval</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="5 minutes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realtime">Real-time</SelectItem>
                              <SelectItem value="5min">5 minutes</SelectItem>
                              <SelectItem value="15min">15 minutes</SelectItem>
                              <SelectItem value="1hour">1 hour</SelectItem>
                              <SelectItem value="manual">Manual</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Map & Visualization Settings */}
            {activeSection === "map" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Map & Visualization Settings</h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Base Map Configuration</CardTitle>
                      <CardDescription>Configure default map layers and visualization options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="baseLayer">Default Base Layer</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Satellite Imagery" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="satellite">Satellite Imagery</SelectItem>
                            <SelectItem value="osm">OpenStreetMap</SelectItem>
                            <SelectItem value="topographic">Topographic</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Layer Visibility</Label>
                        <div className="space-y-2">
                          {[
                            "Administrative boundaries",
                            "FRA claim layers",
                            "Asset inventory layers", 
                            "Infrastructure layers"
                          ].map((layer) => (
                            <div key={layer} className="flex items-center justify-between">
                              <span className="text-sm">{layer}</span>
                              <Switch />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Options</CardTitle>
                      <CardDescription>Optimize map performance for your connection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="tileQuality">Vector Tiles Quality</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="High" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="clusterThreshold">Clustering Threshold</Label>
                        <Input type="number" placeholder="100" />
                      </div>
                      <div>
                        <Label htmlFor="cacheLimit">Offline Cache Limit (MB)</Label>
                        <Input type="number" placeholder="500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Symbology Customization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Symbology Customization</CardTitle>
                    <CardDescription>Customize colors and symbols for different data types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Claim Status Colors</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Approved", color: "#28a745", value: "approved" },
                            { label: "Pending", color: "#ffc107", value: "pending" },
                            { label: "Rejected", color: "#dc3545", value: "rejected" },
                            { label: "Under Review", color: "#6c757d", value: "review" }
                          ].map((item) => (
                            <div key={item.value} className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">LULC Classification Colors</h4>
                        <div className="space-y-2">
                          {[
                            { label: "Forest", color: "#228b22", value: "forest" },
                            { label: "Agriculture", color: "#90ee90", value: "agriculture" },
                            { label: "Water", color: "#4169e1", value: "water" },
                            { label: "Built-up", color: "#696969", value: "built" }
                          ].map((item) => (
                            <div key={item.value} className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded border"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* AI & Processing Settings */}
            {activeSection === "ai" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">AI & Processing Settings</h2>
                
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>OCR Engine Configuration</CardTitle>
                      <CardDescription>Configure optical character recognition settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ocrEngine">Primary OCR Engine</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Tesseract (MVP)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tesseract">Tesseract (MVP)</SelectItem>
                              <SelectItem value="surya">doctr/surya (Production)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="processingQuality">Processing Quality</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Balanced" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="speed">Speed Priority</SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                              <SelectItem value="accuracy">Accuracy Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Language Models</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {["Hindi", "English", "Odia", "Telugu", "Bengali"].map((lang) => (
                            <div key={lang} className="flex items-center space-x-2">
                              <Switch id={lang} />
                              <label htmlFor={lang} className="text-sm">{lang}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium mb-3 block">Confidence Thresholds</Label>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Auto-accept threshold</span>
                              <span className="text-sm text-muted-foreground">95%</span>
                            </div>
                            <Input type="range" min="80" max="100" defaultValue="95" className="w-full" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">Human review threshold</span>
                              <span className="text-sm text-muted-foreground">70-94%</span>
                            </div>
                            <Input type="range" min="50" max="95" defaultValue="70" className="w-full" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>NER Pipeline Settings</CardTitle>
                      <CardDescription>Configure named entity recognition and extraction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Entity Extraction Models</Label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Legal NER Model (opennyaiorg)</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Custom FRA Model</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">Entity Types to Extract</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {[
                            "Claimant Names",
                            "Administrative Units",
                            "Claim Types",
                            "Areas and Measurements",
                            "Dates",
                            "Reference Numbers"
                          ].map((entity) => (
                            <div key={entity} className="flex items-center space-x-2">
                              <Switch id={entity} defaultChecked />
                              <label htmlFor={entity} className="text-sm">{entity}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Security & Privacy Settings */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Security & Privacy Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Data Protection</CardTitle>
                    <CardDescription>Configure data handling and privacy protection measures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="piiHandling">Data Anonymization Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Partial (Role-based)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full</SelectItem>
                            <SelectItem value="partial">Partial</SelectItem>
                            <SelectItem value="none">None (Admin only)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="auditRetention">Audit Trail Retention</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="2 years" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1year">1 year</SelectItem>
                            <SelectItem value="2years">2 years</SelectItem>
                            <SelectItem value="5years">5 years</SelectItem>
                            <SelectItem value="indefinite">Indefinite</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="backupFreq">Data Backup Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Daily" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Access Control</CardTitle>
                    <CardDescription>Manage login security and access restrictions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="30 minutes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15min">15 minutes</SelectItem>
                            <SelectItem value="30min">30 minutes</SelectItem>
                            <SelectItem value="1hour">1 hour</SelectItem>
                            <SelectItem value="4hours">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="failedAttempts">Failed Login Threshold</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="5 attempts" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                            <SelectItem value="10">10 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ipWhitelist">IP Whitelisting</Label>
                        <p className="text-sm text-muted-foreground">Restrict access to specific IP ranges</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Management Settings */}
            {activeSection === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">User Management</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>

                {/* User Search and Filters */}
                <Card>
                  <CardHeader>
                    <CardTitle>Search & Filter Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search by name, email, or organization..."
                          className="w-full"
                        />
                      </div>
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="official">Official</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                          <SelectItem value="viewer">Public Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Users Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { name: "Rajesh Kumar", email: "rajesh@tribal.gov.in", role: "Admin", status: "Active", lastLogin: "2 hours ago" },
                          { name: "Anita Devi", email: "anita@forest.mp.gov.in", role: "Official", status: "Active", lastLogin: "1 day ago" },
                          { name: "Mohan Singh", email: "mohan@revenue.gov.in", role: "Reviewer", status: "Inactive", lastLogin: "1 week ago" },
                        ].map((user, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                                {user.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Invite Users */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Invite Users</CardTitle>
                      <CardDescription>Send email invitations with configurable access</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="inviteEmail">Email Address</Label>
                        <Input id="inviteEmail" type="email" placeholder="user@example.gov.in" />
                      </div>
                      <div>
                        <Label htmlFor="inviteRole">Assign Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="official">Official</SelectItem>
                            <SelectItem value="reviewer">Reviewer</SelectItem>
                            <SelectItem value="viewer">Public Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="accessExpiry">Access Expiration</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30days">30 Days</SelectItem>
                            <SelectItem value="90days">90 Days</SelectItem>
                            <SelectItem value="1year">1 Year</SelectItem>
                            <SelectItem value="permanent">Permanent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invitation
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Login History & Session Logs */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Login History & Sessions</CardTitle>
                      <CardDescription>Monitor user activity and sessions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <Activity className="h-4 w-4 mr-2" />
                          View Logs
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">Recent Activity</div>
                        {[
                          { user: "Rajesh Kumar", action: "Login", time: "2 hours ago", ip: "192.168.1.10" },
                          { user: "Anita Devi", action: "Claim Updated", time: "3 hours ago", ip: "10.0.0.15" },
                          { user: "Mohan Singh", action: "Document Viewed", time: "1 day ago", ip: "172.16.0.5" }
                        ].map((log, index) => (
                          <div key={index} className="flex justify-between items-center text-xs p-2 bg-muted/50 rounded">
                            <div>
                              <div className="font-medium">{log.user}</div>
                              <div className="text-muted-foreground">{log.action}</div>
                            </div>
                            <div className="text-right">
                              <div>{log.time}</div>
                              <div className="text-muted-foreground">{log.ip}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Integration & APIs Settings */}
            {activeSection === "integration" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Integration & APIs</h2>

                <div className="grid gap-6">
                  {/* API Keys Configuration */}
                  <Card>
                    <CardHeader>
                      <CardTitle>External System API Keys</CardTitle>
                      <CardDescription>Configure API keys for external system integration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: "DILRMP API", description: "Digital India Land Records Modernization", status: "Connected" },
                        { name: "Gati Shakti API", description: "National Master Plan Integration", status: "Pending" },
                        { name: "PM-KISAN API", description: "Farmer Database Integration", status: "Disconnected" }
                      ].map((api, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-medium">{api.name}</div>
                            <div className="text-sm text-muted-foreground">{api.description}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={api.status === "Connected" ? "default" : api.status === "Pending" ? "secondary" : "destructive"}>
                              {api.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Key className="h-3 w-3 mr-1" />
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* API Endpoints Control */}
                    <Card>
                      <CardHeader>
                        <CardTitle>API Endpoints</CardTitle>
                        <CardDescription>Enable/disable endpoints with rate limiting</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { endpoint: "/api/claims", description: "Claims data access", enabled: true, rateLimit: "100/hour" },
                          { endpoint: "/api/documents", description: "Document processing", enabled: true, rateLimit: "50/hour" },
                          { endpoint: "/api/maps", description: "Map tile serving", enabled: false, rateLimit: "1000/hour" },
                          { endpoint: "/api/analytics", description: "Analytics data", enabled: true, rateLimit: "200/hour" }
                        ].map((api, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-mono text-sm">{api.endpoint}</div>
                              <div className="text-xs text-muted-foreground">{api.description}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{api.rateLimit}</span>
                              <Switch checked={api.enabled} />
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Webhooks */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Webhooks</CardTitle>
                        <CardDescription>Real-time event notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="webhookUrl">Webhook URL</Label>
                          <Input id="webhookUrl" placeholder="https://your-system.gov.in/webhook" />
                        </div>
                        
                        <div>
                          <Label>Event Types</Label>
                          <div className="space-y-2 mt-2">
                            {[
                              "New Claim Submitted",
                              "Claim Status Updated", 
                              "Asset Map Updated",
                              "Document Processed"
                            ].map((event) => (
                              <div key={event} className="flex items-center justify-between">
                                <span className="text-sm">{event}</span>
                                <Switch />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">Test Webhook</Button>
                          <Button className="flex-1">Save Webhook</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* OAuth2 Credentials */}
                  <Card>
                    <CardHeader>
                      <CardTitle>OAuth2 Client Credentials</CardTitle>
                      <CardDescription>Generate and manage OAuth2 credentials for secure access</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Client Name</TableHead>
                              <TableHead>Client ID</TableHead>
                              <TableHead>Scopes</TableHead>
                              <TableHead>Created</TableHead>
                              <TableHead>Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {[
                              { name: "Mobile App", clientId: "fra_mobile_***", scopes: "read, write", created: "2024-01-15" },
                              { name: "Analytics Dashboard", clientId: "fra_analytics_***", scopes: "read", created: "2024-02-01" }
                            ].map((client, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{client.name}</TableCell>
                                <TableCell className="font-mono text-sm">{client.clientId}</TableCell>
                                <TableCell>{client.scopes}</TableCell>
                                <TableCell>{client.created}</TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button size="sm" variant="outline">Regenerate</Button>
                                    <Button size="sm" variant="destructive">Revoke</Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Generate New Client
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Mobile & Accessibility Settings */}
            {activeSection === "mobile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Mobile & Accessibility</h2>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Mobile App Features */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Mobile App Features</CardTitle>
                      <CardDescription>Configure mobile application settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { feature: "Offline Sync", description: "Enable offline data synchronization", enabled: true },
                        { feature: "Push Notifications", description: "Real-time claim status updates", enabled: true },
                        { feature: "GPS Location", description: "Auto-detect claim coordinates", enabled: true },
                        { feature: "Camera Integration", description: "Document capture and upload", enabled: false },
                        { feature: "Biometric Auth", description: "Fingerprint/Face ID login", enabled: false }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.feature}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch checked={item.enabled} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Language & Regional Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Language & Regional Support</CardTitle>
                      <CardDescription>Configure multi-language and RTL support</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Available Language Packs</Label>
                        <div className="space-y-2 mt-2">
                          {[
                            { lang: "English", code: "en", enabled: true, rtl: false },
                            { lang: "हिंदी (Hindi)", code: "hi", enabled: true, rtl: false },
                            { lang: "ଓଡ଼ିଆ (Odia)", code: "or", enabled: false, rtl: false },
                            { lang: "తెలుగు (Telugu)", code: "te", enabled: false, rtl: false },
                            { lang: "বাংলা (Bengali)", code: "bn", enabled: false, rtl: false }
                          ].map((lang, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium">{lang.lang}</span>
                                <Badge variant="outline" className="text-xs">{lang.code}</Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                {lang.rtl && <Badge variant="secondary" className="text-xs">RTL</Badge>}
                                <Switch checked={lang.enabled} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Languages className="h-4 w-4 mr-2" />
                        Configure Regional Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* WCAG Compliance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>WCAG 2.1 AA Compliance</CardTitle>
                      <CardDescription>Accessibility settings for better user experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { setting: "High Contrast Mode", description: "Enhanced color contrast", enabled: false },
                        { setting: "Screen Reader Labels", description: "ARIA labels and descriptions", enabled: true },
                        { setting: "Keyboard Navigation", description: "Full keyboard accessibility", enabled: true },
                        { setting: "Font Size Controls", description: "User-adjustable text size", enabled: true },
                        { setting: "Focus Indicators", description: "Clear focus highlighting", enabled: true }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.setting}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                          <Switch checked={item.enabled} />
                        </div>
                      ))}

                      <Button variant="outline" className="w-full">
                        <Accessibility className="h-4 w-4 mr-2" />
                        Run Accessibility Audit
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Device Security */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Device Security Policies</CardTitle>
                      <CardDescription>Security settings for mobile devices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="30 minutes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15min">15 minutes</SelectItem>
                            <SelectItem value="30min">30 minutes</SelectItem>
                            <SelectItem value="1hour">1 hour</SelectItem>
                            <SelectItem value="4hours">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Authentication Requirements</Label>
                        {[
                          { policy: "Require PIN/Password", enabled: true },
                          { policy: "Enable Biometric Auth", enabled: false },
                          { policy: "Auto-lock on Idle", enabled: true },
                          { policy: "Wipe on Failed Attempts", enabled: false }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{item.policy}</span>
                            <Switch checked={item.enabled} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* System Administration Settings */}
            {activeSection === "system" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">System Administration</h2>

                <div className="grid gap-6">
                  {/* Database Management */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Database Backup & Restore</CardTitle>
                      <CardDescription>Manage database backups and restoration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="backupFreq">Backup Frequency</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Daily" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="backupTime">Backup Time</Label>
                          <Input type="time" defaultValue="02:00" />
                        </div>
                        <div>
                          <Label htmlFor="retention">Retention Period</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="30 days" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7days">7 days</SelectItem>
                              <SelectItem value="30days">30 days</SelectItem>
                              <SelectItem value="90days">90 days</SelectItem>
                              <SelectItem value="1year">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          <Database className="h-4 w-4 mr-2" />
                          Backup Now
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Restore from Backup
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Backup
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label>Recent Backups</Label>
                        {[
                          { date: "2024-03-15 02:00", size: "2.4 GB", status: "Success" },
                          { date: "2024-03-14 02:00", size: "2.3 GB", status: "Success" },
                          { date: "2024-03-13 02:00", size: "2.3 GB", status: "Failed" }
                        ].map((backup, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                            <span>{backup.date}</span>
                            <span>{backup.size}</span>
                            <Badge variant={backup.status === "Success" ? "default" : "destructive"}>
                              {backup.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Audit Logs */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Audit Log Viewer</CardTitle>
                        <CardDescription>View and export system audit logs</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Select>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="All Activities" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Activities</SelectItem>
                              <SelectItem value="login">Login/Logout</SelectItem>
                              <SelectItem value="data">Data Changes</SelectItem>
                              <SelectItem value="api">API Calls</SelectItem>
                              <SelectItem value="system">System Events</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {[
                            { time: "15:32", user: "admin", action: "User created", details: "New user: john@example.gov.in" },
                            { time: "15:30", user: "rajesh", action: "Claim updated", details: "Claim ID: FRA-2024-001" },
                            { time: "15:28", user: "system", action: "Backup completed", details: "Daily backup successful" },
                            { time: "15:25", user: "anita", action: "Document uploaded", details: "Document: survey_report.pdf" }
                          ].map((log, index) => (
                            <div key={index} className="text-xs p-2 bg-muted/30 rounded">
                              <div className="flex justify-between items-start">
                                <span className="font-mono">{log.time}</span>
                                <span className="font-medium">{log.user}</span>
                              </div>
                              <div className="font-medium">{log.action}</div>
                              <div className="text-muted-foreground">{log.details}</div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Logs
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Download className="h-4 w-4 mr-2" />
                            Export Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Feature Flags */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Feature Flags</CardTitle>
                        <CardDescription>Enable/disable beta modules and features</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { feature: "AI Scoring", description: "Machine learning claim scoring", enabled: false, beta: true },
                          { feature: "Change Detection", description: "Satellite-based change detection", enabled: true, beta: true },
                          { feature: "Mobile Offline Mode", description: "Offline data synchronization", enabled: true, beta: false },
                          { feature: "Advanced Analytics", description: "Enhanced reporting dashboard", enabled: false, beta: true }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.feature}</span>
                                {item.beta && <Badge variant="secondary" className="text-xs">Beta</Badge>}
                              </div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                            <Switch checked={item.enabled} />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* System Health Dashboard */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Health Dashboard</CardTitle>
                      <CardDescription>Monitor system performance and status</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                          { metric: "CPU Usage", value: "45%", status: "good", icon: Server },
                          { metric: "Memory", value: "2.1/8 GB", status: "good", icon: Database },
                          { metric: "Tile Server", value: "Online", status: "good", icon: Map },
                          { metric: "Job Queue", value: "12 pending", status: "warning", icon: Clock }
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="text-center p-4 border rounded-lg">
                              <Icon className={`h-8 w-8 mx-auto mb-2 ${
                                item.status === "good" ? "text-green-500" : 
                                item.status === "warning" ? "text-yellow-500" : "text-red-500"
                              }`} />
                              <div className="font-medium">{item.metric}</div>
                              <div className="text-lg font-bold">{item.value}</div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="space-y-3">
                        <Label>System Services</Label>
                        {[
                          { service: "Web Server", status: "Running", uptime: "45 days" },
                          { service: "Database", status: "Running", uptime: "45 days" },
                          { service: "File Storage", status: "Running", uptime: "30 days" },
                          { service: "Background Jobs", status: "Warning", uptime: "2 days" }
                        ].map((service, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded">
                            <div className="flex items-center gap-3">
                              {service.status === "Running" ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              )}
                              <span className="font-medium">{service.service}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{service.status}</div>
                              <div className="text-xs text-muted-foreground">Uptime: {service.uptime}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Show placeholder for remaining sections */}
            {!["general", "map", "ai", "security", "users", "integration", "mobile", "system"].includes(activeSection) && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">
                  {settingsSections.find(s => s.id === activeSection)?.label}
                </h2>
                <p className="text-muted-foreground">Configuration options for this section will be available soon.</p>
              </div>
            )}

            {/* Action Buttons */}
            <Separator />
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button type="button" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;