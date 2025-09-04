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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* Left Side - Login Form */}
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">FRA</span>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">Forest Rights Act Portal</CardTitle>
            <CardDescription className="text-gray-600">
              Secure access for government officials and stakeholders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@gov.in"
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12"
              />
            </div>
            <Button onClick={handleLogin} className="w-full h-12 text-lg font-semibold">
              Sign In to Portal
            </Button>
            <div className="text-center text-sm text-gray-500">
              Authorized personnel only • Secure government system
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Demo Accounts */}
        <Card className="shadow-2xl bg-gradient-to-br from-gray-50 to-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Demo Access Accounts</CardTitle>
            <CardDescription>
              Click any account below to auto-fill credentials for testing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("ministry")}
              >
                <div>
                  <div className="font-semibold text-green-700">Ministry of Tribal Affairs</div>
                  <div className="text-sm text-gray-600">Dr. Rajesh Kumar • Joint Secretary</div>
                  <div className="text-xs text-blue-600 mt-1">admin@tribal.gov.in</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("district")}
              >
                <div>
                  <div className="font-semibold text-blue-700">District Tribal Welfare Dept.</div>
                  <div className="text-sm text-gray-600">Priya Sharma • District Collector</div>
                  <div className="text-xs text-blue-600 mt-1">collector@dajgua.gov.in</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("forest")}
              >
                <div>
                  <div className="font-semibold text-emerald-700">Forest Department</div>
                  <div className="text-sm text-gray-600">Vikram Singh • Divisional Forest Officer</div>
                  <div className="text-xs text-blue-600 mt-1">dfo@forest.gov.in</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("revenue")}
              >
                <div>
                  <div className="font-semibold text-orange-700">Revenue Department</div>
                  <div className="text-sm text-gray-600">Sunita Devi • Tehsildar</div>
                  <div className="text-xs text-blue-600 mt-1">tehsildar@revenue.gov.in</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("planning")}
              >
                <div>
                  <div className="font-semibold text-purple-700">Planning & Development</div>
                  <div className="text-sm text-gray-600">Amit Patel • Deputy Director</div>
                  <div className="text-xs text-blue-600 mt-1">planner@planning.gov.in</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 text-left"
                onClick={() => handleQuickLogin("ngo")}
              >
                <div>
                  <div className="font-semibold text-red-700">NGO Partner</div>
                  <div className="text-sm text-gray-600">Kavita Joshi • Program Coordinator</div>
                  <div className="text-xs text-blue-600 mt-1">coordinator@tribalcare.org</div>
                </div>
              </Button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-sm text-yellow-800">
                <strong>Demo Note:</strong> All passwords are in format: {"{department}"}123
                <br />
                Example: ministry123, district123, forest123, etc.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;