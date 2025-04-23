import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Sidebar from "@/components/dashboard/Sidebar";
import { 
  Bell, 
  Users, 
  UserCheck, 
  BarChart2,
  Activity,
  Settings,
  Download,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from "lucide-react";

export default function AdminDashboard() {
  const [totalUsers] = useState(845);
  const [newDoctors] = useState(12);
  const [activeUsers] = useState(210);
  const [systemAlerts] = useState(5);
  
  const [pendingDoctors] = useState([
    { id: 1, name: "Dr. James Wilson", specialty: "Cardiologist", applied: "Apr 10, 2025" },
    { id: 2, name: "Dr. Emily Roberts", specialty: "Neurologist", applied: "Apr 8, 2025" },
    { id: 3, name: "Dr. Michael Stevens", specialty: "Dermatologist", applied: "Apr 5, 2025" },
    { id: 4, name: "Dr. Sarah Thompson", specialty: "Pediatrician", applied: "Apr 2, 2025" }
  ]);
  
  const [systemLogs] = useState([
    { id: 1, event: "User Login", user: "admin@health.com", timestamp: "Today 10:45 AM", status: "Success" },
    { id: 2, event: "Password Reset", user: "john.doe@example.com", timestamp: "Today 09:32 AM", status: "Success" },
    { id: 3, event: "Failed Login Attempt", user: "unknown@mail.com", timestamp: "Today 08:15 AM", status: "Failed" },
    { id: 4, event: "Doctor Verification", user: "dr.wilson@health.com", timestamp: "Yesterday 4:22 PM", status: "Pending" },
    { id: 5, event: "Database Backup", user: "system", timestamp: "Yesterday 2:00 AM", status: "Success" },
    { id: 6, event: "System Update", user: "system", timestamp: "Apr 10, 2025 1:15 PM", status: "Success" }
  ]);

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="admin" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>System</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                          onClick={() => window.location.href = "/settings"}>
                          <Settings className="h-4 w-4" />
                          <span>System Settings</span>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md">
                          <Download className="h-4 w-4" />
                          <span>Export Data</span>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-red rounded-full"></span>
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="hidden md:inline-flex"
            >
              Sign Out
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Stats overview */}
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-medium text-gray-800">System Overview</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{totalUsers}</span>
                      <Users className="h-5 w-5 text-health-blue" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">New Doctor Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{newDoctors}</span>
                      <UserCheck className="h-5 w-5 text-health-green" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{activeUsers}</span>
                      <Activity className="h-5 w-5 text-health-blue" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{systemAlerts}</span>
                      <Bell className="h-5 w-5 text-health-red" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Doctor verification section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Pending Doctor Verifications</h2>
                <Button variant="outline" size="sm">View All Applications</Button>
              </div>
              
              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingDoctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell className="font-medium">{doctor.name}</TableCell>
                          <TableCell>{doctor.specialty}</TableCell>
                          <TableCell>{doctor.applied}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-green-50 border-green-200 text-green-600 hover:bg-green-100">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 bg-red-50 border-red-200 text-red-600 hover:bg-red-100">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            {/* System logs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">System Logs</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Export Logs</Button>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                    <input 
                      type="text" 
                      placeholder="Search logs..." 
                      className="pl-9 h-9 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                </div>
              </div>
              
              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.event}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              log.status === "Success" ? "bg-green-100 text-green-800" : 
                              log.status === "Failed" ? "bg-red-100 text-red-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {log.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
