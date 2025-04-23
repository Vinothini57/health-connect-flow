import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Sidebar from "@/components/dashboard/Sidebar";
import { useForm } from "react-hook-form";
import { Bell, Heart, Droplet, Activity, Thermometer, Filter, Plus, Download, FilePlus } from "lucide-react";

interface HealthRecord {
  id: number;
  date: string;
  bloodPressure: string;
  heartRate: number;
  bloodGlucose: number;
  temperature: number;
  notes: string;
}

interface HealthRecordFormValues {
  bloodPressure: string;
  heartRate: string;
  bloodGlucose: string;
  temperature: string;
  notes: string;
}

export default function HealthRecords() {
  const userType = 'patient';
  
  const [records, setRecords] = useState<HealthRecord[]>([
    { id: 1, date: "Apr 20, 2025", bloodPressure: "120/80", heartRate: 72, bloodGlucose: 110, temperature: 98.6, notes: "After morning walk" },
    { id: 2, date: "Apr 15, 2025", bloodPressure: "118/78", heartRate: 68, bloodGlucose: 105, temperature: 98.4, notes: "Fasting" },
    { id: 3, date: "Apr 10, 2025", bloodPressure: "122/82", heartRate: 75, bloodGlucose: 115, temperature: 98.7, notes: "After lunch" },
    { id: 4, date: "Apr 5, 2025", bloodPressure: "125/85", heartRate: 80, bloodGlucose: 120, temperature: 99.1, notes: "Feeling tired" },
    { id: 5, date: "Mar 30, 2025", bloodPressure: "116/76", heartRate: 70, bloodGlucose: 100, temperature: 98.3, notes: "Morning reading" }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  
  const form = useForm<HealthRecordFormValues>({
    defaultValues: {
      bloodPressure: "",
      heartRate: "",
      bloodGlucose: "",
      temperature: "",
      notes: ""
    }
  });
  
  const onSubmit = (data: HealthRecordFormValues) => {
    const newRecord: HealthRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      bloodPressure: data.bloodPressure,
      heartRate: parseInt(data.heartRate),
      bloodGlucose: parseInt(data.bloodGlucose),
      temperature: parseFloat(data.temperature),
      notes: data.notes
    };
    
    setRecords([newRecord, ...records]);
    setShowAddForm(false);
    form.reset();
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType={userType} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Health Records</h1>
            <p className="text-sm text-gray-500">Track and manage your health metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-red rounded-full"></span>
            </Button>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Health metrics cards */}
            <div className="md:col-span-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Latest Health Metrics</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-base font-medium">
                      <span className="text-gray-700">Blood Pressure</span>
                      <Droplet className="h-5 w-5 text-health-blue" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-health-green">
                      {records[0]?.bloodPressure || "N/A"}
                      <span className="text-sm ml-1 font-normal text-gray-500">mmHg</span>
                    </div>
                    <p className="text-xs text-gray-500">Last updated: {records[0]?.date || "N/A"}</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-base font-medium">
                      <span className="text-gray-700">Heart Rate</span>
                      <Heart className="h-5 w-5 text-health-blue" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-health-green">
                      {records[0]?.heartRate || "N/A"}
                      <span className="text-sm ml-1 font-normal text-gray-500">bpm</span>
                    </div>
                    <p className="text-xs text-gray-500">Last updated: {records[0]?.date || "N/A"}</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-base font-medium">
                      <span className="text-gray-700">Blood Glucose</span>
                      <Activity className="h-5 w-5 text-health-blue" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-health-orange">
                      {records[0]?.bloodGlucose || "N/A"}
                      <span className="text-sm ml-1 font-normal text-gray-500">mg/dL</span>
                    </div>
                    <p className="text-xs text-gray-500">Last updated: {records[0]?.date || "N/A"}</p>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-base font-medium">
                      <span className="text-gray-700">Temperature</span>
                      <Thermometer className="h-5 w-5 text-health-blue" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-2xl font-bold text-health-green">
                      {records[0]?.temperature || "N/A"}
                      <span className="text-sm ml-1 font-normal text-gray-500">°F</span>
                    </div>
                    <p className="text-xs text-gray-500">Last updated: {records[0]?.date || "N/A"}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Add health record form */}
            {showAddForm ? (
              <div className="md:col-span-12">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Add Health Record</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="bloodPressure"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Pressure (mmHg)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 120/80" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="heartRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Heart Rate (bpm)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 72" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="bloodGlucose"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Glucose (mg/dL)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 110" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="temperature"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Temperature (°F)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.1" placeholder="e.g. 98.6" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Input placeholder="Any additional details..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end space-x-2">
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAddForm(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-health-blue hover:bg-health-blue-dark">
                            Save Record
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="md:col-span-12 flex justify-between items-center">
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-health-blue hover:bg-health-blue-dark"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Health Record
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            )}
            
            {/* Health records table */}
            <div className="md:col-span-12">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Health Record History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Blood Pressure</TableHead>
                        <TableHead>Heart Rate</TableHead>
                        <TableHead>Blood Glucose</TableHead>
                        <TableHead>Temperature</TableHead>
                        <TableHead>Notes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {records.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.bloodPressure} mmHg</TableCell>
                          <TableCell>{record.heartRate} bpm</TableCell>
                          <TableCell>{record.bloodGlucose} mg/dL</TableCell>
                          <TableCell>{record.temperature} °F</TableCell>
                          <TableCell>{record.notes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
