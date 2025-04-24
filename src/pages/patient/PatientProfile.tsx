
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/dashboard/Sidebar";
import { MessageSquare, User, Mail, Phone } from "lucide-react";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  const patientProfile = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
    dateOfBirth: "1985-06-15",
    bloodType: "O+",
    allergies: "None",
    medications: "Aspirin",
    emergencyContact: "Jane Smith (+1 555-123-4567)",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="patient" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <h1 className="text-xl font-bold text-gray-800">Patient Profile</h1>
          <p className="text-sm text-gray-500">Manage your personal information</p>
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
                    {patientProfile.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{patientProfile.name}</h2>
                    <p className="text-gray-500">Patient ID: #123456</p>
                  </div>
                </div>
                
                <div className="grid gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{patientProfile.email}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{patientProfile.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input value={patientProfile.dateOfBirth} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Input value={patientProfile.bloodType} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Allergies</Label>
                    <Input value={patientProfile.allergies} readOnly={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Current Medications</Label>
                    <Input value={patientProfile.medications} readOnly={!isEditing} />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Emergency Contact</Label>
                    <Input value={patientProfile.emergencyContact} readOnly={!isEditing} />
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
