"use client";
import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import HomePage from "./HomePage";
import LinkPage from "./LinkPage";
import useAuth from "../hooks/useAuth";
import LoginPage from "./LoginPage";

const AdminPage = () => {
  const { isAuthenticated } = useAuth();
  const [refreshPage, setRefreshPage] = useState(0); // this is when i create any new link page will refresh

  const handleUrlShortened = () => {
    setRefreshPage((prev) => prev + 1);
  };

  // return (
  //   <div>
  //     <AdminNavbar />
  //     <HomePage handleUrlShortened={handleUrlShortened} />
  //     {/* sending function as a props */}
  //     {/* Conditionally Render LinkPage if User is Authenticated */}
  //     {isAuthenticated ? (
  //       <div className="w-full">
  //         <LinkPage key={refreshPage} />
  //       </div>
  //     ) : (
  //       <div className="text-center mt-6 text-[#c9ced6] text-sm font-light">
  //         You need to be logged in to access your links.
  //       </div>
  //     )}
  //   </div>
  // );

  // if (!isAuthenticated) {
  //   return (
  //     <>
  //       <div className="min-h-screen flex items-center justify-center p-4">
  //         <div className="w-full max-w-5xl">
  //           {/* Basic Card Skeleton */}
  //           <div className="flex flex-col space-y-4">
  //             <div className="border border-gray-300 rounded-lg p-4 animate-pulse">
  //               <div className="h-48 bg-gray-200 mb-4 rounded"></div>
  //               <div className="space-y-3">
  //                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  //                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  //                 <div className="h-4 bg-gray-200 rounded w-full"></div>
  //               </div>
  //             </div>

  //             {/* List Item Skeleton */}
  //             <div className="flex items-center space-x-4 animate-pulse">
  //               <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
  //               <div className="flex-1 space-y-2">
  //                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
  //                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <AdminNavbar />
          <HomePage handleUrlShortened={handleUrlShortened} />
          {/* sending function as a props */}
          {/* Conditionally Render LinkPage if User is Authenticated */}
          {isAuthenticated ? (
            <div className="w-full">
              <LinkPage key={refreshPage} />
            </div>
          ) : (
            <div className="text-center mt-6 text-[#c9ced6] text-sm font-light">
              You need to be logged in to access your links.
            </div>
          )}
        </div>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </>
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
