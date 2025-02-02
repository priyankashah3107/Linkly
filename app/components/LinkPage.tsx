"use client";
import { Copy, Download, QrCode } from "lucide-react";
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
          {linkData.map((val) => (
            <tr
              key={val.id}
              className="border-b border-gray-700 bg-[#222936] hover:bg-[#060708]"
            >
              <td className="px-6 py-4">
                <Link
                  target="_blank"
                  href={val.shortLink}
                  className="text-blue-400 hover:underline flex items-center gap-2 truncate"
                >
                  {val.shortLink}
                  <Copy className="w-4 h-4" />
                </Link>
              </td>
              <td className="px-6 py-4 truncate max-w-xs hidden lg:table-cell">
                <Link
                  target="_blank"
                  href={val.longurl}
                  className="text-gray-400 hover:underline truncate"
                >
                  {val.longurl}
                </Link>
              </td>
              <td className="px-6 py-4 items-center flex flex-row gap-8 text-gray-400">
                <QrCode className="cursor-pointer " />
                <Download className="cursor-pointer " />
              </td>
              <td className="px-6 py-4 text-center hidden lg:table-cell">
                {val.clicks}
              </td>
              <td className="px-6 py-4 text-center hidden lg:table-cell">
                {val.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkPage;

// "use client";
// import { Copy, Download, QrCode } from "lucide-react";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// interface LinkData {
//   id: number;
//   shortLink: string;
//   longurl: string;
//   clicks: string;
//   date: string;
// }

// const LinkPage: React.FC = () => {
//   const [linkData, setLinkData] = useState<LinkData[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Replace with actual authentication check
//   const pageSize: number = 5;

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetch(`/api/links?page=${currentPage}&limit=${pageSize}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setLinkData(data.links);
//           setTotalPages(data.totalPages);
//         });
//     } else {
//       setLinkData([
//         {
//           id: 1,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 10 - 2023",
//         },
//         {
//           id: 2,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 10 - 2023",
//         },
//         {
//           id: 3,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 10 - 2023",
//         },
//         {
//           id: 4,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 10 - 2023",
//         },
//         {
//           id: 5,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 31 - 2023",
//         },
//         {
//           id: 6,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 31 - 2023",
//         },
//         {
//           id: 7,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 31 - 2023",
//         },
//         {
//           id: 8,
//           shortLink: "https://linkly.com/Bn41aCOlnxj",
//           longurl: "https://www.twitter.com/tweets/8erelCoihu/",
//           clicks: "1313",
//           date: "Oct - 31- 2023",
//         },
//       ]);
//     }
//   }, [isAuthenticated, currentPage]);

//   return (
//     <div className="w-screen max-w-7xl mt-10 overflow-x-auto">
//       <table className="w-full text-white bg-[#181e29] shadow-md rounded-lg overflow-hidden">
//         <thead>
//           <tr className="bg-[#222936] text-left text-gray-300 font-semibold">
//             <th className="px-6 py-3">Short Link</th>
//             <th className="px-6 py-3">Long Link</th>
//             <th className="px-6 py-3">QR Code</th>
//             <th className="px-6 py-3">Clicks</th>
//             <th className="px-6 py-3">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {linkData.map((val) => (
//             <tr
//               key={val.id}
//               className="border-b border-gray-700 bg-[#222936] hover:bg-[#060708]"
//             >
//               <td className="px-6 py-4">
//                 <Link
//                   href={val.shortLink}
//                   className="text-blue-400 hover:underline flex items-center gap-2 truncate"
//                 >
//                   {val.shortLink}
//                   <Copy className="w-4 h-4" />
//                 </Link>
//               </td>
//               <td className="px-6 py-4 truncate max-w-xs">
//                 <Link
//                   href={val.longurl}
//                   className="text-gray-400 hover:underline truncate"
//                 >
//                   {val.longurl}
//                 </Link>
//               </td>
//               <td className="px-6 py-4 items-center flex flex-row gap-8 text-gray-400">
//                 <QrCode className="cursor-pointer " />
//                 <Download className="cursor-pointer " />
//               </td>
//               <td className="px-6 py-4 text-center">{val.clicks}</td>
//               <td className="px-6 py-4 text-center">{val.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {isAuthenticated && (
//         <div className="flex justify-center mt-4 gap-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-700 rounded-md text-white disabled:opacity-50"
//           >
//             Previous
//           </button>
//           <span className="text-white">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-700 rounded-md text-white disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LinkPage;
