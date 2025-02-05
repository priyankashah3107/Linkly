// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const authUser = async () => {
//     try {
//       await axios.get("http://localhost:3000/api/me");
//       setIsAuthenticated(true);
//     } catch (error) {
//       setIsAuthenticated(false);
//     }
//   };

//   useEffect(() => {
//     authUser();
//   }, []);

//   return { isAuthenticated };
// };

// export default useAuth;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to store user data

  const authUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/me");
      if (response.data && response.data.user) {
        setUser(response.data.user); // Set user data
        setIsAuthenticated(true); // Mark as authenticated
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null); // Clear user data if not authenticated
    }
  };

  useEffect(() => {
    authUser();
  }, []); // Empty dependency array to call on mount

  return { isAuthenticated, user }; // Return both user and authentication status
};

export default useAuth;
