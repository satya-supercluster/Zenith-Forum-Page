import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
  const [newPostSection, setNewPostSection] = useState(false);
  return (
    <DataContext.Provider value={{ newPostSection, setNewPostSection }}>
      {children}
    </DataContext.Provider>
  );
};
