import React, { createContext, useContext, useState } from "react";
const ToggleContext = createContext();
export const useToggle = () => useContext(ToggleContext);
export const ToggleProvider = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  return (
    <ToggleContext.Provider
      value={{
        setIsMobileSidebarOpen,
        isMobileSidebarOpen,
        isCreatePostOpen,
        setIsCreatePostOpen,
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
