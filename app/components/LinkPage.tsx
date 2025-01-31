"use client";
import { QrCode } from "lucide-react";
import Link from "next/link";
import React from "react";

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

const LinkPage = () => {
  return (
    <div className="flex flex-col gap-2 w-full mt-10">
      {/* Header Row */}
      <div className="flex flex-row w-full h-[63px] px-[25px] py-[21px] bg-[#181e29] rounded-tl-[10px] rounded-tr-[10px] shadow-md backdrop-blur-[28px] justify-between items-center text-white font-semibold">
        <div className="flex flex-row gap-8 w-2/5">
          <div>Short Link</div>
          <div>Long Link</div>
        </div>
        <div className="flex flex-row gap-8 w-2/5">
          <div>QR Code</div>
          <div>Clicks</div>
        </div>
        <div className="w-1/5">Date</div>
      </div>

      {/* Data Rows */}
      {linkData.map((val) => (
        <div
          key={val.id}
          className="flex flex-row w-full h-[63px] px-[25px] py-[21px] bg-[#222936] border-b border-gray-700 justify-between items-center text-white"
        >
          <div className="flex flex-row gap-8 w-2/5">
            <Link
              href={val.shortLink}
              className="text-blue-400 hover:underline"
            >
              {val.shortLink}
            </Link>
            <a
              href={val.longurl}
              className="text-gray-400 truncate w-40 hover:underline"
            >
              {val.longurl}
            </a>
          </div>

          <div className="flex flex-row gap-8 w-2/5">
            <QrCode className="text-gray-400" />
            <div>{val.clicks}</div>
          </div>
          <div className="w-1/5">{val.date}</div>
        </div>
      ))}
    </div>
  );
};

export default LinkPage;
