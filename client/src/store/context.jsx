import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profilePhoto, setprofilePhoto] = useState();

  return (
    <UserContext.Provider value={{ profilePhoto, setprofilePhoto }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
