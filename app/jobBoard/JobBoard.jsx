"use client";
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import ActionsBtn from "./ActionsBtn";
import InfinityScrollJobPost from "./InfinityScrollJobPost";
import loadingAnimation from "@/app/assets/loader.json";
import { fetchData } from "../helpers/fetchData";
import Lottie from "react-lottie-player";
import SearchBar from "./SearchBar";
import HeroPic from "@/app/assets/heroPic.png";
import Image from "next/image";
import HotJobs from "./HotJobs";

const JobBoard = () => {
  const [posts, setPosts] = useState([]);
  

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchData("/posts", { cache: "no-store" });
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    Hellow 
      <SearchBar />
      <div className="container mx-auto mt-14">
        <Image src={HeroPic} className="mx-auto" alt="Jobim Intro Image" />
      </div>
      <div className="container">
        <ActionsBtn
          posts={posts}
          setPosts={setPosts}
          setLoading={setLoading}
          setSuccessMsg={setSuccessMsg}
        />

        {successMsg && (
          <h3 className="text-green-500 font-semibold text-center">
            Your job post was created successfully
          </h3>
        )}

        <h1 className="text-3xl md:text-5xl font-bold pb-2 md:pb-3 mt-10">
          ג&apos;ובים חמים
        </h1>
        
        <HotJobs /> 
       

        <div className="latest-jobs">
          <h1 className="text-3xl md:text-5xl font-bold pb-2 md:pb-0 mt-10">
            משרות אחרונות
          </h1>

          {/* Show loading or error message below the h1 */}
          {loading && (
            <div className="flex justify-center items-center min-h-100">
              <Lottie
                loop
                animationData={loadingAnimation}
                play
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 pb-4">Error: {error.message}</div>
          )}

          {/* Show posts only if loading is done and there's no error */}
          {!loading &&
            !error &&
            posts.data.map((post) => <JobCard key={post.id} post={post} />)}

          {/* Show InfinityScrollJobPost only if loading is done and there's no error */}
          {!loading && !error && <InfinityScrollJobPost posts={posts} />}
        </div>
      </div>
    </>
  );
};

export default JobBoard;
