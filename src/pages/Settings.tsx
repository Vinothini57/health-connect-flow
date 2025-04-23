import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Sidebar from "@/components/dashboard/Sidebar";
import { Bell, Shield, Lock, Bell as BellIcon, Smartphone, Eye, Mail } from "lucide-react";

export default function Settings() {
  const userType = 'patient';
  
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    messages: true,
    reminders: true,
    healthAlerts: true,
    marketing: false,
    systemUpdates: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    anonymousAnalytics: true,
    showProfile: true
  });
  
  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting]
    });
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userType={userType} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Settings</h1>
            <p className="text-sm text-gray-500">Manage your account preferences</p>
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
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Account Settings */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details and password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="mt-1"
                  />
                </div>
                
                <Button className="bg-health-blue hover:bg-health-blue-dark mt-2">
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>
            
            {/* Notification Settings */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellIcon className="h-5 w-5 text-health-blue" />
                    <Label htmlFor="appointments">Appointment Reminders</Label>
                  </div>
                  <Switch
                    id="appointments"
                    checked={notificationSettings.appointments}
                    onCheckedChange={() => handleNotificationChange('appointments')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-health-blue" />
                    <Label htmlFor="messages">Message Notifications</Label>
                  </div>
                  <Switch
                    id="messages"
                    checked={notificationSettings.messages}
                    onCheckedChange={() => handleNotificationChange('messages')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5 text-health-blue" />
                    <Label htmlFor="reminders">Medication Reminders</Label>
                  </div>
                  <Switch
                    id="reminders"
                    checked={notificationSettings.reminders}
                    onCheckedChange={() => handleNotificationChange('reminders')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellIcon className="h-5 w-5 text-health-red" />
                    <Label htmlFor="healthAlerts">Health Alerts</Label>
                  </div>
                  <Switch
                    id="healthAlerts"
                    checked={notificationSettings.healthAlerts}
                    onCheckedChange={() => handleNotificationChange('healthAlerts')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <Label htmlFor="marketing">Marketing Communications</Label>
                  </div>
                  <Switch
                    id="marketing"
                    checked={notificationSettings.marketing}
                    onCheckedChange={() => handleNotificationChange('marketing')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellIcon className="h-5 w-5 text-gray-500" />
                    <Label htmlFor="systemUpdates">System Updates</Label>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={() => handleNotificationChange('systemUpdates')}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Privacy Settings */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage how your information is used and shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-health-blue" />
                      <Label htmlFor="shareData">Share Data with Healthcare Providers</Label>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Allow your doctors to view your health data</p>
                  </div>
                  <Switch
                    id="shareData"
                    checked={privacySettings.shareData}
                    onCheckedChange={() => handlePrivacyChange('shareData')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-health-blue" />
                      <Label htmlFor="anonymousAnalytics">Anonymous Analytics</Label>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Share anonymous data for research and improvements</p>
                  </div>
                  <Switch
                    id="anonymousAnalytics"
                    checked={privacySettings.anonymousAnalytics}
                    onCheckedChange={() => handlePrivacyChange('anonymousAnalytics')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-5 w-5 text-health-blue" />
                      <Label htmlFor="showProfile">Profile Visibility</Label>
                    </div>
                    <p className="text-sm text-gray-500 ml-7">Allow your profile to be visible to healthcare providers</p>
                  </div>
                  <Switch
                    id="showProfile"
                    checked={privacySettings.showProfile}
                    onCheckedChange={() => handlePrivacyChange('showProfile')}
                  />
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    Request Data Deletion
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Connected Devices */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Manage devices connected to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-8 w-8 text-health-blue" />
                      <div>
                        <h3 className="font-medium">iPhone 13</h3>
                        <p className="text-xs text-gray-500">Last active: Today at 10:15 AM</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-8 w-8 text-health-blue" />
                      <div>
                        <h3 className="font-medium">Apple Watch</h3>
                        <p className="text-xs text-gray-500">Last active: Today at 9:45 AM</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Disconnect</Button>
                  </div>
                  
                  <Button className="bg-health-blue hover:bg-health-blue-dark w-full">
                    Connect New Device
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
