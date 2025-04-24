
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/dashboard/Sidebar";
import { MessageSquare, User, Mail, Phone } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const doctorProfile = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiologist",
    qualification: "MD, FACC",
    experience: "15 years",
    licensedIn: "California",
    languages: ["English", "Spanish"],
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">Doctor Profile</h1>
          <p className="text-sm text-gray-500">Manage your professional information</p>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 rounded-full bg-health-blue text-white flex items-center justify-center text-xl font-semibold">
                    {doctorProfile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{doctorProfile.name}</h2>
                    <p className="text-gray-500">{doctorProfile.specialty}</p>
                  </div>
                </div>
                
                <div className="grid gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{doctorProfile.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{doctorProfile.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Qualification</Label>
                    <Input value={doctorProfile.qualification} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Years of Experience</Label>
                    <Input value={doctorProfile.experience} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Licensed In</Label>
                    <Input value={doctorProfile.licensedIn} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <Input value={doctorProfile.languages.join(", ")} readOnly={!isEditing} />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                  {isEditing && (
                    <Button className="ml-2 bg-health-blue hover:bg-health-blue-dark">
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
