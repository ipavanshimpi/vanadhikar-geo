import { useState } from "react";
import { Search, Download, Share2, Globe, TrendingUp, MapPin, Users, TreePine } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { stateOverviewData, villageAssetsData, timeSeriesData } from "@/data/atlasData";
import Header from "@/components/Header";

const GOOGLE_MAPS_API_KEY = "AIzaSyA9QWy5YEeJ7hgcqIy45jeNsDZ-7R6QD04";

// Color schemes for different metrics
const IMPLEMENTATION_COLORS = {
  excellent: "#1e7e34",
  good: "#28a745", 
  moderate: "#ffc107",
  poor: "#fd7e14",
  critical: "#dc3545"
};

const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Atlas = () => {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("hi");

  const getImplementationColor = (score: number) => {
    if (score >= 80) return IMPLEMENTATION_COLORS.excellent;
    if (score >= 60) return IMPLEMENTATION_COLORS.good;
    if (score >= 40) return IMPLEMENTATION_COLORS.moderate;
    if (score >= 20) return IMPLEMENTATION_COLORS.poor;
    return IMPLEMENTATION_COLORS.critical;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const totalStats = stateOverviewData.reduce((acc, state) => ({
    total_claims: acc.total_claims + state.total_claims,
    approved_claims: acc.approved_claims + state.approved_claims,
    pending_claims: acc.pending_claims + state.pending_claims,
    total_area: acc.total_area + state.total_area_recognized,
    villages: acc.villages + state.villages_covered
  }), { total_claims: 0, approved_claims: 0, pending_claims: 0, total_area: 0, villages: 0 });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <TreePine className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl font-bold font-heading text-foreground">
                वन अधिकार एटलस | Forest Rights Atlas
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Empowering Communities Through Data Transparency
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="od">ଓଡ଼ିଆ</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search village, district, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Key Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatNumber(totalStats.total_claims)}
                </div>
                <div className="text-sm text-muted-foreground">Claims Filed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {formatNumber(totalStats.pending_claims)}
                </div>
                <div className="text-sm text-muted-foreground">Still Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {formatNumber(totalStats.total_area)}
                </div>
                <div className="text-sm text-muted-foreground">Acres Recognized</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {formatNumber(totalStats.villages)}
                </div>
                <div className="text-sm text-muted-foreground">Villages Covered</div>
              </CardContent>
            </Card>
          </div>

          <Badge variant="outline" className="bg-card/50">
            Personal information protected. Aggregated data only.
          </Badge>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Panel - State Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>State Performance</span>
                </CardTitle>
                <CardDescription>
                  Implementation scorecard across states
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {stateOverviewData.map((state) => (
                  <div key={state.state_en} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{state.state_en}</span>
                      <Badge 
                        style={{ 
                          backgroundColor: getImplementationColor(state.implementation_score) + "20",
                          color: getImplementationColor(state.implementation_score),
                          borderColor: getImplementationColor(state.implementation_score)
                        }}
                      >
                        {state.implementation_score}/100
                      </Badge>
                    </div>
                    <Progress 
                      value={state.implementation_score} 
                      className="h-2"
                    />
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>Approved: {formatNumber(state.approved_claims)}</div>
                      <div>Pending: {formatNumber(state.pending_claims)}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Village Assets Explorer */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Village Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {villageAssetsData.map((village) => (
                  <div key={village.village_id} className="border rounded-lg p-3">
                    <div className="font-medium mb-2">
                      {village.village_name}, {village.district}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Forest: {village.forest_cover_percent}%</div>
                      <div>Water: {village.water_security_index > 0.5 ? 'Good' : 'Low'}</div>
                      <div>Claims: {village.households} HH</div>
                      <div>CFR: {village.cfr_recognized_hectares} ha</div>
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Interactive Map */}
          <div className="lg:col-span-1">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  Click on states to explore detailed data
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                  <Map
                    style={{ width: "100%", height: "500px" }}
                    defaultCenter={{ lat: 23.2599, lng: 77.4126 }}
                    defaultZoom={5}
                    mapId="fra-atlas-map"
                  >
                    {/* State markers */}
                    <Marker position={{ lat: 23.2599, lng: 77.4126 }} title="Madhya Pradesh" />
                    <Marker position={{ lat: 23.9408, lng: 91.9882 }} title="Tripura" />
                    <Marker position={{ lat: 20.9517, lng: 85.0985 }} title="Odisha" />
                    <Marker position={{ lat: 18.1124, lng: 79.0193 }} title="Telangana" />
                  </Map>
                </APIProvider>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analytics */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="trends" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Processing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={timeSeriesData.monthly_approvals}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="approvals" 
                          stroke="#28a745" 
                          strokeWidth={2}
                          name="Approvals"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rejections" 
                          stroke="#dc3545" 
                          strokeWidth={2}
                          name="Rejections"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Forest Cover Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={timeSeriesData.forest_change}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="forest_area" fill="#2d5016" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Success Stories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-sm">Tripura Leading</div>
                        <div className="text-xs text-muted-foreground">
                          Highest implementation score at 78%
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-sm">CFR Progress</div>
                        <div className="text-xs text-muted-foreground">
                          29,980+ community titles issued in MP
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Challenge Areas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-sm">High Rejection Rates</div>
                        <div className="text-xs text-muted-foreground">
                          Telangana: 57% rejection rate needs attention
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-sm">Pending Claims</div>
                        <div className="text-xs text-muted-foreground">
                          742K+ claims still awaiting processing
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Data Export</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download State Data
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Analysis
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Data updated regularly. Last refresh: {new Date().toLocaleDateString('en-IN')}
          </p>
          <p className="mt-2">
            Built for transparency and accountability in Forest Rights Act implementation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Atlas;