import { Bell, Search, User, ChevronDown, TreePine, HelpCircle, Settings as SettingsIcon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuthenticatedUser, logout } from "@/utils/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationsSidebarOpen, setIsNotificationsSidebarOpen] = useState(false);
  const user = getAuthenticatedUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <TreePine className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold font-heading text-foreground">FRA Atlas</h1>
            <p className="text-xs text-muted-foreground">Forest Rights Management System</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-6 ml-8">
          <NavLink to="/dashboard">
            <Button 
              variant="ghost" 
              className={location.pathname === '/dashboard' ? 
                "text-primary bg-primary/10 hover:bg-primary/20" : 
                "hover:text-primary"
              }
            >
              Dashboard
            </Button>
          </NavLink>
          <NavLink to="/claims">
            <Button 
              variant="ghost" 
              className={location.pathname === '/claims' ? 
                "text-primary bg-primary/10 hover:bg-primary/20" : 
                "hover:text-primary"
              }
            >
              Claims
            </Button>
          </NavLink>
          <NavLink to="/atlas">
            <Button 
              variant="ghost" 
              className={location.pathname === '/atlas' ? 
                "text-primary bg-primary/10 hover:bg-primary/20" : 
                "hover:text-primary"
              }
            >
              Atlas
            </Button>
          </NavLink>
          <NavLink to="/analytics">
            <Button 
              variant="ghost" 
              className={location.pathname === '/analytics' ? 
                "text-primary bg-primary/10 hover:bg-primary/20" : 
                "hover:text-primary"
              }
            >
              Analytics
            </Button>
          </NavLink>
          <NavLink to="/settings">
            <Button 
              variant="ghost" 
              className={location.pathname === '/settings' ? 
                "text-primary bg-primary/10 hover:bg-primary/20" : 
                "hover:text-primary"
              }
            >
              Settings
            </Button>
          </NavLink>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search villages, claims, districts..."
              className="pl-10 bg-muted/50 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={() => setIsNotificationsSidebarOpen(!isNotificationsSidebarOpen)}
          >
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.department}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/help')} className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help Center
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notifications Sidebar */}
      {isNotificationsSidebarOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/20" 
            onClick={() => setIsNotificationsSidebarOpen(false)}
          />
          <div className="absolute right-0 top-16 bottom-0 w-80 bg-card border-l border-border shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Notifications</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsNotificationsSidebarOpen(false)}
                >
                  ✕
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {/* Notification Items */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">New claim submitted</h4>
                    <p className="text-sm text-muted-foreground">IFR claim #2024001 from Gram Sabha Khajuraho</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Document verification required</h4>
                    <p className="text-sm text-muted-foreground">CFR claim #2024089 needs additional evidence</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">Claim approved</h4>
                    <p className="text-sm text-muted-foreground">IFR title issued for claim #2024045</p>
                    <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
                  <div className="w-2 h-2 rounded-full bg-gray-400 mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">System maintenance</h4>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance tonight 11 PM - 2 AM</p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">New satellite imagery available</h4>
                    <p className="text-sm text-muted-foreground">Updated LULC data for Bhopal district</p>
                    <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;