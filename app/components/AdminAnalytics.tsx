import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loader } from "lucide-react";

interface AnalyticsData {
  id: number;
  linkId: string;
  country: string;
  city: string;
  device: string;
  browser: string; // Added browser field
  timestamp: string;
}

const COLORS = ["#4f46e5", "#60a5fa", "#34d399", "#f59e0b", "#ef4444"];

const AdminAnalytics: React.FC<{ linkId: string }> = ({ linkId }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAnalytics = async (linkId: string) => {
      try {
        const response = await axios.get<AnalyticsData[]>(
          `/api/link/analytics?id=${linkId}`, {
            withCredentials: true
          }
        );
        // console.log("Response data is", response.data);
        setAnalytics(response.data);
        setLoading(false);
      } catch (error: unknown) { 
        console.error("Error fetching analytics:", error);

        if (axios.isAxiosError(error)) { 
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            if (axiosError.response.status === 401 || axiosError.response.status === 403) {
              setError("You are not authorized to view this analytics.");
            } else {
              setError("Failed to load analytics.");
            }
          } else if (axiosError.request) {
            setError("No response received from the server."); 
          } else {
            setError("An error occurred while setting up the request."); 
          }
        } else {
          setError("An unexpected error occurred."); 
        }
        setLoading(false);
      }
    };

    if (linkId) {
      fetchAnalytics(linkId);
    }
  }, [linkId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg font-medium text-white">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

 if (error) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-lg font-medium text-white">
        {error} 
      </div>
    </div>
  );
}

  // Prepare data for the daily visits chart
  const dailyVisits = analytics.reduce(
    (acc: { name: string; visits: number }[], curr) => {
      const date = new Date(curr.timestamp).toLocaleDateString();
      const existing = acc.find((item) => item.name === date);
      if (existing) {
        existing.visits += 1;
      } else {
        acc.push({ name: date, visits: 1 });
      }
      return acc;
    },
    []
  );

  // Prepare device distribution data
  const deviceData = Object.entries(
    analytics.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.device] = (acc[curr.device] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Prepare browser distribution data
  const browserData = Object.entries(
    analytics.reduce((acc: { [key: string]: number }, curr) => {
      const browser = curr.browser || "Unknown";
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // Prepare country distribution data
  const countryData = Object.entries(
    analytics.reduce((acc: { [key: string]: number }, curr) => {
      const country = curr.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-6 space-y-6 bg-[#09132a] text-white">
      <h2 className="text-3xl font-bold">Link Analytics</h2>

      {/* Stats Overview */}
      <div className="grid gap-4 bg-[#09132a] md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Total Visits</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">{analytics.length}</p>
        </div>

        <div className="p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Unique Devices</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(analytics.map((a) => a.device)).size}
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Unique Browsers</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h18v18H3z" />
              <path d="M9 3v18" />
              <path d="M15 3v18" />
              <path d="M3 9h18" />
              <path d="M3 15h18" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(analytics.map((a) => a.browser || "Unknown")).size}
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Unique Countries</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <p className="text-2xl font-bold mt-2">
            {new Set(analytics.map((a) => a.country || "Unknown")).size}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Daily Visits Chart */}
        <div className="p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Daily Visits</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyVisits}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visits" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Browser Distribution */}
        <div className="p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Browser Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={browserData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {browserData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Device Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {deviceData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Country Distribution */}
        <div className="p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Country Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {countryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium mb-4">Recent Visitors</h3>
        <div className="space-y-4">
          {analytics.slice(0, 5).map((visit) => (
            <div
              key={visit.id}
              className="border-b border-gray-100 pb-4 last:border-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Device: {visit.device}</p>
                  <p className="text-sm mt-1">
                    Browser: {visit.browser || "Unknown"}
                  </p>
                  <p className="text-sm mt-1">
                    Location: {visit.country || "Unknown"},{" "}
                    {visit.city || "Unknown"}
                  </p>
                </div>
                <p className="text-sm">
                  {new Date(visit.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
