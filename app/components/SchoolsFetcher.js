"use client"; 

import { useEffect } from "react";
import { useSchools } from "@/context/SchoolContext";

export default function SchoolsFetcher({ children }) {
  const { setSchools,setLoading} = useSchools();

  useEffect(() => {
    async function fetchSchools() {
      try {
        setLoading(true);
        const res = await fetch("/api/showSchools");
        const data = await res.json();
        if (res.ok) {
          setSchools(data.schools || []);
            setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch schools:", err.message);
      }
    }
    fetchSchools();
  }, [setSchools]);

  return children;
}
