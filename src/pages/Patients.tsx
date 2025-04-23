
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    dob: "1990-01-15",
    gender: "Male",
    phone: "555-123-4567",
    email: "john@example.com",
    address: "123 Main St, Springfield",
    medicalHistory: "Hypertension, Allergies",
  },
  {
    id: 2,
    name: "Emily Clark",
    dob: "1982-08-10",
    gender: "Female",
    phone: "555-234-1234",
    email: "emily@example.com",
    address: "895 Brighton Blvd, Metropolis",
    medicalHistory: "Diabetes, Asthma",
  },
  {
    id: 3,
    name: "Sarah Williams",
    dob: "1978-12-20",
    gender: "Female",
    phone: "555-351-9999",
    email: "sarah@samplemail.com",
    address: "44 Oakmont Dr, Smallville",
    medicalHistory: "Arthritis",
  }
];

export default function Patients() {
  const [selected, setSelected] = useState<null | typeof mockPatients[0]>(null);
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Patients</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {!selected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPatients.map((p) => (
                <Card key={p.id} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">DOB: {p.dob}</p>
                    <p className="text-sm text-gray-500">Gender: {p.gender}</p>
                    <p className="text-sm text-gray-500">Phone: {p.phone}</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSelected(p)}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle>{selected.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div><b>Date of Birth:</b> {selected.dob}</div>
                  <div><b>Gender:</b> {selected.gender}</div>
                  <div><b>Phone:</b> {selected.phone}</div>
                  <div><b>Email:</b> {selected.email}</div>
                  <div><b>Address:</b> {selected.address}</div>
                  <div><b>Medical History:</b> {selected.medicalHistory}</div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => setSelected(null)} variant="outline">
                      Back
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
