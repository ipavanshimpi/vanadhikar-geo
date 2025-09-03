import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Download, 
  Maximize,
  ChevronDown,
  ChevronRight,
  Calendar,
  Filter
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const SatelliteMapView = () => {
  const [forestTypeOpen, setForestTypeOpen] = useState(true);
  const [villageOpen, setVillageOpen] = useState(true);
  const [selectedForestTypes, setSelectedForestTypes] = useState({
    all: true,
    deciduous: true,
    evergreen: true,
    mixed: true
  });
  const [selectedVillages, setSelectedVillages] = useState({
    all: true,
    marol: true,
    kherwadi: true
  });

  // Mock data for charts
  const forestDensityData = [
    { year: '2018', density: 85 },
    { year: '2019', density: 88 },
    { year: '2020', density: 90 },
    { year: '2021', density: 92 }
  ];

  const changeOverTimeData = [
    { year: '2003', change: 35 },
    { year: '2007', change: 45 },
    { year: '2010', change: 55 },
    { year: '2017', change: 72 },
    { year: '2018', change: 78 },
    { year: '2021', change: 85 }
  ];

  const forestDensityTrendData = [
    { year: '2003', density: 40 },
    { year: '2007', density: 52 },
    { year: '2010', density: 58 },
    { year: '2018', density: 72 },
    { year: '2021', density: 78 }
  ];

  const handleForestTypeChange = (type: string, checked: boolean) => {
    setSelectedForestTypes(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleVillageChange = (village: string, checked: boolean) => {
    setSelectedVillages(prev => ({
      ...prev,
      [village]: checked
    }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium">{`Year: ${label}`}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {`${payload[0].name}: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 flex bg-background">
      {/* Left Sidebar - Filters */}
      <div className="w-80 bg-card border-r border-border p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-foreground">SATELLITE IMAGERY ANALYSIS</h2>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">FILTER BY</h3>
          </div>
        </div>

        {/* Forest Type Filter */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto text-left"
            onClick={() => setForestTypeOpen(!forestTypeOpen)}
          >
            <span className="text-base font-semibold text-foreground">Forest Type</span>
            {forestTypeOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          
          {forestTypeOpen && (
            <div className="space-y-3 pl-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'deciduous', label: 'Deciduous' },
                { key: 'evergreen', label: 'Evergreen' },
                { key: 'mixed', label: 'Mixed' }
              ].map((type) => (
                <div key={type.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`forest-${type.key}`}
                    checked={selectedForestTypes[type.key as keyof typeof selectedForestTypes]}
                    onCheckedChange={(checked) => handleForestTypeChange(type.key, checked as boolean)}
                  />
                  <label 
                    htmlFor={`forest-${type.key}`}
                    className="text-sm font-medium text-foreground cursor-pointer"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Village Filter */}
        <div className="space-y-3">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto text-left"
            onClick={() => setVillageOpen(!villageOpen)}
          >
            <span className="text-base font-semibold text-foreground">Village</span>
            {villageOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
          
          {villageOpen && (
            <div className="space-y-3 pl-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'marol', label: 'Marol' },
                { key: 'kherwadi', label: 'Kherwadi' }
              ].map((village) => (
                <div key={village.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={`village-${village.key}`}
                    checked={selectedVillages[village.key as keyof typeof selectedVillages]}
                    onCheckedChange={(checked) => handleVillageChange(village.key, checked as boolean)}
                  />
                  <label 
                    htmlFor={`village-${village.key}`}
                    className="text-sm font-medium text-foreground cursor-pointer"
                  >
                    {village.label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Date</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">From</label>
              <div className="flex items-center space-x-2 p-2 border border-border rounded-md bg-muted/50">
                <span className="text-sm">01/01/2018</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">To</label>
              <div className="flex items-center space-x-2 p-2 border border-border rounded-md bg-muted/50">
                <span className="text-sm">12/31/2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Date Filter */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-foreground">Date</h3>
          <Select defaultValue="01/01/2018">
            <SelectTrigger className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01/01/2018">01/01/2018</SelectItem>
              <SelectItem value="01/01/2019">01/01/2019</SelectItem>
              <SelectItem value="01/01/2020">01/01/2020</SelectItem>
              <SelectItem value="01/01/2021">01/01/2021</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 relative">
        {/* Satellite Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-green-800/60 overflow-hidden">
          {/* Mock Satellite Imagery Background */}
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.8) 0%, transparent 25%),
                radial-gradient(circle at 70% 60%, rgba(22, 163, 74, 0.6) 0%, transparent 35%),
                radial-gradient(circle at 20% 80%, rgba(21, 128, 61, 0.7) 0%, transparent 30%),
                radial-gradient(circle at 80% 30%, rgba(20, 83, 45, 0.5) 0%, transparent 40%),
                linear-gradient(135deg, rgba(5, 46, 22, 0.8) 0%, rgba(22, 101, 52, 0.6) 100%)
              `,
              backgroundSize: '200px 200px, 150px 150px, 180px 180px, 220px 220px, 100% 100%'
            }}
          />

          {/* Village Boundary Overlay */}
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="forestPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                <rect width="4" height="4" fill="rgba(34, 197, 94, 0.1)" />
                <circle cx="2" cy="2" r="1" fill="rgba(34, 197, 94, 0.3)" />
              </pattern>
            </defs>
            
            {/* Village boundaries */}
            <path
              d="M 200 150 Q 350 100 500 180 Q 600 280 550 400 Q 400 450 250 380 Q 150 300 200 150 Z"
              fill="url(#forestPattern)"
              stroke="#f97316"
              strokeWidth="3"
              opacity="0.8"
            />
            <path
              d="M 600 200 Q 750 150 850 250 Q 900 350 800 420 Q 700 450 600 380 Q 550 300 600 200 Z"
              fill="rgba(168, 85, 247, 0.1)"
              stroke="#f97316"
              strokeWidth="3"
              opacity="0.8"
            />
          </svg>

          {/* LULC Areas */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Forest areas */}
            <div className="absolute w-32 h-24 bg-green-600/60 rounded-lg -translate-x-20 -translate-y-16"></div>
            <div className="absolute w-28 h-20 bg-green-700/70 rounded-lg translate-x-12 -translate-y-8"></div>
            
            {/* Water bodies */}
            <div className="absolute w-16 h-12 bg-blue-500/70 rounded-full translate-x-8 translate-y-12"></div>
            
            {/* Urban areas */}
            <div className="absolute w-20 h-16 bg-amber-600/60 rounded -translate-x-16 translate-y-8"></div>
            
            {/* Settlement areas */}
            <div className="absolute w-12 h-8 bg-orange-500/60 rounded translate-x-20 translate-y-4"></div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>

        {/* LULC Legend */}
        <Card className="absolute top-4 right-20 w-40 bg-card/90 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">LULC</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-green-600 rounded"></div>
                <span>Forest</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-blue-500 rounded"></div>
                <span>Water</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-amber-600 rounded"></div>
                <span>Urban</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-3 bg-orange-500 rounded"></div>
                <span>Other</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Charts */}
        <div className="absolute bottom-4 left-4 right-4 flex space-x-4">
          {/* Forest Density Chart */}
          <Card className="flex-1 bg-card/90 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Forest Density</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={forestDensityData}>
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="density" 
                      fill="hsl(var(--primary))"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Change Over Time Chart */}
          <Card className="flex-1 bg-card/90 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Change Over Time</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={changeOverTimeData}>
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="change" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Forest Density Trend Chart */}
          <Card className="flex-1 bg-card/90 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Forest Density Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forestDensityTrendData}>
                    <XAxis 
                      dataKey="year" 
                      tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="density" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SatelliteMapView;