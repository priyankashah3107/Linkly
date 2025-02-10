// import React from "react";
// import { AnimatedLoginButton } from "./components/LoginButton";

// const Page = () => {
//   const handleLogin = () => {
//     console.log("Login clicked");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
//       <AnimatedLoginButton variant="slide" />
//       <AnimatedLoginButton variant="glow" />
//       <AnimatedLoginButton variant="bounce" />
//       <AnimatedLoginButton variant="scale" />
//       <AnimatedLoginButton variant="pulse" />
//     </div>
//   );
// };

// export default Page;
"use client"; // If using Next.js App Router

import React from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import HomePage from "./components/HomePage";
import useAuth from "./hooks/useAuth";
import AdminPage from "./components/AdminPage";
import Footer from "./components/Footer";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

const Page: React.FC<ShortenFormProps> = ({ handleUrlShortened }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <AdminPage />
      ) : (
        <div className="relative w-full h-screen">
          {/* Background Images */}
          <Image
            src={"/Swirl.svg"}
            alt="img"
            width={100}
            height={100}
            className="w-full h-full absolute"
            // layout="fill"
          />
          <Image
            src="/Cubes.svg"
            alt="Background cubes"
            // layout="fill"
            objectFit="cover"
            width={100}
            height={100}
            className="w-full h-full "
          />

          {/* Navbar */}
          <div className="absolute top-0 left-0 w-full z-50">
            <Navbar />
          </div>

          {/* HomePage Centered */}
          <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-60">
            <HomePage handleUrlShortened={handleUrlShortened} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Page;
