
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { Heart, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";

export default function Onboarding() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    
    // Step 2: Medical History
    conditions: {
      diabetes: false,
      heartDisease: false,
      hypertension: false,
      asthma: false,
      arthritis: false,
      none: false,
    },
    primaryCondition: "",
    medications: "",
    allergies: "",
    
    // Step 3: Health Devices
    connectDevice: "no",
    deviceType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const inputEl = e.target as HTMLInputElement;
      const { checked } = inputEl;
      
      setFormData((prev) => ({
        ...prev,
        conditions: {
          ...prev.conditions,
          [name]: checked,
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleConditionChange = (name: string, checked: boolean) => {
    setFormData((prev) => {
      // If "None" is selected, uncheck all other conditions
      if (name === "none" && checked) {
        return {
          ...prev,
          conditions: {
            diabetes: false,
            heartDisease: false,
            hypertension: false,
            asthma: false,
            arthritis: false,
            none: true,
          }
        };
      }
      
      // If any condition other than "None" is selected, uncheck "None"
      let updatedConditions = {
        ...prev.conditions,
        [name]: checked,
      };
      
      if (name !== "none" && checked) {
        updatedConditions.none = false;
      }
      
      return {
        ...prev,
        conditions: updatedConditions
      };
    });
  };
  
  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep(step + 1);
  };
  
  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile completed",
        description: "Your health profile has been set up successfully!",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-health-blue' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-health-blue' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className={step >= 1 ? 'text-health-blue' : 'text-gray-500'}>Basic Info</span>
          <span className={step >= 2 ? 'text-health-blue' : 'text-gray-500'}>Health Profile</span>
          <span className={step >= 3 ? 'text-health-blue' : 'text-gray-500'}>Devices</span>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <Heart className="h-12 w-12 text-health-blue" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h2>
            <p className="text-gray-500 text-center mb-6">Help us personalize your healthcare experience</p>
            
            {renderProgressBar()}
            
            {step === 1 && (
              <form onSubmit={(e) => {e.preventDefault(); nextStep();}}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={formData.gender}
                      onValueChange={(value) => handleSelectChange("gender", value)}
                      required
                    >
                      <SelectTrigger className="w-full input-focus-within">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="non-binary">Non-binary</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-health-blue hover:bg-health-blue-dark"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}
            
            {step === 2 && (
              <form onSubmit={(e) => {e.preventDefault(); nextStep();}}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Do you have any of these conditions?</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="diabetes" 
                          checked={formData.conditions.diabetes}
                          onCheckedChange={(checked) => handleConditionChange("diabetes", checked as boolean)}
                        />
                        <Label htmlFor="diabetes" className="font-normal">Diabetes</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="heartDisease" 
                          checked={formData.conditions.heartDisease}
                          onCheckedChange={(checked) => handleConditionChange("heartDisease", checked as boolean)}
                        />
                        <Label htmlFor="heartDisease" className="font-normal">Heart Disease</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hypertension" 
                          checked={formData.conditions.hypertension}
                          onCheckedChange={(checked) => handleConditionChange("hypertension", checked as boolean)}
                        />
                        <Label htmlFor="hypertension" className="font-normal">Hypertension</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="asthma" 
                          checked={formData.conditions.asthma}
                          onCheckedChange={(checked) => handleConditionChange("asthma", checked as boolean)}
                        />
                        <Label htmlFor="asthma" className="font-normal">Asthma</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="arthritis" 
                          checked={formData.conditions.arthritis}
                          onCheckedChange={(checked) => handleConditionChange("arthritis", checked as boolean)}
                        />
                        <Label htmlFor="arthritis" className="font-normal">Arthritis</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="none" 
                          checked={formData.conditions.none}
                          onCheckedChange={(checked) => handleConditionChange("none", checked as boolean)}
                        />
                        <Label htmlFor="none" className="font-normal">None of these</Label>
                      </div>
                    </div>
                  </div>
                  
                  {!formData.conditions.none && Object.values(formData.conditions).some(value => value) && (
                    <div className="space-y-2">
                      <Label htmlFor="primaryCondition">Primary Condition</Label>
                      <Select 
                        value={formData.primaryCondition}
                        onValueChange={(value) => handleSelectChange("primaryCondition", value)}
                      >
                        <SelectTrigger className="w-full input-focus-within">
                          <SelectValue placeholder="Select primary condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.conditions.diabetes && (
                            <SelectItem value="diabetes">Diabetes</SelectItem>
                          )}
                          {formData.conditions.heartDisease && (
                            <SelectItem value="heartDisease">Heart Disease</SelectItem>
                          )}
                          {formData.conditions.hypertension && (
                            <SelectItem value="hypertension">Hypertension</SelectItem>
                          )}
                          {formData.conditions.asthma && (
                            <SelectItem value="asthma">Asthma</SelectItem>
                          )}
                          {formData.conditions.arthritis && (
                            <SelectItem value="arthritis">Arthritis</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Input
                      id="medications"
                      name="medications"
                      placeholder="List medications separated by commas"
                      value={formData.medications}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      name="allergies"
                      placeholder="List allergies separated by commas"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-health-blue hover:bg-health-blue-dark"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            )}
            
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Would you like to connect a health device?</Label>
                    <RadioGroup 
                      value={formData.connectDevice} 
                      onValueChange={(value) => handleSelectChange("connectDevice", value)}
                      className="grid gap-2 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="device-yes" />
                        <Label htmlFor="device-yes" className="font-normal">Yes, I want to connect a device</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="device-no" />
                        <Label htmlFor="device-no" className="font-normal">No, I'll add this later</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {formData.connectDevice === "yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="deviceType">Device Type</Label>
                      <Select 
                        value={formData.deviceType}
                        onValueChange={(value) => handleSelectChange("deviceType", value)}
                      >
                        <SelectTrigger className="w-full input-focus-within">
                          <SelectValue placeholder="Select your device" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fitbit">Fitbit</SelectItem>
                          <SelectItem value="apple-watch">Apple Watch</SelectItem>
                          <SelectItem value="samsung">Samsung Health</SelectItem>
                          <SelectItem value="garmin">Garmin</SelectItem>
                          <SelectItem value="glucose-monitor">Glucose Monitor</SelectItem>
                          <SelectItem value="blood-pressure">Blood Pressure Monitor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-health-blue hover:bg-health-blue-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Completing..." : "Complete Profile"}
                      {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
