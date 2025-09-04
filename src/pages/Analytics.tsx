import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, FileText, Map, 
  AlertTriangle, CheckCircle, Clock, Target, Satellite,
  Database, Cpu, Eye, Download, Filter
} from 'lucide-react';
import Header from '../components/Header';

// Sample data for analytics
const statePerformanceData = [
  { state: 'MP', claimsFiled: 624000, approved: 294877, cfrTitles: 29980, rejectionRate: 53, avgDays: 180, score: 6.2 },
  { state: 'Tripura', claimsFiled: 191000, approved: 124541, cfrTitles: 55, rejectionRate: 22, avgDays: 120, score: 7.8 },
  { state: 'Odisha', claimsFiled: 629000, approved: 406107, cfrTitles: 3149, rejectionRate: 27, avgDays: 150, score: 7.1 },
  { state: 'Telangana', claimsFiled: 200000, approved: 97434, cfrTitles: 0, rejectionRate: 78, avgDays: 300, score: 4.5 }
];

const claimsTypeData = [
  { name: 'IFR', value: 85, color: '#22c55e' },
  { name: 'CR', value: 12, color: '#3b82f6' },
  { name: 'CFR', value: 3, color: '#f59e0b' }
];

const monthlyTrendsData = [
  { month: 'Jan', filed: 12000, approved: 8500, rejected: 2100 },
  { month: 'Feb', filed: 15000, approved: 9200, rejected: 2800 },
  { month: 'Mar', filed: 18000, approved: 11000, rejected: 3200 },
  { month: 'Apr', filed: 16000, approved: 10500, rejected: 2900 },
  { month: 'May', filed: 14000, approved: 9800, rejected: 2600 },
  { month: 'Jun', filed: 19000, approved: 12500, rejected: 3400 }
];

const documentProcessingData = [
  { type: 'Form A', processed: 45000, accuracy: 96, avgTime: 2.3 },
  { type: 'Form B', processed: 32000, accuracy: 94, avgTime: 3.1 },
  { type: 'Sketch Maps', processed: 28000, accuracy: 89, avgTime: 4.2 },
  { type: 'DLC Orders', processed: 15000, accuracy: 98, avgTime: 1.8 }
];

const schemeConvergenceData = [
  { scheme: 'PM-KISAN', eligible: 1200000, enrolled: 1140000, coverage: 95, impact: 9.1 },
  { scheme: 'MGNREGA', eligible: 2800000, enrolled: 2240000, coverage: 80, impact: 8.3 },
  { scheme: 'JJM', eligible: 3500000, enrolled: 2100000, coverage: 60, impact: 6.8 },
  { scheme: 'PM-JAY', eligible: 4200000, enrolled: 3780000, coverage: 90, impact: 8.9 }
];

const landCoverData = [
  { year: 2020, forest: 65000, agriculture: 125000, water: 8000, buildup: 12000 },
  { year: 2021, forest: 64200, agriculture: 126500, water: 7800, buildup: 13500 },
  { year: 2022, forest: 65800, agriculture: 125800, water: 8200, buildup: 15200 },
  { year: 2023, forest: 66200, agriculture: 124900, water: 8100, buildup: 16800 }
];

