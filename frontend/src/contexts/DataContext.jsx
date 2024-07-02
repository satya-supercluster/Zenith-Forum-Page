import React, { createContext, useContext, useState } from "react";
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {
  const [newPostSection, setNewPostSection] = useState(false);
  const [select, setSelect] = useState(1);
  const [refetch, setRefetch] = useState(false);
  return (
    <DataContext.Provider value={{ newPostSection, setNewPostSection, refetch, setRefetch,select,setSelect }}>
      {children}
    </DataContext.Provider>
  );
};
