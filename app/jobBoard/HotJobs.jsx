"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper/modules"; // Import the EffectCoverflow module
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow"; // Import coverflow styles

import { fetchData } from "../helpers/fetchData";

export default function HotJobs() {
  const [hotJobs, setHotJobs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchData("/get-hot-jobs", { cache: "no-store" });
        setHotJobs(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Swiper
        effect={"coverflow"} // Add the coverflow effect
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, EffectCoverflow]} // Include EffectCoverflow here
        className="mySwiper"
      >
        {hotJobs.map((item) => (
          <SwiperSlide key={item.id} style={{ direction: "rtl" }}>
            <div className="pt-8 pb-12 pr-3 pl-1 text-right">
              <a href={item.externalUrl} target="_blank">
                <h3 className="text-2xl text-[#6D05DC] font-semibold pb-4">
                  {item.title}
                </h3>
                <p className="max-w-full overflow-hidden text-ellipsis break-words text-right">
                  {item.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </a>
              <div className="text-center mt-5">
                <a
                  href={item.externalUrl}
                  target="_blank"
                  className="border rounded-full w-full py-4 md:py-3 px-3 md:px-4 text-md transition-colors bg-[#720ADA] text-white"
                >
                  הגש בקשה עכשיו
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
