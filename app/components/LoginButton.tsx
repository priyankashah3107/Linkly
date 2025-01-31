import React from "react";
import Image from "next/image";
import Link from "next/link";
const LoginButton = () => {
  return (
    <>
      <Link
        href={"/auth/login"}
        className="h-8 px-4 py-5 sm:h-[60px] sm:pl-[25px] sm:pr-[25.19px] sm:py-[21px] bg-[#181e29] rounded-[48px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.10)] border border-[#353c4a] justify-center items-center gap-2 inline-flex cursor-pointer"
      >
        <div className="text-center text-white text-sm sm:text-base font-semibold font-['Inter'] leading-[18px]">
          Login
        </div>
        <Image
          src={"/login.svg"}
          alt="login"
          width={21}
          height={19}
          className="text-center cursor-pointer text-[#c9ced6] text-xl font-light font-['Font Awesome 6 Pro'] leading-7"
        />
      </Link>
    </>
  );
};

export default LoginButton;

// "use client";
// import React, { ButtonHTMLAttributes } from "react";
// import { ArrowRight } from "lucide-react";

// type AnimationVariant = "slide" | "pulse" | "scale" | "glow" | "bounce";

// interface AnimatedLoginButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: AnimationVariant;
// }

// const ButtonVariant: React.FC<AnimatedLoginButtonProps> = ({
//   className = "",
//   onClick,
//   disabled,
//   ...props
// }) => (
//   <button
//     className={className}
//     onClick={onClick}
//     disabled={disabled}
//     {...props}
//   >
//     <span className="text-white font-semibold">Login</span>
//     <ArrowRight className="w-5 h-5 text-slate-300" />
//   </button>
// );

// const buttonBaseClasses =
//   "flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 rounded-full border border-slate-600 shadow-lg transition-all duration-300";

// const getVariantButton = (variant: AnimationVariant): React.ReactElement => {
//   const variants: Record<AnimationVariant, React.ReactElement> = {
//     slide: (
//       <ButtonVariant
//         className={`${buttonBaseClasses} hover:bg-slate-700 group`}
//       >
//         <span className="text-white font-semibold">Login</span>
//         <ArrowRight className="w-5 h-5 text-slate-300 transition-transform duration-300 group-hover:translate-x-2" />
//       </ButtonVariant>
//     ),

//     pulse: (
//       <ButtonVariant
//         className={`${buttonBaseClasses} hover:bg-slate-700 animate-none hover:animate-pulse`}
//       />
//     ),

//     scale: (
//       <ButtonVariant
//         className={`${buttonBaseClasses} hover:bg-slate-700 hover:scale-110 active:scale-95`}
//       />
//     ),

//     glow: (
//       <ButtonVariant
//         className={`${buttonBaseClasses} hover:bg-slate-700 relative group`}
//       >
//         <span className="text-white font-semibold relative z-10">Login</span>
//         <ArrowRight className="w-5 h-5 text-slate-300 relative z-10" />
//         <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400 to-purple-500 blur-xl -z-10" />
//       </ButtonVariant>
//     ),

//     bounce: (
//       <ButtonVariant
//         className={`${buttonBaseClasses} hover:bg-slate-700 transform transition-transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0`}
//       >
//         <span className="text-white font-semibold">Login</span>
//         <ArrowRight className="w-5 h-5 text-slate-300 animate-bounce" />
//       </ButtonVariant>
//     ),
//   };

//   return variants[variant];
// };

// const AnimatedLoginButton: React.FC<AnimatedLoginButtonProps> = ({
//   variant = "slide",
//   onClick,
//   disabled = false,
//   className = "",
//   ...props
// }) => {
//   const buttonVariant = getVariantButton(variant);

//   return React.cloneElement(buttonVariant, {
//     onClick,
//     disabled,
//     className: `${buttonVariant.props.className || ""} ${className}`,
//     "aria-disabled": disabled,
//     ...props,
//   });
// };

// interface LoginButtonShowcaseProps {
//   onButtonClick?: () => void;
// }

// const LoginButtonShowcase: React.FC<LoginButtonShowcaseProps> = ({
//   onButtonClick,
// }) => {
//   return (
//     <div className="flex flex-col gap-8 p-8">
//       {(Object.keys(variants) as AnimationVariant[]).map((variant) => (
//         <AnimatedLoginButton
//           key={variant}
//           variant={variant}
//           onClick={onButtonClick}
//         />
//       ))}
//     </div>
//   );
// };

// export type {
//   AnimatedLoginButtonProps,
//   LoginButtonShowcaseProps,
//   AnimationVariant,
// };
// export { AnimatedLoginButton, LoginButtonShowcase };
