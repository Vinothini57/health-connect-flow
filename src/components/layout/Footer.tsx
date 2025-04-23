
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Heart className="h-6 w-6 text-health-blue mr-2" />
              <span className="text-lg font-bold text-health-blue-dark">HealthConnect</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Connecting patients and doctors for better healthcare outcomes.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-health-blue">About Us</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-health-blue">Careers</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-health-blue">Contact</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-health-blue">Blog</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-health-blue">FAQ</Link></li>
              <li><Link to="/support" className="text-sm text-gray-600 hover:text-health-blue">Support</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-health-blue">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-health-blue">Terms of Service</Link></li>
              <li><Link to="/hipaa" className="text-sm text-gray-600 hover:text-health-blue">HIPAA Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} HealthConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
