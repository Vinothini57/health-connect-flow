
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";
import { User, Mail, Phone, Calendar } from "lucide-react";

export default function PatientProfile() {
  const patientInfo = {
    name: "John Smith",
    dateOfBirth: "15 May 1985",
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    bloodType: "A+",
    allergies: ["Penicillin", "Pollen"],
    medications: ["Lisinopril 10mg", "Metformin 500mg"],
    emergencyContact: {
      name: "Mary Smith",
      relation: "Spouse",
      phone: "+1 (555) 123-4567"
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="patient" />
      
      <div className="flex-1 overflow-auto p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Patient Profile</h1>
          <p className="text-gray-500">View and manage your health information</p>
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
                  <h3 className="font-semibold text-xl">{patientInfo.name}</h3>
                  <p className="text-gray-500">DOB: {patientInfo.dateOfBirth}</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{patientInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{patientInfo.phone}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Blood Type</h4>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  {patientInfo.bloodType}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {patientInfo.allergies.map((allergy, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Current Medications</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {patientInfo.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 mb-2">Emergency Contact</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600">{patientInfo.emergencyContact.name}</p>
                  <p className="text-gray-500 text-sm">{patientInfo.emergencyContact.relation}</p>
                  <p className="text-gray-600">{patientInfo.emergencyContact.phone}</p>
                </div>
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
