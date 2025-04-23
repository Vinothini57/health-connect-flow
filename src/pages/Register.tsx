
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/layout/Layout";
import { Heart, ArrowRight, ChevronRight } from "lucide-react";

export default function Register() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "patient", // patient, doctor, or admin
    agreeToTerms: false,
    // Doctor specific fields
    specialty: "",
    licenseNumber: "",
    yearOfGraduation: "",
    educationInstitution: "",
    yearsOfExperience: "",
    dateOfBirth: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      userType: value,
    }));
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Registration successful",
        description: "Welcome to HealthConnect! Please complete your profile.",
      });
      
      if (formData.userType === "patient") {
        navigate("/onboarding");
      } else if (formData.userType === "doctor") {
        navigate("/doctor/dashboard");
      } else if (formData.userType === "admin") {
        navigate("/admin/dashboard");
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center mb-6">
              <Heart className="h-12 w-12 text-health-blue" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Create your account</h2>
            <p className="text-gray-500 text-center mb-6">Join HealthConnect and take control of your health</p>
            
            <div className="mb-8">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-health-blue' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                {formData.userType === "doctor" && (
                  <>
                    <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-health-blue' : 'bg-gray-200'}`}></div>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-health-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                      3
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-health-blue">Account Type</span>
                <span className={step >= 2 ? 'text-health-blue' : 'text-gray-500'}>Personal Info</span>
                {formData.userType === "doctor" && (
                  <span className={step >= 3 ? 'text-health-blue' : 'text-gray-500'}>Credentials</span>
                )}
              </div>
            </div>
            
            {step === 1 ? (
              <form onSubmit={(e) => {e.preventDefault(); handleNextStep();}}>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">I am a:</Label>
                    <RadioGroup 
                      value={formData.userType} 
                      onValueChange={handleUserTypeChange}
                      className="grid grid-cols-2 gap-4 mt-3"
                    >
                      <div className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${formData.userType === 'patient' ? 'border-health-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <RadioGroupItem value="patient" id="patient" className="sr-only" />
                        <Label htmlFor="patient" className="cursor-pointer text-center">
                          <span className="block text-lg font-medium mb-1">Patient</span>
                          <span className="text-sm text-gray-500">I'm seeking healthcare</span>
                        </Label>
                      </div>
                      
                      <div className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer transition-all ${formData.userType === 'doctor' ? 'border-health-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <RadioGroupItem value="doctor" id="doctor" className="sr-only" />
                        <Label htmlFor="doctor" className="cursor-pointer text-center">
                          <span className="block text-lg font-medium mb-1">Doctor</span>
                          <span className="text-sm text-gray-500">I provide healthcare</span>
                        </Label>
                      </div>
                    </RadioGroup>
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
            ) : step === 2 ? (
              <form onSubmit={(e) => {e.preventDefault(); formData.userType === "doctor" ? setStep(3) : handleSubmit(e);}}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-focus-within"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-focus-within"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
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
                  
                  <div className="flex items-start space-x-2">
                    <Input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      className="h-4 w-4 mt-1"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm font-normal">
                      I agree to the <Link to="/terms" className="text-health-blue hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-health-blue hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-health-blue hover:bg-health-blue-dark"
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {formData.userType === "doctor" ? "Continue" : isLoading ? "Creating Account..." : "Create Account"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            ) : (
              // Doctor credentials step
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Medical Specialty</Label>
                    <Input
                      id="specialty"
                      name="specialty"
                      required
                      value={formData.specialty}
                      onChange={handleChange}
                      placeholder="e.g., Cardiologist, Pediatrician"
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Medical License Number</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      required
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="educationInstitution">Medical School</Label>
                    <Input
                      id="educationInstitution"
                      name="educationInstitution"
                      required
                      value={formData.educationInstitution}
                      onChange={handleChange}
                      placeholder="e.g., Harvard Medical School"
                      className="input-focus-within"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearOfGraduation">Year of Graduation</Label>
                      <Input
                        id="yearOfGraduation"
                        name="yearOfGraduation"
                        required
                        type="number"
                        min="1950"
                        max="2025"
                        value={formData.yearOfGraduation}
                        onChange={handleChange}
                        className="input-focus-within"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        required
                        type="number"
                        min="0"
                        max="70"
                        value={formData.yearsOfExperience}
                        onChange={handleChange}
                        className="input-focus-within"
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500 mt-4">
                    Note: Your credentials will be verified by our admin team before your account is activated. This process usually takes 1-2 business days.
                  </p>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-health-blue hover:bg-health-blue-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting Credentials..." : "Submit Credentials"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            )}
            
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">Already have an account?</span>{" "}
              <Link to="/login" className="text-health-blue font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
