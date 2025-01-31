import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center text-center px-4 md:px-10">
      {/* Heading */}
      <h1 className="bg-gradient-to-tr from-[#144ee3] to-[#EB568E] bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Inter'] leading-tight lg:leading-[80px]">
        Shorten Your Loooong Links {":)"}
      </h1>

      {/* Paragraph */}
      <p className="mt-4 sm:mt-6 text-[#c9ced6] text-sm sm:text-lg font-['Inter'] w-full max-w-md md:max-w-2xl leading-normal">
        Linkly is an efficient and easy-to-use URL shortening service that
        streamlines your online experience.
      </p>

      {/* Input Box */}
      <div className="mt-6 sm:mt-10 w-full max-w-sm sm:max-w-lg lg:max-w-2xl h-14 sm:h-[76px] px-5 sm:pl-8 sm:pr-8 py-3 bg-[#181e29] rounded-full shadow-md border-4 border-[#144ee3]/10 flex items-center gap-4">
        <span className="text-[#c9ced6] text-lg sm:text-xl">🔗</span>
        <input
          type="text"
          placeholder="Enter the link here"
          className="bg-transparent text-[#c9ced6] text-base font-light font-['Inter'] leading-7 outline-none w-full placeholder-[#c9ced6]/70"
        />
        <button className="bg-[#144ee3] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium">
          Shorten
        </button>
      </div>
      <div className="text-center mt-6">
        <span className="text-[#c9ced6] text-sm font-light font-['Inter']">
          You can create{" "}
        </span>
        <span className="text-[#eb568e] text-sm font-bold font-['Inter']">
          05
          {/* check this cournt dynamically */}
        </span>
        <span className="text-[#c9ced6] text-sm font-light font-['Inter']">
          {" "}
          more links. Register Now to enjoy Unlimited usage
        </span>
      </div>
    </div>
  );
};

export default HomePage;
