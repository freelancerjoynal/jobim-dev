import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { FaEnvelope } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

import { fetchData } from "@/app/helpers/fetchData";

export default async function JobPage({ params }) {
  // Extract postid from params
  const { postid } = params;

  // Fetch post details based on postid
  const response = await fetchData(`/post-details/${postid}`, { cache: "no-store" });

  // Handle the case where the job post is not found
  if (!response.success) {
    return (
      <div className="container mx-auto mt-24 min-h-screen">
        <div className="bg-white py-12 px-9 rounded-md text-center">
          <h2 className="text-red-500 text-3xl font-semibold">פוסט דרושים לא נמצא</h2>
          <p className="text-gray-600 mt-4">
          מצטערים, פוסט המשרה שאתה מחפש אינו קיים או אולי הוסר.
          </p>
        </div>
      </div>
    );
  }

  // Extract post details if found
  const { publisher, profession, location, area, description, email, wa } = response.data;

  return (
    <div className="container mx-auto min-h-screen">
      <div className="bg-white py-12 px-9 rounded-md mt-24">
        <h2 className="text-[#6D05DC] text-center text-3xl font-semibold">
          {publisher}
        </h2>

        {/* Conditionally render the area */}
        {area && (
          <div className="flex justify-center items-center gap-2 text-xl text-[#667085] mt-4">
            <h6>{area}</h6>
            <FaLocationDot size={"15"} />
          </div>
        )}

        {/* Conditionally render the location */}
        {location && (
          <div className="flex justify-center items-center gap-2 text-xl text-[#667085] pb-5">
            <h6>{location}</h6>
            <FaLocationDot size={"15"} />
          </div>
        )}

        <hr />
        <div className="descriptions text-right mt-6">
          <h1 className="text-[#110B08] md:text-4xl font-bold">
            {profession}
          </h1>
          <p className="text-[#574F4A] pt-6" style={{ direction: "rtl" }}>
          {description.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>

        <div className="mt-10">
          <a href={`mailto:${email}`} target="_blank">
            <div className="flex items-center justify-center gap-2">
              <GoCopy className="bg-[#6D05DC] text-white h-10 w-10 rounded-full p-3" />
              <span>{email}</span>
              <FaEnvelope className="bg-[#6D05DC] text-white h-10 w-10 rounded-full p-3" />
            </div>
          </a>
          <div className="flex justify-center mt-7">
            <a href={`https://wa.me/${wa}`} target="_blank" className="inline-block bg-[#F0FCF4] border border-[#25D3661F] px-4 py-3 rounded-full">
              <span className="flex items-center justify-center gap-3 font-semibold text-lg">
                <FaArrowTrendUp color="#25D366" className="text-3xl" />
                <span>WhatsApp</span>
                <IoLogoWhatsapp color="#25D366" className="text-3xl" />
              </span>
            </a>
          </div>

          {/* <BackButton/> */}
        </div>
      </div>
    </div>
  );
}
