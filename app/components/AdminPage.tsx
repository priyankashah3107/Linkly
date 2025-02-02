"use client";
import React from "react";
import AdminNavbar from "./AdminNavbar";
import HomePage from "./HomePage";
import LinkPage from "./LinkPage";
import useAuth from "../hooks/useAuth";

const AdminPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <AdminNavbar />
      <HomePage />

      {/* Conditionally Render LinkPage if User is Authenticated */}
      {isAuthenticated ? (
        <div className="w-full">
          <LinkPage />
        </div>
      ) : (
        <div className="text-center mt-6 text-[#c9ced6] text-sm font-light">
          You need to be logged in to access your links.
        </div>
      )}
    </div>
  );
};

export default AdminPage;

// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import useAuth from "../hooks/useAuth";
// import AdminNavbar from "./AdminNavbar";
// import HomePage from "./HomePage";
// import LinkPage from "./LinkPage";

// const AdminPage = () => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/auth/login");
//     }
//   }, [isAuthenticated, router]);

//   if (!isAuthenticated) {
//     return null; // Or a loading spinner
//   }

//   return (
//     <div>
//       <AdminNavbar />
//       <HomePage />
//       <div className="w-full">
//         <LinkPage />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
