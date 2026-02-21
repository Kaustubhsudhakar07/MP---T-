import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  // 🔹 ADDED: services state
  const [services, setServices] = useState([]);

  // store token in localStorage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // check login status
  let isLoggedIn = !!token;

  // logout user
  const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

  // 🔐 JWT AUTHENTICATION – get logged-in user
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.msg || data.userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // 🔹 ADDED: fetch services
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/data/service", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.log(error);
    }
  };

  // run once + whenever token changes
  useEffect(() => {
    userAuthentication();
    getServices(); // 🔹 ADDED
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services, // 🔹 ADDED
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
