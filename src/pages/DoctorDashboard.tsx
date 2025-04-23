import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { generateRandomData } from "@/lib/utils";
import { 
  Bell, 
  Users, 
  Calendar, 
  MessageSquare, 
  ClipboardCheck, 
  AlertCircle,
  ArrowRight,
  Search
} from "lucide-react";

export default function DoctorDashboard() {
  const [patientCount] = useState(24);
  const [appointmentsToday] = useState(8);
  const [criticalAlerts] = useState(3);
  const [unreadMessages] = useState(5);

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Doctor Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Dr. Smith</p>
          </div>
          
          <div className="flex items-center space-x-4">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left column: Stats and patient list */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Overview</h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{patientCount}</span>
                        <Users className="h-5 w-5 text-health-blue" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700">Today's Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{appointmentsToday}</span>
                        <Calendar className="h-5 w-5 text-health-green" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700">Critical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{criticalAlerts}</span>
                        <AlertCircle className="h-5 w-5 text-health-red" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-700">Unread Messages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{unreadMessages}</span>
                        <MessageSquare className="h-5 w-5 text-health-blue" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Patient List</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                      <input 
                        type="text" 
                        placeholder="Search patients..." 
                        className="pl-9 h-9 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                </div>
                
                <Card className="border border-gray-200">
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {[
                        { name: "John Doe", condition: "Hypertension", lastVisit: "Apr 15, 2025", status: "Stable" },
                        { name: "Emily Clark", condition: "Diabetes", lastVisit: "Apr 10, 2025", status: "Warning" },
                        { name: "Michael Johnson", condition: "Heart Disease", lastVisit: "Apr 5, 2025", status: "Critical" },
                        { name: "Sarah Williams", condition: "Asthma", lastVisit: "Mar 28, 2025", status: "Stable" },
                        { name: "David Brown", condition: "Arthritis", lastVisit: "Mar 20, 2025", status: "Stable" }
                      ].map((patient, index) => (
                        <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                          <div>
                            <h3 className="font-medium">{patient.name}</h3>
                            <p className="text-sm text-gray-500">{patient.condition}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              patient.status === "Stable" ? "bg-green-100 text-green-800" : 
                              patient.status === "Warning" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }`}>
                              {patient.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right column: Appointments and quick actions */}
            <div className="md:col-span-4 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Today's Schedule</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-health-blue"
                    onClick={() => window.location.href = "/appointments"}
                  >
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <AppointmentCard 
                    doctorName="John Doe"
                    specialty="Patient"
                    date="Today"
                    time="10:30 AM"
                    isUpcoming={true}
                  />
                  
                  <AppointmentCard 
                    doctorName="Emily Clark"
                    specialty="Patient"
                    date="Today"
                    time="2:00 PM"
                    isUpcoming={true}
                  />
                  
                  <AppointmentCard 
                    doctorName="Sarah Williams"
                    specialty="Patient"
                    date="Today"
                    time="4:00 PM"
                    isUpcoming={true}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-health-blue hover:bg-health-blue-dark justify-start"
                    onClick={() => window.location.href = "/messages"}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Patients
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start"
                    onClick={() => window.location.href = "/health-records"}>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Review Health Records
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start"
                    onClick={() => window.location.href = "/appointments"}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Appointments
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
