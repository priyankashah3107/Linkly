import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth"; // Assuming you have useAuth hook for authentication

const AdminNavbar = () => {
  const { isAuthenticated, user } = useAuth(); // Use the useAuth hook to get authentication state and user info
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic (clearing cookies, JWT, etc.)
    router.push("/auth/login");
  };

  return (
    <nav className="flex justify-between items-center p-4  text-white">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Image
          src={"/linkly.svg"}
          alt="Logo"
          width={120}
          height={47}
          className="w-[120px] h-[47px] cursor-pointer"
        />
      </div>

      {/* Center: User Info */}
      {isAuthenticated && user ? (
        <div className="text-white flex items-center gap-4">
          <span>Welcome, {user?.email}</span>{" "}
          {/* Displaying user's email from user object */}
        </div>
      ) : null}

      {/* Right Side: Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin/analytics")}
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          Analytics
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Mobile version: Navbar toggle for menu */}
      <div className="lg:hidden">
        {/* Add a hamburger menu if needed */}
        <button className="text-white">☰</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
