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
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

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

  // Google Maps API Key
  const GOOGLE_MAPS_API_KEY = "AIzaSyA9QWy5YEeJ7hgcqIy45jeNsDZ-7R6QD04";

  // Indian forest areas coordinates for markers
  const forestMarkers = [
    { id: 1, position: { lat: 21.9052, lng: 77.8901 }, title: "Khermai Village", type: "IFR" },
    { id: 2, position: { lat: 22.1234, lng: 78.1234 }, title: "Bargaon Village", type: "CFR" },
    { id: 3, position: { lat: 21.7890, lng: 77.6543 }, title: "Pipariya Village", type: "IFR" },
    { id: 4, position: { lat: 22.3456, lng: 78.4567 }, title: "Seoni Forest Area", type: "CFR" },
  ];

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
        {/* Google Maps Container */}
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <div className="absolute inset-0">
            <Map
              defaultCenter={{ lat: 22.0, lng: 78.0 }}
              defaultZoom={8}
              mapId="forest-rights-map"
              mapTypeId="satellite"
              className="w-full h-full"
            >
              {forestMarkers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  title={`${marker.title} - ${marker.type}`}
                />
              ))}
            </Map>
          </div>
        </APIProvider>

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