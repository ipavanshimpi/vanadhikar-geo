import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  RotateCcw, 
  Download, 
  Maximize,
  MapPin,
  TreePine,
  Home,
  X
} from "lucide-react";

const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedVillage, setSelectedVillage] = useState<any>(null);

  // Mock villages data for demonstration
  const villages = [
    {
      id: 1,
      name: "Khermai",
      district: "Betul",
      state: "Madhya Pradesh",
      coordinates: { lat: 21.9052, lng: 77.8901 },
      totalClaims: 156,
      approvedClaims: 89,
      pendingClaims: 45,
      rejectedClaims: 22,
      approvalRate: 57.1,
      tribalPopulation: 1247,
      forestArea: 834.5
    },
    {
      id: 2,
      name: "Jhiriya",
      district: "Betul", 
      state: "Madhya Pradesh",
      coordinates: { lat: 21.8234, lng: 77.9123 },
      totalClaims: 89,
      approvedClaims: 67,
      pendingClaims: 18,
      rejectedClaims: 4,
      approvalRate: 75.3,
      tribalPopulation: 892,
      forestArea: 567.2
    },
    {
      id: 3,
      name: "Multai",
      district: "Betul",
      state: "Madhya Pradesh", 
      coordinates: { lat: 21.7845, lng: 78.2567 },
      totalClaims: 234,
      approvedClaims: 145,
      pendingClaims: 67,
      rejectedClaims: 22,
      approvalRate: 62.0,
      tribalPopulation: 1856,
      forestArea: 1234.8
    }
  ];

  useEffect(() => {
    // This would be where MapLibre GL JS would be initialized
    // For now, we'll create a mock interactive map
    if (mapRef.current) {
      console.log('Map container ready for MapLibre GL JS initialization');
    }
  }, []);

  const handleVillageClick = (village: any) => {
    setSelectedVillage(village);
  };

  const getApprovalRateColor = (rate: number) => {
    if (rate >= 70) return 'bg-success';
    if (rate >= 50) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="relative flex-1 bg-muted/20 rounded-lg overflow-hidden">
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/60 map-container">
        {/* Mock India Map Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <TreePine className="h-24 w-24 text-primary/30 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-muted-foreground">Interactive Map</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                MapLibre GL JS would render here with satellite imagery, 
                village boundaries, claim polygons, and forest cover layers
              </p>
            </div>
          </div>
        </div>

        {/* Mock Village Markers */}
        {villages.map((village) => (
          <div
            key={village.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${30 + village.id * 20}%`,
              top: `${40 + village.id * 15}%`
            }}
            onClick={() => handleVillageClick(village)}
          >
            <div className={`w-4 h-4 rounded-full ${getApprovalRateColor(village.approvalRate)} border-2 border-white shadow-lg`}></div>
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <Badge variant="secondary" className="text-xs">
                {village.name}
              </Badge>
            </div>
          </div>
        ))}
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
          <Layers className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Legend */}
      <Card className="absolute bottom-4 left-4 w-64 bg-card/90 backdrop-blur">
        <CardContent className="pt-4">
          <h4 className="font-semibold mb-3 text-sm">Approval Rate Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span>High (≥70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span>Medium (50-69%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span>Low (&lt;50%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Village Info Panel */}
      {selectedVillage && (
        <Card className="absolute top-4 left-4 w-80 bg-card/95 backdrop-blur animate-slide-up">
          <CardContent className="pt-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedVillage.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedVillage.district}, {selectedVillage.state}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelectedVillage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{selectedVillage.totalClaims}</div>
                  <div className="text-xs text-muted-foreground">Total Claims</div>
                </div>
                <div className="text-center p-3 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{selectedVillage.approvalRate}%</div>
                  <div className="text-xs text-muted-foreground">Approval Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Approved:</span>
                  <span className="font-semibold text-success">{selectedVillage.approvedClaims}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending:</span>
                  <span className="font-semibold text-warning">{selectedVillage.pendingClaims}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rejected:</span>
                  <span className="font-semibold text-destructive">{selectedVillage.rejectedClaims}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tribal Population:</span>
                  <span className="font-semibold">{selectedVillage.tribalPopulation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Forest Area:</span>
                  <span className="font-semibold">{selectedVillage.forestArea} ha</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" className="flex-1 btn-government">
                  Generate Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapView;