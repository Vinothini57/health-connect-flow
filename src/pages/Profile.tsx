import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell, User, Edit, Save, X } from "lucide-react";

export default function Profile() {
  const userType = 'patient';
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "(555) 123-4567",
    dob: "1985-06-15",
    gender: "Male",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    emergencyContact: "Jane Doe",
    emergencyPhone: "(555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin",
    chronicConditions: "Hypertension",
    medications: "Lisinopril 10mg daily"
  });
  
  const [editData, setEditData] = useState({...profileData});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };
  
  const handleSave = () => {
    setProfileData({...editData});
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditData({...profileData});
    setIsEditing(false);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType={userType} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Profile</h1>
            <p className="text-sm text-gray-500">View and manage your personal information</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-health-red rounded-full"></span>
            </Button>
            
            {!isEditing ? (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="hidden md:inline-flex"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSave}
                  className="bg-health-blue hover:bg-health-blue-dark"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Profile summary card */}
              <div className="md:col-span-1">
                <Card className="border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="h-24 w-24 rounded-full bg-health-blue text-white flex items-center justify-center mx-auto mb-4">
                      <User className="h-12 w-12" />
                    </div>
                    <h2 className="text-xl font-bold">{profileData.firstName} {profileData.lastName}</h2>
                    <p className="text-sm text-gray-500">Patient</p>
                    
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mt-4 md:hidden"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                    
                    {isEditing && (
                      <div className="mt-4 flex flex-col space-y-2 md:hidden">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleSave}
                          className="bg-health-blue hover:bg-health-blue-dark"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Profile details */}
              <div className="md:col-span-3 space-y-6">
                {/* Personal Information */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        {isEditing ? (
                          <Input
                            id="firstName"
                            name="firstName"
                            value={editData.firstName}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.firstName}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        {isEditing ? (
                          <Input
                            id="lastName"
                            name="lastName"
                            value={editData.lastName}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.lastName}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={editData.email}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.email}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={editData.phone}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.phone}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        {isEditing ? (
                          <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={editData.dob}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.dob}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        {isEditing ? (
                          <Input
                            id="gender"
                            name="gender"
                            value={editData.gender}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.gender}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Address */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            name="address"
                            value={editData.address}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.address}</div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          {isEditing ? (
                            <Input
                              id="city"
                              name="city"
                              value={editData.city}
                              onChange={handleChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">{profileData.city}</div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="state">State</Label>
                          {isEditing ? (
                            <Input
                              id="state"
                              name="state"
                              value={editData.state}
                              onChange={handleChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">{profileData.state}</div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          {isEditing ? (
                            <Input
                              id="zipCode"
                              name="zipCode"
                              value={editData.zipCode}
                              onChange={handleChange}
                            />
                          ) : (
                            <div className="p-2 border rounded-md bg-gray-50">{profileData.zipCode}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Medical Information */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bloodType">Blood Type</Label>
                        {isEditing ? (
                          <Input
                            id="bloodType"
                            name="bloodType"
                            value={editData.bloodType}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.bloodType}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="allergies">Allergies</Label>
                        {isEditing ? (
                          <Input
                            id="allergies"
                            name="allergies"
                            value={editData.allergies}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.allergies}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                        {isEditing ? (
                          <Input
                            id="chronicConditions"
                            name="chronicConditions"
                            value={editData.chronicConditions}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.chronicConditions}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="medications">Current Medications</Label>
                        {isEditing ? (
                          <Input
                            id="medications"
                            name="medications"
                            value={editData.medications}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.medications}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Emergency Contact */}
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">Contact Name</Label>
                        {isEditing ? (
                          <Input
                            id="emergencyContact"
                            name="emergencyContact"
                            value={editData.emergencyContact}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.emergencyContact}</div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="emergencyPhone">Contact Phone</Label>
                        {isEditing ? (
                          <Input
                            id="emergencyPhone"
                            name="emergencyPhone"
                            value={editData.emergencyPhone}
                            onChange={handleChange}
                          />
                        ) : (
                          <div className="p-2 border rounded-md bg-gray-50">{profileData.emergencyPhone}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
