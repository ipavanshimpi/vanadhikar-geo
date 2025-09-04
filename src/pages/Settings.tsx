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
  Upload
} from "lucide-react";

const Settings = () => {
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

            {/* Show placeholder for other sections */}
            {!["general", "map", "ai", "security"].includes(activeSection) && (
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