const Analytics = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Analytics Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">FRA Atlas - Analytics Intelligence Center</h1>
              <p className="text-muted-foreground mt-1">Central monitoring and decision-making hub for forest rights ecosystem</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                Live Connected
              </Badge>
              <span className="text-sm text-muted-foreground">Last sync: 2 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Executive Overview</TabsTrigger>
            <TabsTrigger value="claims">Claims Intelligence</TabsTrigger>
            <TabsTrigger value="documents">Document Intelligence</TabsTrigger>
            <TabsTrigger value="satellite">Satellite Intelligence</TabsTrigger>
            <TabsTrigger value="convergence">Scheme Convergence</TabsTrigger>
          </TabsList>

          {/* Tab 1: Executive Overview */}
          <TabsContent value="overview" className="space-y-6">
            {/* Summary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Claims Processed</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">745,000+</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
                    25% acceleration this quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Beneficiaries</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">150M+</div>
                  <p className="text-xs text-muted-foreground">Forest community members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Processing Efficiency</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,000+</div>
                  <p className="text-xs text-muted-foreground">Pages/day with 98% accuracy</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scheme Convergence Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Across 11 government schemes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Geographic Coverage</CardTitle>
                  <Map className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">50,000+</div>
                  <p className="text-xs text-muted-foreground">Villages across 4 states</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Economic Impact</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹11,000+</div>
                  <p className="text-xs text-muted-foreground">Annual income increase per household</p>
                </CardContent>
              </Card>
            </div>

            {/* State Performance Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>State Performance Matrix</CardTitle>
                <CardDescription>Comparative analysis across key implementation metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statePerformanceData.map((state) => (
                    <div key={state.state} className="grid grid-cols-7 gap-4 items-center p-4 border rounded-lg">
                      <div className="font-semibold">{state.state}</div>
                      <div className="text-sm">{state.claimsFiled.toLocaleString()}</div>
                      <div className="text-sm">{state.approved.toLocaleString()}</div>
                      <div className="text-sm">{state.cfrTitles.toLocaleString()}</div>
                      <div className="text-sm">
                        <Badge variant={state.rejectionRate > 50 ? "destructive" : "secondary"}>
                          {state.rejectionRate}%
                        </Badge>
                      </div>
                      <div className="text-sm">{state.avgDays} days</div>
                      <div className="flex items-center gap-2">
                        <Progress value={state.score * 10} className="flex-1" />
                        <span className="text-sm font-medium">{state.score}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Claims Intelligence */}
          <TabsContent value="claims" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Claims Type Distribution</CardTitle>
                  <CardDescription>Breakdown by IFR, CR, and CFR claims</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={claimsTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {claimsTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Processing Trends</CardTitle>
                  <CardDescription>Filing vs approval patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="filed" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} />
                      <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Claims Processing Pipeline</CardTitle>
                <CardDescription>Real-time view of claims at different stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">15,420</div>
                    <div className="text-sm text-muted-foreground">At Gram Sabha</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">8,950</div>
                    <div className="text-sm text-muted-foreground">FRC Review</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">12,340</div>
                    <div className="text-sm text-muted-foreground">SDLC Processing</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">6,780</div>
                    <div className="text-sm text-muted-foreground">DLC Approval</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Document Intelligence */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>OCR Performance</CardTitle>
                  <CardDescription>Real-time processing accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Document Recognition</span>
                      <Badge variant="secondary">96%</Badge>
                    </div>
                    <Progress value={96} />
                    <div className="flex justify-between items-center">
                      <span>Text Extraction</span>
                      <Badge variant="secondary">98%</Badge>
                    </div>
                    <Progress value={98} />
                    <div className="flex justify-between items-center">
                      <span>Entity Recognition</span>
                      <Badge variant="secondary">94%</Badge>
                    </div>
                    <Progress value={94} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Processing Queue</CardTitle>
                  <CardDescription>Live document processing status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">In Queue</span>
                      <span className="text-sm font-medium">1,247 docs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Processing</span>
                      <span className="text-sm font-medium">85 docs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Completed Today</span>
                      <span className="text-sm font-medium">3,456 docs</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Avg Processing Time</span>
                      <span className="text-sm">2.3 mins</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                  <CardDescription>Documents processed by language</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hindi</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <Progress value={45} />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Odia</span>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    <Progress value={23} />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Telugu</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <Progress value={18} />
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bengali</span>
                      <span className="text-sm font-medium">14%</span>
                    </div>
                    <Progress value={14} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Document Processing Analytics</CardTitle>
                <CardDescription>Performance metrics by document type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentProcessingData.map((doc) => (
                    <div key={doc.type} className="grid grid-cols-4 gap-4 items-center p-4 border rounded-lg">
                      <div className="font-medium">{doc.type}</div>
                      <div className="text-sm">{doc.processed.toLocaleString()} processed</div>
                      <div className="text-sm">
                        <Badge variant="secondary">{doc.accuracy}% accuracy</Badge>
                      </div>
                      <div className="text-sm">{doc.avgTime} min avg time</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Satellite Intelligence */}
          <TabsContent value="satellite" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Land Use Land Cover Trends</CardTitle>
                  <CardDescription>Temporal changes in land cover types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={landCoverData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="forest" stackId="1" stroke="#22c55e" fill="#22c55e" />
                      <Area type="monotone" dataKey="agriculture" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                      <Area type="monotone" dataKey="water" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                      <Area type="monotone" dataKey="buildup" stackId="1" stroke="#ef4444" fill="#ef4444" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Environmental Monitoring</CardTitle>
                  <CardDescription>Forest health and change detection alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Forest Cover Change</span>
                      </div>
                      <Badge variant="secondary">+2.3%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Deforestation Alerts</span>
                      </div>
                      <Badge variant="destructive">15 hotspots</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Regeneration Success</span>
                      </div>
                      <Badge variant="secondary">234 areas</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Satellite Data Quality</CardTitle>
                <CardDescription>Data availability and processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Satellite className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-lg font-bold">98.5%</div>
                    <div className="text-sm text-muted-foreground">Data Availability</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <div className="text-lg font-bold">15%</div>
                    <div className="text-sm text-muted-foreground">Cloud Cover</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-lg font-bold">2.4 TB</div>
                    <div className="text-sm text-muted-foreground">Data Processed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Scheme Convergence */}
          <TabsContent value="convergence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Convergence Success Matrix</CardTitle>
                <CardDescription>Effectiveness of linking FRA rights with development schemes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schemeConvergenceData.map((scheme) => (
                    <div key={scheme.scheme} className="grid grid-cols-5 gap-4 items-center p-4 border rounded-lg">
                      <div className="font-medium">{scheme.scheme}</div>
                      <div className="text-sm">{(scheme.eligible / 1000000).toFixed(1)}M eligible</div>
                      <div className="text-sm">{(scheme.enrolled / 1000000).toFixed(1)}M enrolled</div>
                      <div className="text-sm">
                        <Badge variant={scheme.coverage > 80 ? "secondary" : "outline"}>
                          {scheme.coverage}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={scheme.impact * 10} className="flex-1" />
                        <span className="text-sm font-medium">{scheme.impact}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Economic Impact</CardTitle>
                  <CardDescription>Income enhancement through scheme convergence</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Income Increase</span>
                      <span className="text-lg font-bold text-green-600">₹11,000/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MGNREGA Work-days</span>
                      <span className="text-lg font-bold">180 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Livelihood Streams</span>
                      <span className="text-lg font-bold">3.2 per household</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>DSS Rule Engine</CardTitle>
                  <CardDescription>Automated beneficiary identification performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rule Effectiveness</span>
                      <Badge variant="secondary">92%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Auto-Identification Rate</span>
                      <Badge variant="secondary">87%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Manual Interventions</span>
                      <span className="text-sm">13% of cases</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;