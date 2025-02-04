import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { BarChart2, LogOut, User, ChevronDown } from "lucide-react";

interface AuthUser {
  email?: string;
  id?: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
}
const AdminNavbar: React.FC<AuthUser> = () => {
  const { isAuthenticated, user } = useAuth() as AuthContextType;
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    router.push("/auth/login");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4  text-white relative">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Image
          src="/linkly.svg"
          alt="Logo"
          width={120}
          height={47}
          className="w-[120px] h-[47px] cursor-pointer"
        />
      </div>

      {/* Right Side: Profile and Actions */}
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center gap-2 hover:bg-gray-800 p-2 rounded-md transition"
            >
              <User className="w-5 h-5" />
              <span>{user?.email}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white text-black shadow-lg rounded-md z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      router.push("/admin/analytics");
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    <BarChart2 className="mr-2 w-5 h-5" />
                    Email Analytics
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                  >
                    <LogOut className="mr-2 w-5 h-5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default AdminNavbar;
