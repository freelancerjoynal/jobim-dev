'use client';
import { fetchData } from "@/app/helpers/fetchData";
import JobCard from "@/app/jobBoard/JobCard";
import Lottie from "react-lottie-player";
import loadingAnimation from "@/app/assets/loader.json";
import React, { useEffect, useState } from "react";
import InfinityScrollJobPost from "@/app/jobBoard/InfinityScrollJobPost";
import SearchBar from "@/app/jobBoard/SearchBar";

export default function Page({ params }) {
  const { searchterm } = params;
  const decodedSearchTerm = decodeURIComponent(searchterm);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchData(`/search-post/${searchterm}`, { cache: "no-store" });
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err); 
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchterm]); 

  console.log(posts); 

  return (
    <>
      <SearchBar/>
      <div className="container mx-auto text-right min-h-screen" >
        <div className="text-center">
          <h1 className="text-2xl font-bold pt-7">מציג תוצאות עבור:</h1>
          <p className="mt-4 text-lg">{decodedSearchTerm}</p>
        </div>

        {loading && (
          <div className="flex justify-center items-center min-h-[80vh]">
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

        {/* Show message if no posts are found */}
        {!loading && !error && posts.data?.length === 0 && (
          <div className="text-center mt-10 text-lg font-medium min-h-[80vh]">
            לא נמצאו פוסטים בחיפוש שלך.
          </div>
        )}

        {/* Show posts if available */}
        {!loading && !error && posts.data?.length > 0 && posts.data.map((post) => (
          <JobCard key={post.id} post={post} />
        ))}

        {/* Show InfinityScrollJobPost only if posts are available */}
        {!loading && !error && posts.data?.length > 0 && (
          <InfinityScrollJobPost posts={posts} />
        )}
      </div>
    </>
  );
}
