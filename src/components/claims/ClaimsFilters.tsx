import React from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { 
  Search, 
  Filter,
  X,
  MapPin,
  Calendar,
  Users,
  FileCheck,
  TreePine
} from 'lucide-react';

interface FiltersState {
  search: string;
  state: string;
  district: string;
  village: string;
  claimType: string;
  status: string;
  dateRange: { from: string; to: string };
  areaRange: { min: number; max: number };
  ocrConfidence: string;
}

interface ClaimsFiltersProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
}

export const ClaimsFilters = ({ filters, onFiltersChange }: ClaimsFiltersProps) => {
  const updateFilter = (key: keyof FiltersState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      state: '',
      district: '',
      village: '',
      claimType: '',
      status: '',
      dateRange: { from: '', to: '' },
      areaRange: { min: 0, max: 100 },
      ocrConfidence: '',
    });
  };

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === 'areaRange') return count;
    if (key === 'dateRange') return count;
    if (value && value !== '') return count + 1;
    return count;
  }, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-auto p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search */}
      <Card className="p-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Search</span>
          </div>
          <Input
            placeholder="Search by Claim ID, Name, Village..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full"
          />
        </div>
      </Card>

      {/* Administrative Filters */}
      <Card className="p-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Location</span>
          </div>
          
          <div className="space-y-3">
            <Select value={filters.state} onValueChange={(value) => updateFilter('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="मध्य प्रदेश">मध्य प्रदेश</SelectItem>
                <SelectItem value="त्रिपुरा">त्रिपुरा</SelectItem>
                <SelectItem value="ओडिशा">ओडिशा</SelectItem>
                <SelectItem value="तेलंगाना">तेलंगाना</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.district} onValueChange={(value) => updateFilter('district', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="बैतूल">बैतूल</SelectItem>
                <SelectItem value="सिवनी">सिवनी</SelectItem>
                <SelectItem value="वेस्ट त्रिपुरा">वेस्ट त्रिपुरा</SelectItem>
                <SelectItem value="मयूरभंज">मयूरभंज</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.village} onValueChange={(value) => updateFilter('village', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Village" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="खेरमाई">खेरमाई</SelectItem>
                <SelectItem value="बरगांव">बरगांव</SelectItem>
                <SelectItem value="पिपरिया">पिपरिया</SelectItem>
                <SelectItem value="अमतली">अमतली</SelectItem>
                <SelectItem value="कोरापुट">कोरापुट</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Claim Filters */}
      <Card className="p-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TreePine className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Claim Details</span>
          </div>
          
          <div className="space-y-3">
            <Select value={filters.claimType} onValueChange={(value) => updateFilter('claimType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Claim Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IFR">🏠 IFR - Individual Forest Rights</SelectItem>
                <SelectItem value="CFR">🌳 CFR - Community Forest Rights</SelectItem>
                <SelectItem value="CR">📋 CR - Conversion Rights</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FILED_AT_GS">🟡 Filed at Gram Sabha</SelectItem>
                <SelectItem value="VERIFIED_BY_FRC">🔵 Verified by FRC</SelectItem>
                <SelectItem value="PENDING_AT_SDLC">🟠 Pending at SDLC</SelectItem>
                <SelectItem value="APPROVED_BY_DLC">🟢 Approved by DLC</SelectItem>
                <SelectItem value="REJECTED">🔴 Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Area Range */}
      <Card className="p-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Area Range</span>
          </div>
          
          <div className="space-y-3">
            <div className="px-2">
              <Slider
                value={[filters.areaRange.min, filters.areaRange.max]}
                onValueChange={([min, max]) => updateFilter('areaRange', { min, max })}
                max={100}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.areaRange.min} acres</span>
              <span>{filters.areaRange.max} acres</span>
            </div>
          </div>
        </div>
      </Card>

      {/* AI & Quality Filters */}
      <Card className="p-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Document Quality</span>
          </div>
          
          <Select value={filters.ocrConfidence} onValueChange={(value) => updateFilter('ocrConfidence', value)}>
            <SelectTrigger>
              <SelectValue placeholder="OCR Confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">🟢 High (&gt;90%)</SelectItem>
              <SelectItem value="medium">🟡 Medium (70-90%)</SelectItem>
              <SelectItem value="low">🔴 Low (&lt;70%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Quick Filters */}
      <Card className="p-3">
        <div className="space-y-3">
          <span className="text-sm font-medium">Quick Filters</span>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              High Priority CFR
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Ready for Title
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Missing Docs
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-accent">
              Recent Approvals
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};