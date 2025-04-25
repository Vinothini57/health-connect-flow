import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { ArrowRight, Activity, Calendar, Video, MessageSquare, Shield, Users } from "lucide-react";
export default function Index() {
  return <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-health-blue to-health-blue-dark text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 512 512%22%3E%3Cpath fill=%22%23ffffff10%22 d=%22M364.61 390.77L286 317.14l27.79-27.79 78.86 73.88 140.78-140.78 27.67 28.06zM60.44 191.96L32 220.5l120.55 120.56 28.44-28.44L60.44 191.96z%22/%3E%3C/svg%3E')] bg-repeat bg-[length:64px_64px] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Healthcare Made Simple, Accessible, and Personal
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Connect with doctors, monitor your health, and receive personalized care
              from anywhere, anytime.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-health-blue hover:bg-blue-50 shadow-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="border-white hover:bg-white/10 text-gray-600">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-full max-w-4xl h-16 bg-white rounded-t-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How HealthConnect Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-blue rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Registration</h3>
              <p className="text-gray-600">Create your profile, connect your devices, and start your health journey in minutes.</p>
            </div>
            
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-green rounded-full flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Monitoring</h3>
              <p className="text-gray-600">Track your vitals with easy manual or automatic data syncing from wearable devices.</p>
            </div>
            
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-orange rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Appointments</h3>
              <p className="text-gray-600">Schedule virtual or in-person appointments with specialists who understand your needs.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-blue rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Telemedicine</h3>
              <p className="text-gray-600">Connect with healthcare providers through secure, high-quality video consultations.</p>
            </div>
            
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-green rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Messaging</h3>
              <p className="text-gray-600">Communicate with your healthcare team through our encrypted messaging platform.</p>
            </div>
            
            <div className="bg-health-gray-light p-6 rounded-lg transition-all hover:shadow-md">
              <div className="h-12 w-12 bg-health-orange rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Security</h3>
              <p className="text-gray-600">Your health information is protected with enterprise-grade security and HIPAA compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-health-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to take control of your health?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of patients and doctors who are already using HealthConnect
              to improve healthcare outcomes.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-health-blue hover:bg-health-blue-dark">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>;
}