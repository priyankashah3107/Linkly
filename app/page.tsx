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
import LoginButton from "./components/LoginButton";
import SignupButton from "./components/SignupButton";
import Image from "next/image";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <>
      {/* <Image
        src={"/linkly.svg"}
        alt="log"
        width={120}
        height={47}
        className="md:w-[120px] md:h-[47px] cursor-pointer"
      />
      <LoginButton />
      <SignupButton
        size="large"
        className="my-custom-class"
        // onClick={handleSignup}
      >
        Get Started
      </SignupButton> */}
      <Navbar />
    </>
  );
};

export default page;
