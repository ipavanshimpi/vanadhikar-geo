import { Bell, Search, User, ChevronDown, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useLocation } from "react-router-dom";
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
          <NavLink to="/">
            <Button 
              variant="ghost" 
              className={location.pathname === '/' ? 
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
          <Button variant="ghost" className="hover:text-primary">
            Atlas
          </Button>
          <Button variant="ghost" className="hover:text-primary">
            Analytics
          </Button>
          <Button variant="ghost" className="hover:text-primary">
            Settings
          </Button>
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
          <Button variant="ghost" size="icon" className="relative">
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
                  <div className="text-sm font-medium">श्री राजेश शर्मा</div>
                  <div className="text-xs text-muted-foreground">Government Official</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help Center</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;