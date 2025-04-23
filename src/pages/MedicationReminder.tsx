
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, List } from "lucide-react";

interface Medication {
  id: number;
  tablet: string;
  time: string;
}

const initialDos = [
  "Drink plenty of water",
  "Take medications as prescribed",
  "Eat fresh fruits and vegetables"
];

const initialDonts = [
  "Skip meals",
  "Self-medicate",
  "Eat too much salt or sugar"
];

export default function MedicationReminder() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [tablet, setTablet] = useState("");
  const [time, setTime] = useState("");
  const [dos, setDos] = useState(initialDos);
  const [donts, setDonts] = useState(initialDonts);
  const [newDo, setNewDo] = useState("");
  const [newDont, setNewDont] = useState("");

  const handleAddMedication = () => {
    if (tablet && time) {
      setMedications([
        ...medications,
        { id: Date.now(), tablet, time },
      ]);
      setTablet("");
      setTime("");
    }
  };

  const handleRemoveMedication = (id: number) => {
    setMedications(meds => meds.filter(m => m.id !== id));
  };

  const handleAddDo = () => {
    if (newDo) {
      setDos([...dos, newDo]);
      setNewDo("");
    }
  };
  const handleAddDont = () => {
    if (newDont) {
      setDonts([...donts, newDont]);
      setNewDont("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType="patient" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Medication Reminder &amp; Diet Suggestions</h1>
            <p className="text-sm text-gray-500">Manage your reminders and healthy habits</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Medication Reminder */}
            <div className="md:col-span-7 space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-health-blue" />
                    Medication Reminder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {medications.length === 0 && (
                      <p className="text-sm text-gray-500">No reminders yet. Add your medication below:</p>
                    )}
                    <ul className="divide-y divide-gray-100 mb-4">
                      {medications.map((med) => (
                        <li key={med.id} className="flex justify-between items-center py-2">
                          <div>
                            <span className="font-medium">{med.tablet}</span> at <span className="text-blue-600">{med.time}</span>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => handleRemoveMedication(med.id)}>Remove</Button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                      <div className="flex-1">
                        <Label htmlFor="tablet">Tablet Name</Label>
                        <Input id="tablet" value={tablet} onChange={e => setTablet(e.target.value)} placeholder="e.g. Metformin" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 8:00 AM" />
                      </div>
                      <Button className="mt-6 md:mt-0" onClick={handleAddMedication}>Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Diet Suggestions */}
            <div className="md:col-span-5 space-y-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <List className="mr-2 h-5 w-5 text-health-green" />
                    Diet Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm text-green-900">Dos</h3>
                    <ul className="mb-3 list-disc ml-5">
                      {dos.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex space-x-2 mb-4">
                      <Input
                        placeholder="Add new Do"
                        value={newDo}
                        onChange={e => setNewDo(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleAddDo}>Add</Button>
                    </div>
                    <h3 className="font-semibold mb-2 text-sm text-red-800">Don'ts</h3>
                    <ul className="mb-3 list-disc ml-5">
                      {donts.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new Don't"
                        value={newDont}
                        onChange={e => setNewDont(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleAddDont}>Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
