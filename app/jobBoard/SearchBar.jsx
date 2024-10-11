"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import { useRouter } from "next/navigation"; // For navigation in Next.js 13+

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const encodedSearchTerm = encodeURIComponent(searchTerm); // Encode search term
      router.push(`/search/${encodedSearchTerm}`); // Navigate to the search page with the encoded term
    }
  };

  return (
    <>
      <div className="relative bg-gradient-to-r from-[#720ADA] to-[#EF892B] pt-10">
        <div className="flex justify-center items-center w-full">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white border border-gray-300 rounded-full shadow-md w-full max-w-80 md:max-w-[550px] -mb-5 z-10"
          >
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-[#720ADA] to-[#EF892B] p-4 rounded-full"
            >
              <FaSearch />
            </button>

            <input
              type="text"
              placeholder="חפש כאן..."
              className="ml-2 w-full outline-none max-w-64 md:max-w-lg text-gray-600 text-right pr-5 mr-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ direction: "rtl" }}
            />
          </form>
        </div>

        <div className="curved-bottom">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      {/* <div className="container mx-auto mt-14">
        <Image src={HeroPic} className="mx-auto" alt="Jobim Intro Image" />
      </div> */}
    </>
  );
}
