import React, { useState, useMemo } from 'react';
import { ClaimsTable } from '../components/claims/ClaimsTable';
import { ClaimsFilters } from '../components/claims/ClaimsFilters';
import { ClaimPreview } from '../components/claims/ClaimPreview';
import { ClaimsHeader } from '../components/claims/ClaimsHeader';
import { sampleClaims, type Claim } from '../data/sampleClaims';
import Header from '../components/Header';

const Claims = () => {
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [filters, setFilters] = useState({
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

  // Filter claims based on current filters
  const filteredClaims = useMemo(() => {
    return sampleClaims.filter(claim => {
      if (filters.search && !claim.claim_id.toLowerCase().includes(filters.search.toLowerCase()) && 
          !claim.claimant_name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !claim.village.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.state && claim.state !== filters.state) return false;
      if (filters.district && claim.district !== filters.district) return false;
      if (filters.village && claim.village !== filters.village) return false;
      if (filters.claimType && claim.claim_type !== filters.claimType) return false;
      if (filters.status && claim.status !== filters.status) return false;
      if (claim.area_acres < filters.areaRange.min || claim.area_acres > filters.areaRange.max) return false;
      
      return true;
    });
  }, [filters]);

  const handleClaimSelect = (claim: Claim) => {
    setSelectedClaim(claim);
  };

  const handleBulkSelect = (claimIds: string[]) => {
    setSelectedClaims(claimIds);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ClaimsHeader 
        selectedClaims={selectedClaims}
        totalClaims={filteredClaims.length}
      />
      
      <div className="flex h-[calc(100vh-180px)]">
        {/* Left Panel - Filters */}
        <div className="w-80 border-r border-border bg-card overflow-y-auto">
          <ClaimsFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Center Panel - Claims Table */}
        <div className="flex-1 overflow-hidden">
          <ClaimsTable 
            claims={filteredClaims}
            selectedClaim={selectedClaim}
            selectedClaims={selectedClaims}
            onClaimSelect={handleClaimSelect}
            onBulkSelect={handleBulkSelect}
          />
        </div>

        {/* Right Panel - Claim Preview */}
        <div className="w-96 border-l border-border bg-card overflow-y-auto">
          <ClaimPreview 
            claim={selectedClaim}
            totalClaims={filteredClaims.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Claims;