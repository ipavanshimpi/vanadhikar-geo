import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import {
  User,
  MapPin,
  Shield,
  Settings,
  GraduationCap,
  BarChart3,
  Camera,
  Phone,
  Mail,
  Building,
  Globe,
  Calendar,
  Clock,
  Award,
  Target,
  TrendingUp,
  Users,
  FileText,
  Save,
  RefreshCw
} from "lucide-react";

const Profile = () => {
  const { register, handleSubmit, watch, setValue } = useForm();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const userRole = "District Collector";
  const userName = "Ramesh Kumar";
  const userInitials = "RK";

  const onSubmit = (data: any) => {
    console.log('Profile data:', data);
    setIsEditing(false);
  };

  const getRoleBadgeColor = (role: string) => {
    const colors = {
      "System Admin": "bg-red-600",
      "District Collector": "bg-blue-600", 
      "Forest Officer": "bg-green-600",
      "Gram Sabha Member": "bg-orange-600",
      "CSO Partner": "bg-purple-600",
      "Data Analyst": "bg-teal-600"
    };
    return colors[role as keyof typeof colors] || "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                  <AvatarFallback className="text-2xl font-bold bg-primary/10">{userInitials}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  variant="secondary"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-foreground">{userName}</h1>
                  <Badge className={`${getRoleBadgeColor(userRole)} text-white`}>
                    {userRole}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">Forest Rights Administration, Madhya Pradesh</p>
                <p className="text-sm text-muted-foreground">User ID: MP-DC-2024-001 | Last login: Today, 09:30 AM</p>
                
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Bhopal District</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>English, Hindi</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "secondary" : "default"}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="jurisdiction" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Jurisdiction
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Access
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Training
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Personal details and contact information for your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        defaultValue={userName}
                        disabled={!isEditing}
                        {...register("fullName")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fatherName">Father's/Spouse Name</Label>
                      <Input 
                        id="fatherName" 
                        defaultValue="Shri Mohan Kumar"
                        disabled={!isEditing}
                        {...register("fatherName")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation/Position</Label>
                      <Input 
                        id="designation" 
                        defaultValue="District Collector"
                        disabled={!isEditing}
                        {...register("designation")}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input 
                        id="employeeId" 
                        defaultValue="MP-DC-2024-001"
                        disabled={!isEditing}
                        {...register("employeeId")}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="primaryPhone">Primary Phone</Label>
                        <Input 
                          id="primaryPhone" 
                          defaultValue="+91 98765 43210"
                          disabled={!isEditing}
                          {...register("primaryPhone")}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="officialEmail">Official Email</Label>
                        <Input 
                          id="officialEmail" 
                          type="email"
                          defaultValue="collector.bhopal@mp.gov.in"
                          disabled={!isEditing}
                          {...register("officialEmail")}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Address Details
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="officeAddress">Office Address</Label>
                        <Textarea 
                          id="officeAddress" 
                          defaultValue="District Collectorate, Bhopal, Madhya Pradesh - 462001"
                          disabled={!isEditing}
                          {...register("officeAddress")}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jurisdiction Tab */}
            <TabsContent value="jurisdiction" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Geographic Responsibilities
                  </CardTitle>
                  <CardDescription>
                    Areas and communities under your jurisdiction
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Primary State Assignment</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Madhya Pradesh" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp">Madhya Pradesh</SelectItem>
                          <SelectItem value="tripura">Tripura</SelectItem>
                          <SelectItem value="odisha">Odisha</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Districts Under Jurisdiction</Label>
                      <Select disabled={!isEditing}>
                        <SelectTrigger>
                          <SelectValue placeholder="Bhopal, Sehore" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bhopal">Bhopal</SelectItem>
                          <SelectItem value="sehore">Sehore</SelectItem>
                          <SelectItem value="raisen">Raisen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Tribal Areas Specialization</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch id="pvtg" disabled={!isEditing} defaultChecked />
                        <Label htmlFor="pvtg">PVTG Communities</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="schedule5" disabled={!isEditing} defaultChecked />
                        <Label htmlFor="schedule5">5th Schedule Areas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="tribal-groups" disabled={!isEditing} />
                        <Label htmlFor="tribal-groups">Specific Tribal Groups</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Coverage Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">12</div>
                          <div className="text-sm text-muted-foreground">Blocks</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">145</div>
                          <div className="text-sm text-muted-foreground">Villages</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">89</div>
                          <div className="text-sm text-muted-foreground">Gram Sabhas</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">25,000+</div>
                          <div className="text-sm text-muted-foreground">Beneficiaries</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Access Control Tab */}
            <TabsContent value="access" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Access Control Matrix
                  </CardTitle>
                  <CardDescription>
                    Your permissions and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Role-Based Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span>District-level Data Access</span>
                          </div>
                          <Badge variant="default" className="bg-green-600 text-white">Granted</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span>Claim Approval Workflow</span>
                          </div>
                          <Badge variant="default" className="bg-green-600 text-white">Granted</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-green-600" />
                            <span>Reports and Analytics</span>
                          </div>
                          <Badge variant="default" className="bg-green-600 text-white">Granted</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-orange-600" />
                            <span>User Management</span>
                          </div>
                          <Badge variant="secondary">Limited</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-red-600" />
                            <span>System Configuration</span>
                          </div>
                          <Badge variant="destructive">Denied</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-green-600" />
                            <span>API Access</span>
                          </div>
                          <Badge variant="default" className="bg-green-600 text-white">Granted</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Login History</h4>
                    <ScrollArea className="h-48 w-full border rounded-lg p-4">
                      <div className="space-y-3">
                        {[
                          { date: "Today, 09:30 AM", device: "Windows Desktop", location: "Bhopal, MP" },
                          { date: "Yesterday, 06:45 PM", device: "Android Mobile", location: "Bhopal, MP" },
                          { date: "Jan 15, 02:30 PM", device: "Windows Desktop", location: "Bhopal, MP" },
                          { date: "Jan 14, 11:15 AM", device: "iPad", location: "Sehore, MP" },
                          { date: "Jan 13, 04:20 PM", device: "Windows Desktop", location: "Bhopal, MP" }
                        ].map((login, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border-b">
                            <div>
                              <div className="text-sm font-medium">{login.date}</div>
                              <div className="text-xs text-muted-foreground">{login.device} • {login.location}</div>
                            </div>
                            <Badge variant="outline">Success</Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Security Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">Secure your account with SMS verification</p>
                        </div>
                        <Switch defaultChecked disabled={!isEditing} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Session Timeout</Label>
                          <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                        </div>
                        <Select disabled={!isEditing}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="30 min" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 min</SelectItem>
                            <SelectItem value="30">30 min</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Workflow Customization
                  </CardTitle>
                  <CardDescription>
                    Customize your dashboard and notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Language & Localization</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Primary Interface Language</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue placeholder="English" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="or">Odia</SelectItem>
                            <SelectItem value="te">Telugu</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Secondary Language for Documents</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue placeholder="Hindi" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="or">Odia</SelectItem>
                            <SelectItem value="te">Telugu</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Notification Settings</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Claim updates and system alerts</p>
                        </div>
                        <Switch defaultChecked disabled={!isEditing} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Critical updates only</p>
                        </div>
                        <Switch disabled={!isEditing} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>In-app Notifications</Label>
                          <p className="text-sm text-muted-foreground">Real-time processing updates</p>
                        </div>
                        <Switch defaultChecked disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Dashboard Layout</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Landing Page</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue placeholder="Analytics Dashboard" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="analytics">Analytics Dashboard</SelectItem>
                            <SelectItem value="map">Map View</SelectItem>
                            <SelectItem value="claims">Claims Dashboard</SelectItem>
                            <SelectItem value="documents">Document Processing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Data Refresh Intervals</Label>
                        <Select disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue placeholder="15 minutes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Training Tab */}
            <TabsContent value="training" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Capacity Building Tracker
                  </CardTitle>
                  <CardDescription>
                    Your learning progress and certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">FRA Knowledge Assessment</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="text-center">
                          <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <div className="text-lg font-bold">Advanced</div>
                          <div className="text-sm text-muted-foreground">Current Level</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                          <div className="text-lg font-bold">92%</div>
                          <div className="text-sm text-muted-foreground">Last Score</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="text-lg font-bold">Dec 2024</div>
                          <div className="text-sm text-muted-foreground">Last Assessment</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">System Training Progress</h4>
                    <div className="space-y-3">
                      {[
                        { module: "OCR Validation Techniques", progress: 100, status: "Completed" },
                        { module: "DSS Rule Configuration", progress: 85, status: "In Progress" },
                        { module: "Advanced Analytics", progress: 60, status: "In Progress" },
                        { module: "Mobile App Administration", progress: 0, status: "Not Started" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium">{item.module}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${item.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4">
                          <Badge 
                            variant={item.status === "Completed" ? "default" : item.status === "In Progress" ? "secondary" : "outline"}
                            className={item.status === "Completed" ? "bg-green-600 text-white" : ""}
                          >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Certifications & Achievements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-yellow-600" />
                          <div>
                            <div className="font-medium">FRA Expert Certified</div>
                            <div className="text-sm text-muted-foreground">Issued: Nov 2024</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-8 w-8 text-blue-600" />
                          <div>
                            <div className="font-medium">Digital Governance</div>
                            <div className="text-sm text-muted-foreground">Issued: Oct 2024</div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Individual Performance Dashboard
                  </CardTitle>
                  <CardDescription>
                    Your work metrics and impact statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Claims Processing Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="p-4">
                        <div className="text-center">
                          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
                          <div className="text-2xl font-bold">1,247</div>
                          <div className="text-sm text-muted-foreground">Claims Processed</div>
                          <div className="text-xs text-green-600">+15% this month</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <div className="text-2xl font-bold">4.2</div>
                          <div className="text-sm text-muted-foreground">Avg Days/Claim</div>
                          <div className="text-xs text-blue-600">-0.8 days improved</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <Target className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold">96.5%</div>
                          <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                          <div className="text-xs text-purple-600">Above target</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="text-center">
                          <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                          <div className="text-2xl font-bold">8,450</div>
                          <div className="text-sm text-muted-foreground">Beneficiaries</div>
                          <div className="text-xs text-orange-600">Lives impacted</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">System Usage Analytics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="p-4">
                        <h5 className="font-medium mb-3">Most Used Features</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Claims Dashboard</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Map View</span>
                            <span className="text-sm font-medium">28%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Analytics</span>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Settings</span>
                            <span className="text-sm font-medium">9%</span>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <h5 className="font-medium mb-3">Device Usage</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Desktop</span>
                            <span className="text-sm font-medium">70%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Mobile</span>
                            <span className="text-sm font-medium">25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Tablet</span>
                            <span className="text-sm font-medium">5%</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;