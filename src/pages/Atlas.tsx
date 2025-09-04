import { useState } from "react";
import { Search, Download, Share2, Globe, TrendingUp, MapPin, Users, TreePine, Layers, Brain, Camera, Filter, Settings, Play, Pause, RotateCcw, Maximize, Eye, EyeOff, Upload, Zap, RefreshCw, AlertTriangle, CheckCircle, Info, BarChart3, Activity, Satellite, Droplets, Home, Truck, Wifi, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
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
  
  // AI Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedAnalysisModel, setSelectedAnalysisModel] = useState("quick");
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  
  // Layer Management States
  const [activeLayers, setActiveLayers] = useState({
    administrative: true,
    forestRights: true,
    aiAssets: false,
    infrastructure: false,
    environmental: false
  });
  const [layerOpacity, setLayerOpacity] = useState({
    forestRights: 80,
    aiAssets: 70,
    infrastructure: 60,
    environmental: 50
  });
  
  // Filter States
  const [activeFilters, setActiveFilters] = useState({
    geographic: [],
    status: [],
    asset: []
  });
  
  // Analysis Panel States
  const [selectedAnalysisArea, setSelectedAnalysisArea] = useState<any>(null);
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [isTimeAnimationPlaying, setIsTimeAnimationPlaying] = useState(false);
  const [timeRange, setTimeRange] = useState([2020, 2025]);

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

  // Mock AI Analysis Functions
  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setShowAnalysisPanel(true);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisResults({
            agricultural: { area: 245.3, percentage: 34.2, confidence: 89.4 },
            forest: { area: 321.7, percentage: 44.8, confidence: 97.1 },
            water: { area: 28.4, percentage: 4.0, confidence: 91.8 },
            builtup: { area: 89.1, percentage: 12.4, confidence: 92.6 }
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const toggleLayer = (layerName: string) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };
  
  const updateLayerOpacity = (layerName: string, opacity: number) => {
    setLayerOpacity(prev => ({
      ...prev,
      [layerName]: opacity
    }));
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

      {/* AI-Powered Analysis Toolbar */}
      <div className="border-b bg-card/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={startAnalysis} 
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isAnalyzing ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Brain className="h-4 w-4 mr-2" />}
                {isAnalyzing ? 'Analyzing...' : 'Smart Analysis'}
              </Button>
              
              <Select value={selectedAnalysisModel} onValueChange={setSelectedAnalysisModel}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick Scan (30s)</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis (2-3m)</SelectItem>
                  <SelectItem value="precision">High-Precision (5m)</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Imagery
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsTimeAnimationPlaying(!isTimeAnimationPlaying)}
              >
                {isTimeAnimationPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {isAnalyzing && (
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Processing satellite imagery...</span>
                <Badge variant="secondary">{analysisProgress}%</Badge>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Panel - Layer Management & Filters */}
          <div className="lg:col-span-1">
            {/* Multi-Layer Control Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5" />
                  <span>Data Layers</span>
                </CardTitle>
                <CardDescription>
                  Manage map layers and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Administrative Boundaries */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Administrative Boundaries</Label>
                    <Switch 
                      checked={activeLayers.administrative}
                      onCheckedChange={() => toggleLayer('administrative')}
                    />
                  </div>
                  <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                    <div>• State & District Boundaries</div>
                    <div>• Block & Village Boundaries</div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Forest Rights Data */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Forest Rights Data</Label>
                    <Switch 
                      checked={activeLayers.forestRights}
                      onCheckedChange={() => toggleLayer('forestRights')}
                    />
                  </div>
                  {activeLayers.forestRights && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Opacity</span>
                        <span className="text-xs">{layerOpacity.forestRights}%</span>
                      </div>
                      <Slider
                        value={[layerOpacity.forestRights]}
                        onValueChange={([value]) => updateLayerOpacity('forestRights', value)}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  )}
                  <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                    <div>• IFR Parcels (Individual)</div>
                    <div>• CFR Boundaries (Community)</div>
                    <div>• CR Assets (Community Rights)</div>
                  </div>
                </div>
                
                <Separator />
                
                {/* AI-Generated Assets */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">AI-Generated Assets</Label>
                    <Switch 
                      checked={activeLayers.aiAssets}
                      onCheckedChange={() => toggleLayer('aiAssets')}
                    />
                  </div>
                  {activeLayers.aiAssets && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Opacity</span>
                        <span className="text-xs">{layerOpacity.aiAssets}%</span>
                      </div>
                      <Slider
                        value={[layerOpacity.aiAssets]}
                        onValueChange={([value]) => updateLayerOpacity('aiAssets', value)}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  )}
                  <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                    <div>• LULC Classification</div>
                    <div>• Water Security Index</div>
                    <div>• Forest Health Monitor</div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Infrastructure Data */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Infrastructure (PM Gati Shakti)</Label>
                    <Switch 
                      checked={activeLayers.infrastructure}
                      onCheckedChange={() => toggleLayer('infrastructure')}
                    />
                  </div>
                  <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                    <div>• Road & Railway Network</div>
                    <div>• Power Grid & Telecom</div>
                    <div>• Planned Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Filtering System */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Smart Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Asset-Based Filters</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="water-critical" />
                      <Label htmlFor="water-critical" className="text-xs">Water Security Critical</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="dense-forest" />
                      <Label htmlFor="dense-forest" className="text-xs">Dense Forest (&gt;75%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="high-productivity" />
                      <Label htmlFor="high-productivity" className="text-xs">High Agricultural Intensity</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">FRA Progress</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-rejection">High Rejection Rate</SelectItem>
                      <SelectItem value="zero-cfr">Zero CFR Claims</SelectItem>
                      <SelectItem value="pending-long">Long Pending Claims</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" className="w-full">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Enhanced Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="h-[800px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Satellite className="h-5 w-5" />
                    <span>AI-Enhanced WebGIS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      Real-time LULC
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Multi-layer satellite analysis with AI-powered asset detection
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 relative">
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                  <Map
                    style={{ width: "100%", height: "700px" }}
                    defaultCenter={{ lat: 23.2599, lng: 77.4126 }}
                    defaultZoom={6}
                    mapId="fra-atlas-enhanced-map"
                    mapTypeId="satellite"
                  >
                    {/* Enhanced markers with different colors based on data */}
                    <Marker position={{ lat: 23.2599, lng: 77.4126 }} title="Madhya Pradesh - Forest Rich" />
                    <Marker position={{ lat: 23.9408, lng: 91.9882 }} title="Tripura - High Implementation" />
                    <Marker position={{ lat: 20.9517, lng: 85.0985 }} title="Odisha - CFR Focus" />
                    <Marker position={{ lat: 18.1124, lng: 79.0193 }} title="Telangana - Challenges" />
                  </Map>
                </APIProvider>
                
                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Drawing Tools */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    Draw Area
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    Measure
                  </Button>
                </div>
                
                {/* Time Animation Control */}
                {isTimeAnimationPlaying && (
                  <div className="absolute bottom-4 right-4 bg-white/90 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">2020</span>
                      <Progress value={((new Date().getFullYear() - 2020) / 5) * 100} className="w-24 h-2" />
                      <span className="text-sm font-medium">2025</span>
                    </div>
                    <div className="text-xs text-center mt-1">Forest Cover Change</div>
                  </div>
                )}
                
                {/* LULC Legend */}
                <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 max-w-xs">
                  <div className="text-sm font-medium mb-2">Land Use Classification</div>
                  <div className="space-y-1 text-xs">
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-green-600 rounded"></div>
                       <span>Dense Forest (&gt;75%)</span>
                     </div>
                     <div className="flex items-center space-x-2">
                       <div className="w-3 h-3 bg-green-400 rounded"></div>
                       <span>Open Forest (40-75%)</span>
                     </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Agricultural Land</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Water Bodies</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded"></div>
                      <span>Built-up Area</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - AI Analysis Results & Infrastructure */}
          <div className="lg:col-span-1">
            <Tabs defaultValue="analysis" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="convergence">Schemes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="analysis" className="space-y-4">
                {analysisResults ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Analysis Complete</span>
                      </CardTitle>
                      <CardDescription>
                        Bhopal District - Village XYZ (717.5 hectares)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Agricultural Land */}
                      <div className="border rounded-lg p-3 bg-yellow-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span className="font-medium text-sm text-black">Agricultural Land</span>
                          </div>
                          <Badge variant="secondary">{analysisResults.agricultural.confidence}%</Badge>
                        </div>
                        <div className="text-2xl font-bold text-black">{analysisResults.agricultural.area} ha</div>
                        <div className="text-sm text-muted-foreground">{analysisResults.agricultural.percentage}% of total area</div>
                        <div className="text-xs mt-1">Active Crops: 180.1 ha | Fallow: 65.2 ha</div>
                      </div>
                      
                      {/* Forest Cover */}
                      <div className="border rounded-lg p-3 bg-green-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <TreePine className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-sm text-black">Forest Cover</span>
                          </div>
                          <Badge variant="secondary">{analysisResults.forest.confidence}%</Badge>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{analysisResults.forest.area} ha</div>
                        <div className="text-sm text-muted-foreground">{analysisResults.forest.percentage}% of total area</div>
                        <div className="text-xs mt-1">Dense: 201.4 ha | Open: 95.3 ha | Degraded: 25.0 ha</div>
                      </div>
                      
                      {/* Water Bodies */}
                      <div className="border rounded-lg p-3 bg-blue-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-sm text-black">Water Bodies</span>
                          </div>
                          <Badge variant="secondary">{analysisResults.water.confidence}%</Badge>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{analysisResults.water.area} ha</div>
                        <div className="text-sm text-muted-foreground">{analysisResults.water.percentage}% of total area</div>
                        <div className="text-xs mt-1">2 ponds | 3 streams | 2 check dams</div>
                      </div>
                      
                      {/* Built-up Area */}
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Home className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-sm text-black">Built-up Area</span>
                          </div>
                          <Badge variant="secondary">{analysisResults.builtup.confidence}%</Badge>
                        </div>
                        <div className="text-2xl font-bold text-gray-600">{analysisResults.builtup.area} ha</div>
                        <div className="text-sm text-muted-foreground">{analysisResults.builtup.percentage}% of total area</div>
                        <div className="text-xs mt-1">67 homesteads | 8 community buildings</div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="h-5 w-5" />
                        <span>AI Asset Detection</span>
                      </CardTitle>
                      <CardDescription>
                        Select an area on the map to analyze
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center py-8">
                      <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Draw a polygon on the map or upload satellite imagery to start AI-powered land use classification
                      </p>
                      <Button className="mt-4" onClick={startAnalysis}>
                        <Brain className="h-4 w-4 mr-2" />
                        Start Analysis
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="infrastructure" className="space-y-4">
                <Card>
                  <CardHeader>
                     <CardTitle className="flex items-center space-x-2">
                       <Truck className="h-5 w-5" />
                       <span>PM Gati Shakti Integration</span>
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="text-center">
                         <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                         <div className="text-sm font-medium">Road Connectivity</div>
                         <div className="text-2xl font-bold">87%</div>
                         <div className="text-xs text-muted-foreground">Villages connected</div>
                       </div>
                      <div className="text-center">
                        <Wifi className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Digital Coverage</div>
                        <div className="text-2xl font-bold">64%</div>
                        <div className="text-xs text-muted-foreground">4G availability</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Infrastructure Gaps</div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <span className="text-sm">23 villages without all-weather roads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-red-500" />
                          <span className="text-sm">15 villages with poor telecom coverage</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      View Planned Projects
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="convergence" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Scheme Convergence</CardTitle>
                    <CardDescription>
                      Automated eligibility mapping
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">PM-KISAN Eligible</span>
                        <Badge variant="secondary">1,247 HH</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">JJM Priority Villages</span>
                        <Badge variant="secondary">89 villages</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">MGNREGA Opportunities</span>
                        <Badge variant="secondary">456 works</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">DAJGUA Integration</span>
                        <Badge variant="secondary">23 PVTG habitations</Badge>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <ResponsiveContainer width="100%" height={150}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Enrolled', value: 65 },
                            { name: 'Eligible', value: 25 },
                            { name: 'Pending', value: 10 }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          dataKey="value"
                        >
                          {PIE_COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <Button variant="outline" className="w-full">
                      Generate Beneficiary Lists
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Real-Time Analysis Dashboard - Full Width */}
        {analysisResults && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Change Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Forest Loss (1 year)</span>
                    <Badge variant="destructive">-2.3 ha</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">New Settlements</span>
                    <Badge variant="secondary">+3 structures</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Water Body Changes</span>
                    <Badge variant="secondary">Stable</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Predictive Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Forest Health Risk</span>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Water Scarcity Risk</span>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Crop Yield Forecast</span>
                    <Badge variant="default">Good</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Data Export</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  GeoJSON Export
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  PDF Report
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            AI-powered analysis with 94.2% accuracy. Last model update: {new Date().toLocaleDateString('en-IN')}
          </p>
          <p className="mt-2">
            Enhanced FRA Atlas with Computer Vision & Multi-layer WebGIS Integration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Atlas;