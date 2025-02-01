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

import React from "react";

import Navbar from "./components/Navbar";
import Image from "next/image";
import HomePage from "./components/HomePage";

const page = () => {
  return (
    <>
      <div className="relative w-full h-screen ">
        <Image
          src={"/Swirl.svg"}
          alt="img"
          width={100}
          height={100}
          className="w-full h-full absolute"
        />
        <Image
          src={"/Cubes.svg"}
          alt="cubes"
          width={100}
          height={100}
          className="w-full h-full "
        />
        <div className="absolute top-0 left-0 w-full z-[60]">
          <Navbar />
        </div>
      </div>
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full z-40">
        <HomePage />
      </div>
    </>
  );
};

export default page;
