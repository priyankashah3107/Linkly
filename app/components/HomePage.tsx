"use client";

import React, { useEffect, useState } from "react";
import LinkPage from "./LinkPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { Loader } from "lucide-react";

interface ShortenFormProps {
  handleUrlShortened: () => void;
}

const HomePage = ({ handleUrlShortened }: ShortenFormProps) => {
  // const [url, setUrl] = useState("");
  const [longUrl, setlongUrl] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated } = useAuth();

  // // Check if the user is authenticated
  // const authUser = async () => {
  //   try {
  //     await axios.get("http://localhost:3000/api/me"); // This will check the user's auth status
  //     setIsAuthenticated(true); // If the user is authenticated, set state to true
  //   } catch (error) {
  //     setIsAuthenticated(false); // If the user is not authenticated, set state to false
  //     // toast.error("You need to be logged in to shorten links.");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    console.log(longUrl);
    setLoading(true);
    if (!isAuthenticated) {
      toast.error("You need to log in to shorten links!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/link/short",
        { longUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Response is", response.data);
      // console.log("Reponse short url", response?.data?.newLink?.shortUrl);
      // console.log("Reponse QrCode url", response?.data?.newLink?.qrCode);
      // console.log("Reponse Long url", response?.data?.newLink?.longUrl);

      setlongUrl("");
      handleUrlShortened(); // calling this function for refresh the page
    } catch (error) {
      console.log("Error shorting the url", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer className="" />
      <div className="">
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
          <form
            onSubmit={handleSubmit}
            className="mt-6 sm:mt-10 w-full max-w-sm sm:max-w-lg lg:max-w-2xl h-14 sm:h-[76px] px-5 sm:pl-8 sm:pr-8 py-3 bg-[#181e29] rounded-full shadow-md border-4 border-[#144ee3]/10 flex items-center gap-4"
          >
            <span className="text-[#c9ced6] text-lg sm:text-xl">🔗</span>

            <input
              type="url"
              required
              value={longUrl}
              onChange={(e) => setlongUrl(e.target.value)}
              placeholder="Enter the link here"
              className="bg-transparent text-[#c9ced6] text-base font-light font-['Inter'] leading-7 outline-none w-full placeholder-[#c9ced6]/70"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#144ee3] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium"
            >
              {/* Shorten */}
              {loading ? (
                <Loader className="w-8 h-8 animate-spin " />
              ) : (
                "Shorten"
              )}
            </button>
          </form>
          {/* <div className="text-center mt-6">
            <span className="text-[#c9ced6] text-sm font-light font-['Inter']">
              You can create{" "}
            </span>
            <span className="text-[#eb568e] text-sm font-bold font-['Inter']">
              05
             
            </span>
            <span className="text-[#c9ced6] text-sm font-light font-['Inter']">
              {" "}
              more links. Register Now to enjoy Unlimited usage
            </span>
          </div>  */}

          {/* Message if the user is not authenticated */}
          {!isAuthenticated && (
            <div className="text-center mt-6 ">
              <span className="text-[#c9ced6] text-sm font-light font-['Inter']">
                You need to be logged in to shorten links.
              </span>
            </div>
          )}
        </div>
        {/* <div className="w-full ">
          <LinkPage />
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
