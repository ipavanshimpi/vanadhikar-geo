import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { 
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  BarChart3,
  Award,
  Printer,
  Copy,
  ArrowUpDown
} from 'lucide-react';
import { Claim } from '../../data/sampleClaims';
import { format } from 'date-fns';

interface ClaimsTableProps {
  claims: Claim[];
  selectedClaim: Claim | null;
  selectedClaims: string[];
  onClaimSelect: (claim: Claim) => void;
  onBulkSelect: (claimIds: string[]) => void;
}

export const ClaimsTable = ({ 
  claims, 
  selectedClaim, 
  selectedClaims,
  onClaimSelect,
  onBulkSelect 
}: ClaimsTableProps) => {
  const [sortField, setSortField] = useState<keyof Claim>('filing_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const handleSort = (field: keyof Claim) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClaims = [...claims].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const modifier = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal) * modifier;
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * modifier;
    }
    return 0;
  });

  const paginatedClaims = sortedClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedClaims.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onBulkSelect(paginatedClaims.map(claim => claim.claim_id));
    } else {
      onBulkSelect([]);
    }
  };

  const handleSelectClaim = (claimId: string, checked: boolean) => {
    if (checked) {
      onBulkSelect([...selectedClaims, claimId]);
    } else {
      onBulkSelect(selectedClaims.filter(id => id !== claimId));
    }
  };

  const getStatusBadge = (status: Claim['status']) => {
    const statusConfig = {
      'FILED_AT_GS': { label: 'फाइल किया गया', variant: 'secondary' as const, color: '🟡' },
      'VERIFIED_BY_FRC': { label: 'सत्यापित', variant: 'default' as const, color: '🔵' },
      'PENDING_AT_SDLC': { label: 'SDLC में लंबित', variant: 'secondary' as const, color: '🟠' },
      'APPROVED_BY_DLC': { label: 'स्वीकृत', variant: 'secondary' as const, color: '🟢' },
      'REJECTED': { label: 'अस्वीकृत', variant: 'destructive' as const, color: '🔴' }
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant}>
        <span className="mr-1">{config.color}</span>
        {config.label}
      </Badge>
    );
  };

  const getClaimTypeBadge = (type: Claim['claim_type']) => {
    const typeConfig = {
      'IFR': { label: 'IFR', icon: '🏠', color: 'bg-blue-500' },
      'CFR': { label: 'CFR', icon: '🌳', color: 'bg-green-500' },
      'CR': { label: 'CR', icon: '📋', color: 'bg-orange-500' }
    };

    const config = typeConfig[type];
    return (
      <Badge variant="outline">
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </Badge>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedClaims.length === paginatedClaims.length && paginatedClaims.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="w-48">
                <Button
                  variant="ghost"
                  onClick={() => handleSort('claim_id')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Claim ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('claimant_name')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Claimant
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('village')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Village
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('area_acres')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Area
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort('filing_date')}
                  className="h-auto p-0 font-semibold hover:bg-transparent"
                >
                  Filed Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-16">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedClaims.map((claim) => (
              <TableRow
                key={claim.claim_id}
                className={`cursor-pointer hover:bg-accent/50 ${
                  selectedClaim?.claim_id === claim.claim_id ? 'bg-accent' : ''
                }`}
                onClick={() => onClaimSelect(claim)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedClaims.includes(claim.claim_id)}
                    onCheckedChange={(checked) => 
                      handleSelectClaim(claim.claim_id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="truncate">{claim.claim_id}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(claim.claim_id);
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{claim.claimant_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {claim.father_name}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{claim.village}</div>
                    <div className="text-sm text-muted-foreground">
                      {claim.district}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getClaimTypeBadge(claim.claim_type)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{claim.area_acres} acres</div>
                    <div className="text-sm text-muted-foreground">
                      {(claim.area_acres * 0.4047).toFixed(2)} hectares
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(claim.status)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {format(new Date(claim.filing_date), 'dd MMM yyyy')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.floor((Date.now() - new Date(claim.filing_date).getTime()) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Claim
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        View Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Track Status
                      </DropdownMenuItem>
                      {claim.status === 'APPROVED_BY_DLC' && (
                        <DropdownMenuItem>
                          <Award className="mr-2 h-4 w-4" />
                          Generate Title
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Summary
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedClaims.length)} of {sortedClaims.length} claims
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};