
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Calendar,
  Clock,
  User,
  Search,
  Plus,
  Check,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";

export default function DoctorAppointments() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const appointments = [
    {
      id: 1,
      patientName: "John Smith",
      date: "2025-05-01",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      patientName: "Emma Wilson",
      date: "2025-05-02",
      time: "10:30 AM",
      type: "Follow-up",
      status: "Pending",
    },
    {
      id: 3,
      patientName: "Michael Brown",
      date: "2025-05-03",
      time: "01:15 PM",
      type: "Consultation",
      status: "Confirmed",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewAppointment(false);
    // Logic to create new appointment would go here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">Appointments</h1>
          <p className="text-sm text-gray-500">Manage your upcoming appointments</p>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative mb-4 md:mb-0 md:w-1/3">
                <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                <Input 
                  placeholder="Search patients..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button 
                className="bg-health-blue hover:bg-health-blue-dark flex items-center"
                onClick={() => setShowNewAppointment(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Appointment
              </Button>
            </div>
            
            {showNewAppointment && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>New Appointment</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateAppointment} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="patient">Patient</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Smith</SelectItem>
                            <SelectItem value="emma">Emma Wilson</SelectItem>
                            <SelectItem value="michael">Michael Brown</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="appointmentType">Appointment Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="checkup">Check-up</SelectItem>
                            <SelectItem value="followup">Follow-up</SelectItem>
                            <SelectItem value="consultation">Consultation</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <div className="relative">
                          <Input 
                            id="date" 
                            type="date" 
                            className="pl-10" 
                          />
                          <CalendarDays className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <div className="relative">
                          <Input 
                            id="time" 
                            type="time"
                            className="pl-10" 
                          />
                          <Clock className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input id="notes" placeholder="Add appointment notes..." />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowNewAppointment(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-health-blue hover:bg-health-blue-dark">
                        Schedule Appointment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.patientName}</h3>
                            <p className="text-xs text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
                        <Button variant="outline" className="text-xs h-8 w-full">Reschedule</Button>
                        <Button variant="outline" className="text-xs h-8 w-full text-red-500 hover:text-red-600">Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No appointments found matching your search.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
