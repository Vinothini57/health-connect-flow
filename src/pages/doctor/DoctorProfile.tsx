
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";
import { User, Mail, Phone, Calendar } from "lucide-react";

export default function DoctorProfile() {
  const doctorInfo = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    email: "dr.sarah@hospital.com",
    phone: "+1 (555) 123-4567",
    experience: "15 years",
    schedule: "Mon-Fri, 9:00 AM - 5:00 PM",
    education: "MD - Johns Hopkins University",
    certifications: ["Board Certified in Cardiology", "Advanced Cardiac Life Support"]
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Doctor Profile</h1>
          <p className="text-gray-500">Manage your professional information</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-health-blue text-white flex items-center justify-center">
                  <User size={40} />
                </div>
                <div>
                  <h3 className="font-semibold text-xl">{doctorInfo.name}</h3>
                  <p className="text-gray-500">{doctorInfo.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{doctorInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{doctorInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>{doctorInfo.schedule}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Experience</h4>
                <p className="text-gray-600">{doctorInfo.experience}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Education</h4>
                <p className="text-gray-600">{doctorInfo.education}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Certifications</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {doctorInfo.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button>Update Profile</Button>
        </div>
      </div>
    </div>
  );
}
