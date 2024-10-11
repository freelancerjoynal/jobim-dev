"use client";
import React, { useState, useEffect, useRef } from "react";
import CreatePost from "./CreatePost";
import SearchPost from "./SearchPost";
import ImagePostCreate from "./ImagePostCreate";

export default function ActionsBtn({ posts, setPosts, setLoading, setSuccessMsg }) {
  const [activeComponent, setActiveComponent] = useState(null);

  // State for height and opacity
  const [createHeight, setCreateHeight] = useState("0px");
  const [createOpacity, setCreateOpacity] = useState(0);
  const [searchHeight, setSearchHeight] = useState("0px");
  const [searchOpacity, setSearchOpacity] = useState(0);

  const createRef = useRef(null);
  const searchRef = useRef(null);

  const handleButtonClick = (component) => {
    if (activeComponent === component) {
      // Close if the same button is clicked
      setActiveComponent(null);
      setCreateHeight("0px");
      setCreateOpacity(0);
      setSearchHeight("0px");
      setSearchOpacity(0);
    } else {
      setActiveComponent(component);
      if (component === "create") {
        setCreateHeight(`${createRef.current.scrollHeight + 120}px`);
        setCreateOpacity(1);
        setSearchHeight("0px");
        setSearchOpacity(0);
      } else if (component === "search") {
        setSearchHeight(`${searchRef.current.scrollHeight}px`);
        setSearchOpacity(1);
        setCreateHeight("0px");
        setCreateOpacity(0);
      }
    }
  };

  useEffect(() => {
    // Reset heights and opacities on mount and when activeComponent changes
    if (activeComponent === "create") {
      setCreateHeight(`${createRef.current.scrollHeight + 120}px`);
      setCreateOpacity(1);
      setSearchHeight("0px");
      setSearchOpacity(0);
    } else if (activeComponent === "search") {
      setSearchHeight(`${searchRef.current.scrollHeight}px`);
      setSearchOpacity(1);
      setCreateHeight("0px");
      setCreateOpacity(0);
    } else {
      setCreateHeight("0px");
      setCreateOpacity(0);
      setSearchHeight("0px");
      setSearchOpacity(0);
    }
  }, [activeComponent]);

  //===================
  // Get taxonomy data
  //=====================
  const [professions, setProfessions] = useState([]);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-professions`);
        const data = await response.json();
        setProfessions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-areas`);
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between gap-1 md:gap-7 pt-12">
        <button
          className={`border rounded-full w-full py-4 md:py-3 px-0 md:px-4 text-md md:text-[30px] transition-colors ${
            activeComponent === "create"
              ? "bg-white text-[#720ADA] border-[#720ADA]"
              : "bg-[#720ADA] text-white"
          }`}
          onClick={() => handleButtonClick("create")}
        >
          פרסם משרה חדשה
        </button>
        <button
          className={`border rounded-full w-full py-4 md:py-3 px-0 md:px-4 text-md md:text-[30px] transition-colors ${
            activeComponent === "search"
              ? "bg-white text-[#720ADA] border-[#720ADA]"
              : "bg-[#720ADA] text-white"
          }`}
          onClick={() => handleButtonClick("search")}
        >
          חיפוש משרה
        </button>
      </div>
      <div>
        <ImagePostCreate setPosts={setPosts} setLoading={setLoading} />
      </div>

      <div className="mt-5">
        <div
          ref={createRef}
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{ maxHeight: createHeight, opacity: createOpacity }}
        >
          <CreatePost setCreateHeight={setCreateHeight} posts={posts} setPosts={setPosts} professions={professions} areas={areas} setSuccessMsg={setSuccessMsg} />
        </div>
        <div
          ref={searchRef}
          className="transition-all duration-300 ease-in-out overflow-hidden"
          style={{ maxHeight: searchHeight, opacity: searchOpacity }}
        >
          <SearchPost setLoading={setLoading} setPosts={setPosts} professions={professions} areas={areas} />
        </div>
      </div>
    </>
  );
}
