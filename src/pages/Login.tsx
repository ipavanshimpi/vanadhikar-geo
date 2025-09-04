import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Dummy user data for different departments
const dummyUsers = {
  "ministry": {
    email: "admin@tribal.gov.in",
    password: "ministry123",
    name: "Dr. Rajesh Kumar",
    department: "Ministry of Tribal Affairs",
    role: "Joint Secretary"
  },
  "district": {
    email: "collector@dajgua.gov.in", 
    password: "district123",
    name: "Priya Sharma",
    department: "District Tribal Welfare Department",
    role: "District Collector"
  },
  "forest": {
    email: "dfo@forest.gov.in",
    password: "forest123", 
    name: "Vikram Singh",
    department: "Forest Department",
    role: "Divisional Forest Officer"
  },
  "revenue": {
    email: "tehsildar@revenue.gov.in",
    password: "revenue123",
    name: "Sunita Devi",
    department: "Revenue Department", 
    role: "Tehsildar"
  },
  "planning": {
    email: "planner@planning.gov.in",
    password: "planning123",
    name: "Amit Patel",
    department: "Planning & Development Authority",
    role: "Deputy Director"
  },
  "ngo": {
    email: "coordinator@tribalcare.org",
    password: "ngo123",
    name: "Kavita Joshi",
    department: "Tribal Care Foundation (NGO)",
    role: "Program Coordinator"
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleQuickLogin = (userType: keyof typeof dummyUsers) => {
    const user = dummyUsers[userType];
    setEmail(user.email);
    setPassword(user.password);
    setSelectedUser(userType);
  };

  const handleLogin = () => {
    // Find matching user
    const user = Object.values(dummyUsers).find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store user data in localStorage (dummy auth)
      localStorage.setItem("fra-user", JSON.stringify(user));
      toast.success(`Welcome ${user.name}! Redirecting to dashboard...`);
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast.error("Invalid credentials. Please use one of the demo accounts.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Login Form */}
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm border-0">
          <CardHeader className="text-center pb-8 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-700 text-white rounded-t-lg">
            <div className="mx-auto mb-6 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-white font-bold text-2xl">🌲</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Forest Rights Act Portal</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Secure access for government officials and stakeholders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Official Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gov.in"
                className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transform transition-all duration-200 hover:scale-105"
            >
              Sign In to Portal
            </Button>
            <div className="text-center text-sm text-gray-500">
              🔒 Authorized personnel only • Secure government system
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Demo Accounts */}
        <Card className="shadow-2xl bg-white/90 backdrop-blur-sm border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
            <CardTitle className="text-2xl text-gray-800 mb-2">Demo Access Accounts</CardTitle>
            <CardDescription className="text-gray-600">
              Click any account below to auto-fill credentials for testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                onClick={() => handleQuickLogin("ministry")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-green-700">Ministry of Tribal Affairs</div>
                    <div className="text-sm text-gray-600">Dr. Rajesh Kumar • Joint Secretary</div>
                    <div className="text-xs text-blue-600 mt-1">admin@tribal.gov.in</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                onClick={() => handleQuickLogin("district")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-blue-700">District Tribal Welfare Dept.</div>
                    <div className="text-sm text-gray-600">Priya Sharma • District Collector</div>
                    <div className="text-xs text-blue-600 mt-1">collector@dajgua.gov.in</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
                onClick={() => handleQuickLogin("forest")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-emerald-700">Forest Department</div>
                    <div className="text-sm text-gray-600">Vikram Singh • Divisional Forest Officer</div>
                    <div className="text-xs text-blue-600 mt-1">dfo@forest.gov.in</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                onClick={() => handleQuickLogin("revenue")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-orange-700">Revenue Department</div>
                    <div className="text-sm text-gray-600">Sunita Devi • Tehsildar</div>
                    <div className="text-xs text-blue-600 mt-1">tehsildar@revenue.gov.in</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                onClick={() => handleQuickLogin("planning")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-purple-700">Planning & Development</div>
                    <div className="text-sm text-gray-600">Amit Patel • Deputy Director</div>
                    <div className="text-xs text-blue-600 mt-1">planner@planning.gov.in</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left border-2 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                onClick={() => handleQuickLogin("ngo")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-red-700">NGO Partner</div>
                    <div className="text-sm text-gray-600">Kavita Joshi • Program Coordinator</div>
                    <div className="text-xs text-blue-600 mt-1">coordinator@tribalcare.org</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="text-sm text-amber-800">
                <strong>💡 Demo Note:</strong> All passwords follow the format: {"{department}"}123
                <br />
                <span className="text-xs mt-1 block">Example: ministry123, district123, forest123, etc.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;