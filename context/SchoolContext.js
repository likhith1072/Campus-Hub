"use client";
import { createContext, useContext, useState } from "react";

const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <SchoolContext.Provider value={{ schools, setSchools, loading, setLoading }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchools() {
  return useContext(SchoolContext);
}
