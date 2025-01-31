import React, { useState } from "react";
import Image from "next/image";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
const Navbar = () => {
  return (
    <>
      {/* desktop version */}
      <nav className="hidden  lg:flex flex-row justify-between  md:px-20 md:py-5">
        <div>
          <Image
            src={"/linkly.svg"}
            alt="log"
            width={120}
            height={47}
            className="lg:w-[120px] lg:h-[47px] cursor-pointer"
          />
        </div>
        <div className="flex flex-row gap-3">
          <LoginButton />
          <SignupButton
            size="large"
            className="my-custom-class"
            // onClick={handleSignup}
          >
            Get Started
          </SignupButton>
        </div>
      </nav>

      {/* mobile */}

      <nav className=" flex lg:hidden flex-row p-4  justify-between">
        <Image
          src={"/linkly.svg"}
          alt="log"
          width={120}
          height={47}
          className="w-[80px] h-[47px] cursor-pointer"
        />
        <LoginButton />
      </nav>
    </>
  );
};

export default Navbar;
