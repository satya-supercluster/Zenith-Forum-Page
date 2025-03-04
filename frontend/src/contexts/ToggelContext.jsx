import React, { createContext, useContext, useState } from "react";
const ToggleContext = createContext();
export const useToggle = () => useContext(ToggleContext);
export const ToggleProvider = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  return (
    <ToggleContext.Provider
      value={{ setIsMobileSidebarOpen, isMobileSidebarOpen }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
