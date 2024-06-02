import React from "react";
import { getInfoUserApi } from "../services/userService";

const UserContext = React.createContext({
  id: "",
  fullname: "",
  avata: "",
  auth: false,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    id: "",
    fullname: "",
    avata: "",
    auth: false,
  });

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      LoadingInfo();
    }
  }, [localStorage.getItem("token")]);

  const loginContext = async (token) => {
    localStorage.setItem("token", token);
    LoadingInfo();
  };

  const LoadingInfo = async () => {
    try {
      const res = await getInfoUserApi();
      if (res && res.status === 200) {
        const info = res.data.data[0];
        setUser({
          id: info.id,
          fullname: info.fullname,
          avata: info.avata,
          auth: true,
        });
      }
    } catch (error) {
      setUser({
        id: "",
        fullname: "",
        avata: "",
        auth: false,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser((user) => ({
      fullname: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
