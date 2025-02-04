"use client";
import axios from "axios";
import React, { useEffect } from "react";

export default async function page() {
  const fetchAnalytics = async (linkId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/link/analytics?id=${linkId}`
      );
      console.log("Response data is", response.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);
  return <div>page</div>;
}
