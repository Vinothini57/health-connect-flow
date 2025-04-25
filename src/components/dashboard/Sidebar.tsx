import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  User,
  Menu,
  X,
  Activity,
  Users,
  ClipboardCheck,
  ShieldCheck,
  BarChart2,
  Bell
} from "lucide-react";

interface SidebarProps {
  className?: string;
  userType?: 'patient' | 'doctor' | 'admin';
}

export default function Sidebar({ className, userType = 'patient' }: SidebarProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const getNavItems = () => {
    switch (userType) {
      case 'doctor':
        return [
          {
            name: "Dashboard",
            href: "/doctor/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Appointments",
            href: "/doctor/appointments",
            icon: Calendar,
          },
          {
            name: "Patients",
            href: "/patients",
            icon: Users,
          },
          {
            name: "Messages",
            href: "/doctor/messages",
            icon: MessageSquare,
          },
          {
            name: "Health Records",
            href: "/doctor/health-records",
            icon: FileText,
          },
          {
            name: "Profile",
            href: "/doctor/profile",
            icon: User,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: Settings,
          },
        ];
      case 'admin':
        return [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "User Management",
            href: "/admin/users",
            icon: Users,
          },
          {
            name: "Doctor Verification",
            href: "/admin/verification",
            icon: ShieldCheck,
          },
          {
            name: "System Logs",
            href: "/admin/logs",
            icon: ClipboardCheck,
          },
          {
            name: "Analytics",
            href: "/admin/analytics",
            icon: BarChart2,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: Settings,
          },
        ];
      default: // patient
        return [
          {
            name: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            name: "Medication Reminder",
            href: "/medication-reminder",
            icon: Bell,
          },
          {
            name: "Appointments",
            href: "/patient/appointments",
            icon: Calendar,
          },
          {
            name: "Messages",
            href: "/patient/messages",
            icon: MessageSquare,
          },
          {
            name: "Health Records",
            href: "/health-records",
            icon: FileText,
          },
          {
            name: "Profile",
            href: "/patient/profile",
            icon: User,
          },
          {
            name: "Settings",
            href: "/settings",
            icon: Settings,
          },
        ];
    }
  };

  const navItems = getNavItems();
  
  const getDashboardPath = () => {
    switch (userType) {
      case 'doctor': return '/doctor/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/dashboard';
    }
  };

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white shadow-md"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link to={getDashboardPath()} className="flex items-center">
              <span className="text-xl font-bold text-health-blue-dark">HealthConnect</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center py-2 px-4 rounded-md transition-colors",
                    isActive
                      ? "bg-health-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-health-blue text-white flex items-center justify-center">
                <span className="font-medium text-sm">
                  {userType === 'doctor' ? 'DR' : userType === 'admin' ? 'AD' : 'JD'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {userType === 'doctor' ? 'Dr. Smith' : userType === 'admin' ? 'Admin' : 'John Doe'}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div
        className={cn(
          "hidden lg:block h-full w-64 bg-white border-r border-gray-200",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link to={getDashboardPath()} className="flex items-center">
              <span className="text-xl font-bold text-health-blue-dark">HealthConnect</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center py-2 px-4 rounded-md transition-colors",
                    isActive
                      ? "bg-health-blue text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-health-blue text-white flex items-center justify-center">
                <span className="font-medium text-sm">
                  {userType === 'doctor' ? 'DR' : userType === 'admin' ? 'AD' : 'JD'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {userType === 'doctor' ? 'Dr. Smith' : userType === 'admin' ? 'Admin' : 'John Doe'}
                </p>
                <p className="text-xs text-gray-500 capitalize">{userType}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
