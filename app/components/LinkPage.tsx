"use client";
import axios from "axios";
import { Check, Copy, Download, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const linkData = [
  {
    id: 1,
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    longurl: "https://www.twitter.com/tweets/8erelCoihu/",
    clicks: "1313",
    date: "Oct - 10 - 2023",
  },
  {
    id: 2,
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    longurl: "https://www.twitter.com/tweets/8erelCoihu/",
    clicks: "1313",
    date: "Oct - 10 - 2023",
  },
  {
    id: 3,
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    longurl: "https://www.twitter.com/tweets/8erelCoihu/",
    clicks: "1313",
    date: "Oct - 10 - 2023",
  },
  {
    id: 4,
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    longurl: "https://www.twitter.com/tweets/8erelCoihu/",
    clicks: "1313",
    date: "Oct - 10 - 2023",
  },
  {
    id: 5,
    shortLink: "https://linkly.com/Bn41aCOlnxj",
    longurl: "https://www.twitter.com/tweets/8erelCoihu/",
    clicks: "1313",
    date: "Oct - 10 - 2023",
  },
];

interface ShortUrl {
  id: string;
  shortUrl: string;
  longUrl: string;
  qrCode?: string;
  clicks?: number;
  createdAt: string;
  visits: number;
}

// only authenticated user access the list of url
// make a feturl custom hook
// or use tanstack
const LinkPage = () => {
  const [urls, setUrl] = useState<ShortUrl[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyurl] = useState<string>("");
  console.log("URLS", urls);

  const fetchUrl = async (code?: string) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/link/short/getauth"
      );
      // console.log("FetchUrl Data", response.data);
      // const pri = response.data.shorturls;
      setUrl(response.data.shorturls);
      // setUrl(pri);
    } catch (error) {
      console.error("Error while Fetching Urls", error);
    }
  };

  const handleCopyUrl = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setCopyurl(shortUrl);
      setTimeout(() => {
        setCopied(false);
        setCopyurl("");
      }, 3000);
    });
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-screen max-w-7xl mt-10 overflow-x-auto">
        <table className="w-full text-white bg-[#181e29] shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#222936] text-left text-gray-300 font-semibold">
              <th className="px-6 py-3">Short Link</th>
              <th className="px-6 py-3 hidden lg:table-cell">Long Link</th>
              <th className="px-6 py-3">QR Code</th>
              <th className="px-6 py-3 hidden lg:table-cell">Clicks</th>
              <th className="px-6 py-3 hidden lg:table-cell">Date</th>
            </tr>
          </thead>

          <tbody>
            {urls?.map((val) => (
              <tr
                key={val.id}
                className="border-b border-gray-700 bg-[#222936] hover:bg-[#060708]"
              >
                <td className="px-6 py-4 flex flex-row gap-3">
                  <Link
                    target="_blank"
                    // href={`/${val.shortUrl}`}
                    href={val.shortUrl}
                    className="text-blue-400 hover:underline flex items-center gap-2 truncate"
                  >
                    {val?.shortUrl}
                  </Link>
                  <button onClick={() => handleCopyUrl(val?.shortUrl)}>
                    {/* <Copy className="w-4 h-4" /> */}
                    {copied && copyUrl == val.shortUrl ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 truncate max-w-xs hidden lg:table-cell">
                  <Link
                    target="_blank"
                    href={val?.longUrl}
                    className="text-gray-400 hover:underline truncate"
                  >
                    {val?.longUrl}
                  </Link>
                </td>
                <td className="px-6 py-4 items-center flex flex-row gap-8 text-gray-400">
                  <Link href={`/image/${val.id}`} target="_blank">
                    <Image
                      // src={val.qrCode}
                      src={`/api/qrcode/${val.id}`}
                      alt="QR Code"
                      className="w-8 h-8 object-cover "
                      width={10}
                      height={10}
                    />
                  </Link>

                  <Download className="cursor-pointer" />
                </td>
                <td className="px-6 py-4 text-center hidden lg:table-cell">
                  {/* {val?.clicks ?? 0} */}
                  {val?.visits ?? 0}
                </td>
                <td className="px-6 py-4 text-center hidden lg:table-cell">
                  {new Date(val?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkPage;
