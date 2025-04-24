
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Calendar,
  Clock,
  User,
  Search,
  Plus,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";

export default function PatientAppointments() {
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const appointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2025-05-01",
      time: "09:00 AM",
      type: "Check-up",
      status: "Confirmed",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "Endocrinologist",
      date: "2025-05-10",
      time: "02:30 PM",
      type: "Follow-up",
      status: "Pending",
    },
  ];

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRequestAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewAppointment(false);
    // Logic to create new appointment would go here
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="patient" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">My Appointments</h1>
          <p className="text-sm text-gray-500">Manage your healthcare appointments</p>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative mb-4 md:mb-0 md:w-1/3">
                <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                <Input 
                  placeholder="Search doctors..." 
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
                Request Appointment
              </Button>
            </div>
            
            {showNewAppointment && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-medium text-lg mb-4">Request an Appointment</h3>
                  <form onSubmit={handleRequestAppointment} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Doctor</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr-johnson">Dr. Sarah Johnson (Cardiologist)</SelectItem>
                            <SelectItem value="dr-chen">Dr. Michael Chen (Endocrinologist)</SelectItem>
                            <SelectItem value="dr-patel">Dr. Ravi Patel (General Physician)</SelectItem>
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
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <div className="relative">
                          <Input 
                            id="preferredDate" 
                            type="date" 
                            className="pl-10" 
                          />
                          <CalendarDays className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <div className="relative">
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (1PM - 5PM)</SelectItem>
                              <SelectItem value="evening">Evening (6PM - 8PM)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="reason">Reason for Visit</Label>
                        <Input id="reason" placeholder="Briefly describe your symptoms or reason..." />
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
                        Request Appointment
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <div className={`h-2 ${appointment.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-health-blue text-white flex items-center justify-center mr-3">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{appointment.doctorName}</h3>
                            <p className="text-xs text-gray-500">{appointment.specialty}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="h-4 w-4 mr-2 flex items-center justify-center">
                            <span className="block h-2 w-2 rounded-full bg-blue-500"></span>
                          </div>
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                        <Button variant="outline" className="text-xs h-8">Reschedule</Button>
                        <Button variant="outline" className="text-xs h-8 text-red-500 hover:text-red-600">Cancel</Button>
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
