
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    healthRecords: [
      { date: "Apr 20, 2025", bloodPressure: "120/80", heartRate: 72, bloodGlucose: 110, temperature: 98.6, notes: "After walk" }
    ]
  },
  {
    id: 2,
    name: "Emily Clark",
    healthRecords: [
      { date: "Apr 10, 2025", bloodPressure: "130/85", heartRate: 77, bloodGlucose: 140, temperature: 99.2, notes: "Fasted" }
    ]
  },
];

export default function DoctorHealthRecords() {
  const [selected, setSelected] = useState<null | typeof mockPatients[0]>(null);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="doctor" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Patient Health Records</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {!selected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPatients.map((p) => (
                <Card key={p.id} className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>Latest BP: {p.healthRecords[0].bloodPressure}</div>
                    <div>Latest HR: {p.healthRecords[0].heartRate} bpm</div>
                    <div className="mt-2">
                      <Button variant="outline" onClick={() => setSelected(p)}>View Health Record</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-2">{selected.name}'s Records</h2>
              <div className="space-y-2">
                {selected.healthRecords.map((rec, i) => (
                  <Card key={i} className="border border-gray-200">
                    <CardHeader>
                      <CardTitle>{rec.date}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>Blood Pressure: {rec.bloodPressure} mmHg</div>
                      <div>Heart Rate: {rec.heartRate} bpm</div>
                      <div>Blood Glucose: {rec.bloodGlucose} mg/dL</div>
                      <div>Temperature: {rec.temperature} °F</div>
                      <div>Notes: <span className="text-sm">{rec.notes}</span></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={() => setSelected(null)} className="mt-4" variant="outline">
                Back to patients
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
