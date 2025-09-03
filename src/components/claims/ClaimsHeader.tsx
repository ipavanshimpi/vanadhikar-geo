import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Plus, 
  Upload, 
  Download, 
  FileText,
  Users,
  Clock,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { sampleClaims } from '../../data/sampleClaims';

interface ClaimsHeaderProps {
  selectedClaims: string[];
  totalClaims: number;
}

export const ClaimsHeader = ({ selectedClaims, totalClaims }: ClaimsHeaderProps) => {
  // Calculate stats from sample data
  const totalClaimsCount = sampleClaims.length;
  const pendingReview = sampleClaims.filter(c => 
    c.status === 'PENDING_AT_SDLC' || c.status === 'VERIFIED_BY_FRC'
  ).length;
  const approvedToday = sampleClaims.filter(c => 
    c.status === 'APPROVED_BY_DLC' && new Date(c.status_date) >= new Date(Date.now() - 24*60*60*1000)
  ).length;
  const rejectionRate = Math.round((sampleClaims.filter(c => c.status === 'REJECTED').length / totalClaimsCount) * 100);

  return (
    <div className="border-b border-border bg-card px-6 py-4">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-2">
        Dashboard &gt; Claims Management
      </div>

      {/* Title and Actions */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            वन अधिकार दावे | Forest Rights Claims
          </h1>
          <p className="text-muted-foreground mt-1">
            Showing {totalClaims} of {totalClaimsCount} claims
            {selectedClaims.length > 0 && (
              <span className="ml-2">
                • {selectedClaims.length} selected
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedClaims.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Bulk Actions
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Selected
              </Button>
            </>
          )}
          
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Claims</p>
              <p className="text-2xl font-semibold text-foreground">{totalClaimsCount}</p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
              <p className="text-2xl font-semibold text-foreground">{pendingReview}</p>
            </div>
            <Clock className="w-8 h-8 text-warning" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <p className="text-2xl font-semibold text-foreground">{approvedToday}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejection Rate</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-foreground">{rejectionRate}%</p>
                <Badge variant={rejectionRate > 15 ? "destructive" : "secondary"}>
                  {rejectionRate > 15 ? "High" : "Normal"}
                </Badge>
              </div>
            </div>
            <TrendingDown className="w-8 h-8 text-destructive" />
          </div>
        </Card>
      </div>
    </div>
  );
};