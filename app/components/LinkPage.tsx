"use client";
import axios from "axios";
import { BarChart2, Check, Copy, Download, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

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
  const [analyticsData, setAnalyticsData] = useState<Record<string, string>>(
    {}
  );
  const router = useRouter();

  console.log("URLS", urls);

  const fetchUrl = async () => {
    try {
      const response = await axios.get(
        "/api/link/short/getauth"
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

  const handleDownloadQrCode = (qrCodeUrl?: string) => {
    if (!qrCodeUrl) {
      toast.error("No QR Code available to download");
      return;
    }

    try {
      // Create an anchor element
      const link = document.createElement("a");

      // Ensure qrCodeUrl is correctly assigned
      link.href = qrCodeUrl;
      link.download = "qrcode.png"; // Set filename

      // Append to body, trigger download, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR Code.");
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    linkId: string
  ) => {
    event.preventDefault(); // Prevent the default link behavior
    const analyticsData = await fetchAnalytics(linkId);
    if (analyticsData) {
      // Redirect to the desired URL after fetching the data
      router.push(`/admin/analytics/${linkId}`);
      // Replace with your desired redirect URL
    }
  };

  const fetchAnalytics = async (linkId: string) => {
    try {
      const response = await axios.get(
        `/api/link/analytics?id=${linkId}`
      );
      console.log("akjfhakdfhjadkfjhadkf", response.data);
      setAnalyticsData((prev) => ({ ...prev, [linkId]: response.data }));
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      return null;
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      const response = await axios.delete(
        `/api/link/short/deletelink/${id}`
      );
      // toast.success("Link deleted successfully");

      //       we need setUrl?
      // My frontend holds a local state (urls) that contains the list of links.
      // When a link is deleted from the backend, the frontend doesn't automatically know that the link is gone.
      // setUrl((prevUrls) => prevUrls.filter((url) => url.id !== id)) manually updates the UI by removing the deleted link without requiring another API call.
      // .filter() creates a new array that contains only the items that meet the given condition.

      if (response.status === 200) {
        setUrl((prevUrl) => prevUrl.filter((url) => url.id !== id));
        toast.success("Link deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting the short Url", error);
    }
  };
  useEffect(() => {
    fetchUrl();
  }, []);

  return (
 
  <div className="flex justify-center px-4 sm:px-6 lg:px-8"> 
      <div className="w-full max-w-7xl mt-10">
        <div className="overflow-x-auto rounded-lg shadow-md"> 
          <table className="w-full text-white bg-[#181e29] min-w-[600px]"> 
            <thead>
              <tr className="bg-[#222936] text-left text-gray-300 font-semibold">
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Short Link</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Long Link</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">QR Code</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Clicks</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Date</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Delete</th>
                <th className="px-3 sm:px-6 py-3 whitespace-nowrap">Analytics</th>
              </tr>
            </thead>

            <tbody>
              {urls?.map((val) => (
                <tr
                  key={val.id}
                  className="border-b border-gray-700 bg-[#222936] hover:bg-[#060708]"
                >
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        target="_blank"
                        href={val.shortUrl}
                        className="text-blue-400 hover:underline truncate max-w-[120px] sm:max-w-[200px]"
                      >
                        {val?.shortUrl}
                      </Link>
                      <button 
                        onClick={() => handleCopyUrl(val?.shortUrl)}
                        className="flex-shrink-0"
                      >
                        {copied && copyUrl == val.shortUrl ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <Link
                      target="_blank"
                      href={val?.longUrl}
                      className="text-gray-400 hover:underline truncate block max-w-[120px] sm:max-w-[200px]"
                    >
                      {val?.longUrl}
                    </Link>
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        href={val.qrCode || "https://github.com/priyankashah3107"}
                        target="_blank"
                        className="flex-shrink-0"
                      >
                        <Image
                          src={val.qrCode || "https://github.com/priyankashah3107"}
                          alt="QR Code"
                          className="w-6 h-6 sm:w-8 sm:h-8 object-cover"
                          width={10}
                          height={10}
                        />
                      </Link>
                      <Download
                        className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                        onClick={() => handleDownloadQrCode(val.qrCode)}
                      />
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-center">
                    {val?.visits ?? 0}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-center whitespace-nowrap">
                    {new Date(val?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-center">
                    <button onClick={() => handleDeleteLink(val.id)}>
                      <Trash className="text-red-300 hover:text-red-600 w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </td>
                  <td className="px-3 sm:px-6 py-4 text-center">
                    <Link
                      href={`/admin/analytics/${val.id}`}
                      onClick={(event) => handleClick(event, val.id)}
                      target="_blank"
                      title={analyticsData[val.id] ? `Visits: ${analyticsData[val.id]}` : "Loading analytics..."}
                    >
                      <BarChart2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
