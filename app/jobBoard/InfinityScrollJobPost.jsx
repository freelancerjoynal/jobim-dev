"use client";

import React, { useEffect, useRef, useState } from "react";
import JobCard from "./JobCard";
import Lottie from "react-lottie-player";
import loadingAnimation from "@/app/assets/loader.json";

export default function InfinityScrollJobPost({ posts }) {
  const [fetchNextPosts, setFetchNextPosts] = useState([]);
  const [next_page_url, setNext_page_url] = useState(posts.next_page_url);
  const [pageCount, setPageCount] = useState(1);

  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && next_page_url) {
          const fetchNextPosts = async () => {
            try {
              const response = await fetch(next_page_url, {
                method: "GET",
                cache: "no-store",
              });
              const json = await response.json();
              return json;
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };

          const showNextPosts = async () => {
            const nextP = await fetchNextPosts();
            setFetchNextPosts((prevPosts) => [...prevPosts, ...nextP.data]);
            setNext_page_url(nextP.next_page_url);
            setPageCount((prevCount) => prevCount + 1);
          };

          showNextPosts();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [pageCount, next_page_url]);

  return (
    <div className="space-y-4">
      {fetchNextPosts.map((post) => (
        <JobCard key={post.id} post={post} />
      ))}
      <div ref={targetRef} className="flex justify-center items-center mt-4">
        {next_page_url ? (
          <Lottie
            loop
            animationData={loadingAnimation}
            play
            style={{ width: 100, height: 100 }}
          />
        )
         : (
          <p className="text-center text-red-600 mt-4 pb-3">

            {/* אין משרות זמינות */}
            
            </p>
        )}
      </div>
    </div>
  );
}
