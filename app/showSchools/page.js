"use client";
import SchoolCard from "../components/SchoolCard";
import { useSchools } from "@/context/SchoolContext";
import Link from "next/link";

export default function ShowSchools() {
  const { schools, loading } = useSchools();

  // Skeleton loader UI
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Schools</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Actual school data
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 w-full text-center">Schools</h1>
      {schools.length === 0 ? (
  // Case: No schools
  <p className="text-gray-600 text-center mt-6">
    🚫 No schools added yet. Be the first to{" "}
    <Link href="/addSchool" className="text-blue-600 underline">
      add one
    </Link>
    !
  </p>
) : (
  // Case: Show schools
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-5 sm:mx-0">
    {schools.map((school) => (
      <SchoolCard key={school.id} school={school} />
    ))}
  </div>
)}

    </div>
  );
}
