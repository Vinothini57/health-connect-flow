
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import HealthMetricCard from "@/components/dashboard/HealthMetricCard";
import HealthChart from "@/components/dashboard/HealthChart";
import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { generateRandomData } from "@/lib/utils";
import { Bell, Heart, Droplet, Activity, Thermometer, Plus, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [bloodPressureData] = useState(generateRandomData(7, 110, 145));
  const [glucoseData] = useState(generateRandomData(7, 80, 130));
  const [heartRateData] = useState(generateRandomData(7, 65, 95));

  const handleLogout = () => {
    // Implement logout logic here
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, John</p>
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
            {/* Left column: Health metrics and charts */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Health Metrics</h2>
                  <Button variant="ghost" size="sm" className="text-health-blue">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <HealthMetricCard 
                    title="Blood Pressure" 
                    value="120/80" 
                    status="normal" 
                    trend="stable"
                    icon={<Droplet className="h-5 w-5" />} 
                    unit="mmHg" 
                  />
                  
                  <HealthMetricCard 
                    title="Heart Rate" 
                    value="72" 
                    status="normal" 
                    trend="down"
                    icon={<Heart className="h-5 w-5" />} 
                    unit="bpm" 
                  />
                  
                  <HealthMetricCard 
                    title="Blood Glucose" 
                    value="110" 
                    status="warning" 
                    trend="up"
                    icon={<Activity className="h-5 w-5" />} 
                    unit="mg/dL" 
                  />
                  
                  <HealthMetricCard 
                    title="Temperature" 
                    value="98.6" 
                    status="normal" 
                    trend="stable"
                    icon={<Thermometer className="h-5 w-5" />} 
                    unit="°F" 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Health Trends</h2>
                  <Button variant="ghost" size="sm" className="text-health-blue">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HealthChart 
                    title="Blood Pressure" 
                    data={bloodPressureData} 
                    unit="mmHg" 
                    color="#2C6BED" 
                  />
                  
                  <HealthChart 
                    title="Blood Glucose" 
                    data={glucoseData} 
                    unit="mg/dL" 
                    color="#4CAF50" 
                  />
                </div>
              </div>
            </div>
            
            {/* Right column: Appointments and quick actions */}
            <div className="md:col-span-4 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Appointments</h2>
                  <Button variant="ghost" size="sm" className="text-health-blue">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <AppointmentCard 
                    doctorName="Dr. Sarah Johnson"
                    specialty="Cardiologist"
                    date="Apr 25, 2025"
                    time="10:30 AM"
                    isUpcoming={true}
                  />
                  
                  <AppointmentCard 
                    doctorName="Dr. Michael Chen"
                    specialty="Endocrinologist"
                    date="Apr 15, 2025"
                    time="2:00 PM"
                    isUpcoming={false}
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Quick Actions</h2>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-health-blue hover:bg-health-blue-dark justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Book New Appointment
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="mr-2 h-4 w-4" />
                    Log Health Data
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Your Doctor
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
