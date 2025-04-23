
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-health-blue mr-2" />
              <span className="text-xl font-bold text-health-blue-dark">HealthConnect</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/features" className="text-gray-600 hover:text-health-blue px-3 py-2 text-sm font-medium">
              Features
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-health-blue px-3 py-2 text-sm font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-health-blue px-3 py-2 text-sm font-medium">
              Contact
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm" className="ml-2">
                <User className="h-4 w-4 mr-2" />
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-health-blue hover:bg-health-blue-dark">
                Sign Up
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-health-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-health-blue"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link to="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50">
              Features
            </Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50">
              About Us
            </Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50">
              Contact
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-health-blue hover:bg-gray-50">
              Log In
            </Link>
            <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-health-blue text-white hover:bg-health-blue-dark">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
