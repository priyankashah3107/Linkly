// import React from "react";

// const SignupButton = ({ buttonName }) => {
//   return (
//     <button className="w-[178px] h-[60px] pl-[25px] pr-[25.05px] py-[21px] bg-[#144ee3] rounded-[48px] shadow-[10px_9px_22px_0px_rgba(20,78,227,0.38)] border border-[#144ee3] justify-center items-center inline-flex">
//       <div className="text-center text-white text-base font-semibold font-['Inter'] leading-[18px]">
//         {buttonName}
//       </div>
//     </button>
//   );
// };

// export default SignupButton;

"use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  onClick?: () => void;
}

const SignupButton = ({
  children,
  className = "",
  size = "medium",
}: // onClick,
ButtonProps) => {
  const getSizeClasses = (size: ButtonSize): string => {
    switch (size) {
      case "small":
        return "w-32 h-10 px-4 py-2 text-sm";
      case "large":
        return "w-52 h-16 px-8 py-4 text-lg";
      default: // medium
        return "w-44 h-14 px-6 py-3 text-base";
    }
  };

  // const onClick = () => {
  //   const router = useRouter();
  //   router.push("/api/signup");
  // };

  const baseClasses =
    "bg-[#144ee3] text-white rounded-[48px] shadow-[10px_9px_22px_0px_rgba(20,78,227,0.38)] border border-[#144ee3] justify-center items-center inline-flex cursor-pointer";

  const buttonClasses = `${baseClasses} ${getSizeClasses(size)} ${className}`;

  return (
    <Link className={buttonClasses} href={"/auth/signup"}>
      {children}
    </Link>
  );
};

export default SignupButton;
