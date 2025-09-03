import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import {
  Copy,
  MapPin,
  Calendar,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Upload
} from 'lucide-react';
import { Claim } from '../../data/sampleClaims';
import { format } from 'date-fns';

interface ClaimPreviewProps {
  claim: Claim | null;
  totalClaims: number;
}

export const ClaimPreview = ({ claim, totalClaims }: ClaimPreviewProps) => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyA9QWy5YEeJ7hgcqIy45jeNsDZ-7R6QD04";

  if (!claim) {
    return (
      <div className="p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Select a claim to view details</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Choose a claim from the table to see detailed information, documents, and processing status.
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="mt-6 p-4">
          <h4 className="font-semibold mb-3">Quick Statistics</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Claims</span>
              <span className="font-medium">{totalClaims}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Pending Review</span>
              <span className="font-medium text-warning">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Approved Today</span>
              <span className="font-medium text-green-500">3</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const getStatusProgress = (status: Claim['status']) => {
    const statusProgress = {
      'FILED_AT_GS': 25,
      'VERIFIED_BY_FRC': 50,
      'PENDING_AT_SDLC': 75,
      'APPROVED_BY_DLC': 100,
      'REJECTED': 0
    };
    return statusProgress[status];
  };

  const getDocumentIcon = (doc: any) => {
    if (doc.status === 'verified' || doc.status === 'georeferenced' || doc.status === 'processed') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return <AlertCircle className="w-4 h-4 text-warning" />;
  };

  const processingDays = Math.floor(
    (Date.now() - new Date(claim.filing_date).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-sm flex items-center gap-2">
            {claim.claim_id}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(claim.claim_id)}
              className="h-6 w-6 p-0"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <Badge variant={claim.status === 'APPROVED_BY_DLC' ? 'default' : 'secondary'}>
            {claim.status.replace(/_/g, ' ')}
          </Badge>
        </div>

        <div className="space-y-2">
          <Progress value={getStatusProgress(claim.status)} className="h-2" />
          <div className="text-sm text-muted-foreground">
            Processing progress • {processingDays} days in system
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Full
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Documents
          </Button>
        </div>
      </Card>

      {/* Claimant Information */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <User className="w-4 h-4" />
          Claimant Information
        </h4>
        
        <div className="space-y-3">
          <div>
            <div className="font-medium">{claim.claimant_name}</div>
            <div className="text-sm text-muted-foreground">
              S/o {claim.father_name}
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Tribe</span>
            <span className="text-sm font-medium">{claim.tribe}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Gram Sabha</span>
            <span className="text-sm font-medium">{claim.gram_sabha}</span>
          </div>
        </div>
      </Card>

      {/* Claim Details */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Claim Details
        </h4>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Type</span>
            <Badge variant="outline">
              {claim.claim_type === 'IFR' && '🏠 Individual Rights'}
              {claim.claim_type === 'CFR' && '🌳 Community Rights'}
              {claim.claim_type === 'CR' && '📋 Conversion Rights'}
            </Badge>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Area</span>
            <div className="text-right">
              <div className="text-sm font-medium">{claim.area_acres} acres</div>
              <div className="text-xs text-muted-foreground">
                {(claim.area_acres * 0.4047).toFixed(2)} hectares
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Village</span>
            <div className="text-right">
              <div className="text-sm font-medium">{claim.village}</div>
              <div className="text-xs text-muted-foreground">{claim.district}</div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Filed Date</span>
            <span className="text-sm font-medium">
              {format(new Date(claim.filing_date), 'dd MMM yyyy')}
            </span>
          </div>
        </div>
      </Card>

      {/* Mini Map */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Location
          </h4>
          <Button size="sm" variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Full Map
          </Button>
        </div>
        
        <div className="h-48 rounded-lg overflow-hidden">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              defaultCenter={{ lat: claim.coordinates[1], lng: claim.coordinates[0] }}
              defaultZoom={12}
              mapId="claim-preview-map"
              mapTypeId="satellite"
              className="w-full h-full"
            >
              <Marker
                position={{ lat: claim.coordinates[1], lng: claim.coordinates[0] }}
                title={`${claim.village} - ${claim.claim_type}`}
              />
            </Map>
          </APIProvider>
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          Lat: {claim.coordinates[1].toFixed(4)}, Lng: {claim.coordinates[0].toFixed(4)}
        </div>
      </Card>

      {/* Document Status */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documents
          </h4>
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        
        <div className="space-y-3">
          {claim.documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDocumentIcon(doc)}
                <span className="text-sm">{doc.type.replace(/_/g, ' ')}</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-medium">
                  {Math.round(doc.confidence * 100)}%
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {doc.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
          <strong>Overall Confidence:</strong> {Math.round(claim.confidence_score * 100)}%
        </div>
      </Card>

      {/* Status Timeline */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Processing Timeline
        </h4>
        
        <div className="space-y-3">
          {claim.timeline.map((entry, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {entry.stage.replace(/_/g, ' ')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(entry.date), 'dd MMM yyyy')} • {entry.officer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {claim.status !== 'APPROVED_BY_DLC' && claim.status !== 'REJECTED' && (
          <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
            <strong>Next Step:</strong> Awaiting review at {
              claim.status === 'FILED_AT_GS' ? 'Forest Rights Committee' :
              claim.status === 'VERIFIED_BY_FRC' ? 'Sub-Divisional Level Committee' :
              'District Level Committee'
            }
          </div>
        )}
      </Card>
    </div>
  );
};