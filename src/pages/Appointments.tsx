import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell, Calendar as CalendarIcon, Clock, Video, Plus, X } from "lucide-react";

// Mock patients data
const mockPatients = [
  { id: 1, name: "John Smith", email: "john@example.com" },
  { id: 2, name: "Emma Wilson", email: "emma@example.com" },
  { id: 3, name: "Michael Brown", email: "michael@example.com" },
];

interface Appointment {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

export default function Appointments() {
  const { toast } = useToast();
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [appointmentType, setAppointmentType] = useState("video");
  const [selectedTime, setSelectedTime] = useState("");
  
  const appointments: Appointment[] = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      doctorSpecialty: "Cardiologist",
      date: "2025-04-25",
      time: "10:30",
      status: "upcoming",
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      doctorSpecialty: "Endocrinologist",
      date: "2025-04-15",
      time: "14:00",
      status: "completed",
    },
    {
      id: 3,
      doctorName: "Dr. Emily Rodriguez",
      doctorSpecialty: "Primary Care",
      date: "2025-05-05",
      time: "09:15",
      status: "upcoming",
    },
    {
      id: 4,
      doctorName: "Dr. Robert Williams",
      doctorSpecialty: "Neurologist",
      date: "2025-03-22",
      time: "15:45",
      status: "cancelled",
    },
  ];
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filterStatus === "all") return true;
    return appointment.status === filterStatus;
  });
  
  const handleBookAppointment = () => {
    if (!selectedPatient || !selectedTime) {
      toast({
        title: "Error",
        description: "Please select both a patient and time slot",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been scheduled successfully.",
    });
    setIsNewAppointmentDialogOpen(false);
  };

  const handleCancelAppointment = (id: number) => {
    // Implement cancel logic
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled.",
    });
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${meridiem}`;
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-health-blue";
      case "completed":
        return "bg-green-100 text-health-green";
      case "cancelled":
        return "bg-red-100 text-health-red";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Schedule Appointments</h1>
            <p className="text-sm text-gray-500">Manage your patient appointments</p>
          </div>
          
          <Button 
            onClick={() => setIsNewAppointmentDialogOpen(true)}
            className="bg-health-blue hover:bg-health-blue-dark"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mb-6">
            <Label>Filter by status:</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointments</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.doctorName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.doctorSpecialty}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm text-gray-900 flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                            {formatDate(appointment.date)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1.5" />
                            {formatTime(appointment.time)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {appointment.status === "upcoming" && (
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-health-blue border-health-blue hover:bg-health-blue hover:text-white"
                            >
                              <Video className="h-3.5 w-3.5 mr-1.5" />
                              Join
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-health-red border-health-red hover:bg-health-red hover:text-white"
                              onClick={() => handleCancelAppointment(appointment.id)}
                            >
                              <X className="h-3.5 w-3.5 mr-1.5" />
                              Cancel
                            </Button>
                          </div>
                        )}
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm">
                            View Summary
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      
      {/* New Appointment Dialog */}
      <Dialog open={isNewAppointmentDialogOpen} onOpenChange={setIsNewAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="patient">Patient</Label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger id="patient">
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {mockPatients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-3"
                disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">Available Time Slots</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Consultation</SelectItem>
                  <SelectItem value="in-person">In-Person Visit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAppointmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBookAppointment} className="bg-health-blue hover:bg-health-blue-dark">
              Schedule Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
