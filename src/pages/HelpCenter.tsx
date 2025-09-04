import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/Header";
import {
  Search,
  BookOpen,
  Video,
  Download,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  FileText,
  Map,
  Bot,
  BarChart3,
  Settings,
  Shield,
  Smartphone,
  Award,
  PlayCircle,
  ExternalLink,
  Star,
  ThumbsUp,
  Clock,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Zap,
  Lightbulb,
  Headphones,
  Calendar
} from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

  const popularTopics = [
    { title: "How to submit a new FRA claim", views: "2.5k", category: "Claims" },
    { title: "Understanding claim status workflow", views: "1.8k", category: "Process" },
    { title: "Reading satellite imagery for CFR mapping", views: "1.2k", category: "Mapping" },
    { title: "Troubleshooting login issues", views: "987", category: "Technical" },
    { title: "Setting up beneficiary convergence", views: "756", category: "Schemes" },
    { title: "Mobile app installation guide", views: "654", category: "Mobile" }
  ];

  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "What is the FRA Atlas and how does it help?",
          a: "FRA Atlas is a comprehensive digital platform for implementing the Forest Rights Act across India. It streamlines claim processing, enables satellite-based verification, and ensures transparent scheme convergence for forest community beneficiaries."
        },
        {
          q: "Who can access the system and how do I get an account?",
          a: "Access is role-based: District Collectors, Forest Officers, Gram Sabha Members, CSO Partners, and Data Analysts can register through their respective administrative channels. Contact your state coordinator for account setup."
        },
        {
          q: "What devices and browsers are supported?",
          a: "FRA Atlas works on desktop (Chrome, Firefox, Edge), tablets, and smartphones. For best experience, use updated browsers with JavaScript enabled and stable internet connection."
        }
      ]
    },
    {
      category: "Claims & Documentation", 
      questions: [
        {
          q: "What documents do I need to submit an IFR claim?",
          a: "Required documents include: Form A (application), Form B (verification), survey settlement records, traditional occupation evidence, and community verification from Gram Sabha."
        },
        {
          q: "How do I check the status of a pending claim?",
          a: "Navigate to Claims Dashboard → Search by application number or claimant name → View detailed status including current stage, pending actions, and estimated completion time."
        },
        {
          q: "Why was my claim rejected and how can I appeal?",
          a: "Rejection reasons are detailed in the claim status. Common issues: incomplete documentation, boundary disputes, or eligibility criteria. Appeals can be filed through the system within 60 days with additional evidence."
        }
      ]
    },
    {
      category: "AI & Technology Features",
      questions: [
        {
          q: "How accurate is the OCR for handwritten documents?",
          a: "OCR accuracy is 96% for printed documents and 85% for clear handwritten text. All documents with confidence below 95% are flagged for human review to ensure accuracy."
        },
        {
          q: "What do the LULC classification colors mean?",
          a: "Green: Dense forest, Light green: Open forest, Brown: Agricultural land, Blue: Water bodies, Gray: Built-up areas, Yellow: Barren land. Each color represents specific land use categories from satellite analysis."
        },
        {
          q: "How often is satellite imagery updated?",
          a: "Sentinel-2 imagery is updated every 5-10 days, weather permitting. Annual LULC classifications are generated each December. Real-time change detection alerts are available for rapid deforestation monitoring."
        }
      ]
    }
  ];

  const userGuides = [
    {
      title: "District Collectors Guide",
      description: "Complete handbook for DLC workflow management, multi-district oversight, and scheme convergence planning",
      icon: <Users className="h-6 w-6" />,
      duration: "45 min read",
      difficulty: "Intermediate"
    },
    {
      title: "Forest Officers Manual",
      description: "CFR verification procedures, LULC data interpretation, and joint verification protocols",
      icon: <Map className="h-6 w-6" />,
      duration: "35 min read", 
      difficulty: "Advanced"
    },
    {
      title: "Gram Sabha Member Guide",
      description: "Democratic claim verification, community asset mapping, and transparency tools usage",
      icon: <Users className="h-6 w-6" />,
      duration: "25 min read",
      difficulty: "Beginner"
    },
    {
      title: "OCR Processing Workflows",
      description: "Document upload guidelines, AI validation, and quality control procedures",
      icon: <Bot className="h-6 w-6" />,
      duration: "20 min read",
      difficulty: "Intermediate"
    }
  ];

  const videoTutorials = [
    {
      title: "FRA Atlas System Overview",
      description: "15-minute introduction to all major features and workflows",
      thumbnail: "/api/placeholder/300/180",
      duration: "15:30",
      views: "12.5k"
    },
    {
      title: "Claims Processing Walkthrough", 
      description: "Step-by-step guide for processing IFR and CFR claims",
      thumbnail: "/api/placeholder/300/180", 
      duration: "22:45",
      views: "8.2k"
    },
    {
      title: "Satellite Imagery Analysis",
      description: "Understanding LULC classifications and change detection",
      thumbnail: "/api/placeholder/300/180",
      duration: "18:20", 
      views: "6.8k"
    },
    {
      title: "Mobile App Features",
      description: "Complete guide to field data collection and offline sync",
      thumbnail: "/api/placeholder/300/180",
      duration: "12:15",
      views: "5.4k"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/20">
                <HelpCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">FRA Atlas Help Center</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your comprehensive guide to mastering the Forest Rights Act implementation system
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help articles, guides, or ask a question..."
                className="pl-12 pr-4 py-3 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex justify-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Emergency Support
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Book Demo
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Popular Help Topics
            </CardTitle>
            <CardDescription>
              Most searched topics and solutions by our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTopics.map((topic, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm leading-relaxed">{topic.title}</h4>
                      <Badge variant="secondary" className="text-xs ml-2">{topic.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{topic.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Help Content */}
        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              User Guides
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Tutorials
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              Support
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* User Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Role-Specific User Guides
                </CardTitle>
                <CardDescription>
                  Comprehensive documentation tailored to your role and responsibilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userGuides.map((guide, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            {guide.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4">{guide.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {guide.duration}
                                </div>
                                <Badge variant={guide.difficulty === "Beginner" ? "default" : guide.difficulty === "Intermediate" ? "secondary" : "destructive"} className={guide.difficulty === "Beginner" ? "bg-green-600 text-white" : ""}>
                                  {guide.difficulty}
                                </Badge>
                              </div>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Read Guide
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Tutorials Tab */}
          <TabsContent value="videos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Tutorial Library
                </CardTitle>
                <CardDescription>
                  Interactive video guides and walkthroughs for visual learners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videoTutorials.map((video, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <PlayCircle className="h-16 w-16 text-primary" />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{video.title}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{video.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {video.views} views
                          </div>
                          <Button size="sm">
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Watch
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>
                  Common questions and detailed answers from our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqData.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        {section.category}
                      </h3>
                      <Accordion type="single" collapsible>
                        {section.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${sectionIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      {sectionIndex < faqData.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>
                    Get direct help from our expert support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Emergency Hotline</div>
                      <div className="text-sm text-muted-foreground">24/7 for critical issues</div>
                      <div className="text-sm font-mono">+91-1800-FRA-HELP</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">Response within 4 hours</div>
                      <div className="text-sm font-mono">help@fra-atlas.gov.in</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 6 PM</div>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Support
                  </CardTitle>
                  <CardDescription>
                    Connect with peers and experts in our forums
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      State-wise Discussion Boards
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Expert Network
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Best Practices Sharing
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Virtual Office Hours
                    </Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Active Community Members: <strong>15,000+</strong></p>
                    <p>Questions Answered: <strong>98%</strong></p>
                    <p>Avg Response Time: <strong>2 hours</strong></p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Downloadable Resources
                </CardTitle>
                <CardDescription>
                  Templates, forms, and reference materials for offline use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Complete System Manual", type: "PDF", size: "12.5 MB", downloads: "5.2k" },
                    { title: "Quick Reference Cards", type: "PDF", size: "2.1 MB", downloads: "8.9k" },
                    { title: "Claim Submission Checklist", type: "PDF", size: "1.2 MB", downloads: "12.1k" },
                    { title: "Mobile App User Guide", type: "PDF", size: "4.8 MB", downloads: "3.7k" },
                    { title: "API Documentation", type: "PDF", size: "8.2 MB", downloads: "1.2k" },
                    { title: "Training Presentation Slides", type: "PPT", size: "15.3 MB", downloads: "2.8k" }
                  ].map((resource, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm leading-relaxed">{resource.title}</h4>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <Badge variant="outline">{resource.type}</Badge>
                              <span>{resource.size}</span>
                              <span>•</span>
                              <span>{resource.downloads} downloads</span>
                            </div>
                            <Button size="sm" className="mt-3 w-full">
                              <Download className="h-3 w-3 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpCenter;