"use client";

import { useSchools } from "@/context/SchoolContext";
import SchoolCard from "./components/SchoolCard";
import { PlusCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { schools, loading } = useSchools();

  // Slice but handle cases later
  const recentSchools = schools.slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Campus Hub 🎓
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover schools, explore their details, and add new institutions to
          our growing community. Whether you are a student, parent, or
          administrator – Campus Hub connects you with the right school.
        </p>
      </section>

      {/* Add School Button */}
      <div className="flex justify-center mb-12">
        <Link
          href="/addSchool"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          <PlusCircle size={22} />
          Add New School
        </Link>
      </div>

      {/* Recent Schools */}
      <section>
        <h2 className="text-2xl font-bold mb-6 w-full text-center">Recent Posts</h2>

        {loading ? (
          // Skeleton Loader for Home Page
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : schools.length === 0 ? (
          // Case: No schools
          <p className="text-gray-600 text-center mt-6">
            🚫 No schools added yet. Be the first to{" "}
            <Link href="/addSchool" className="text-blue-600 underline">
              add one
            </Link>
            !
          </p>
        ) : (
          <>
            {/* Show available schools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentSchools.map((school) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </div>

            {/* Show More Button only if more than 6 */}
            {schools.length > 6 && (
              <div className="flex justify-center mt-8">
                <Link
                  href="/showSchools"
                  className="flex items-center gap-2 text-blue-600 font-semibold text-lg hover:underline hover:text-blue-700 cursor-pointer"
                >
                  Show More <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
