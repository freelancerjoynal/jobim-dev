import React, { useState, useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Example social icons
import Image from "next/image";
import Link from "next/link";
import copyIcon from "@/app/assets/copy-icon.png";

export default function JobCard({ post }) {
  const [isHovered, setIsHovered] = useState(false);
  const hideIconsTimeoutRef = useRef(null); // Ref to hold timeout

  const showIcons = () => {
    setIsHovered(true);
    if (hideIconsTimeoutRef.current) {
      clearTimeout(hideIconsTimeoutRef.current); // Clear any existing timeout
    }
  };

  const hideIconsWithDelay = () => {
    hideIconsTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 5000); // Hide after 5 seconds
  };

  const clearHideTimeout = () => {
    if (hideIconsTimeoutRef.current) {
      clearTimeout(hideIconsTimeoutRef.current); // Prevent hiding when hovering over icons
    }
  };

  return (
    <>
      {post.imagepost ? (
        <div className="bg-white py-8 px-6 mt-6 rounded-xl">
          <div className="flex justify-end">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.imagepost}`}
              alt="Job Image"
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              className="rounded-xl"
            />
          </div>
        </div>
      ) : (
        <div className="bg-white py-8 px-6 mt-6 rounded-xl">
          <h3 className="text-2xl text-[#6D05DC] font-semibold">
            {post.externalLink === null || post.externalLink === "" ? (
              <Link href={`/job/${post.id}`} passHref>
                <a>{post.publisher}</a> {/* <a> inside <Link> ensures proper rendering */}
              </Link>
            ) : (
              <a href={post.externalLink} target="_blank" rel="noopener noreferrer">
                {post.publisher}
              </a>
            )}
          </h3>

          <div className="py-5 pl-5">
            <hr />
          </div>
          <h2 className="text-2xl lg:text-[34px] font-bold">{post.profession}</h2>

          {post.area && (
            <div className="flex gap-2 py-3 items-center justify-end">
              <p className="text-[#667085] text-base">{post.area}</p>
              <FaLocationDot />
            </div>
          )}

          {post.location && (
            <div className="flex gap-2 pb-3 items-center justify-end">
              <p className="text-[#667085] text-base">{post.location}</p>
              <FaLocationDot />
            </div>
          )}

          <div className="text-[#574F4A] pt-2">
            <p
              className="max-w-full overflow-hidden text-ellipsis break-words text-right"
              style={{ direction: "rtl" }}
            >
              <Link href={`/job/${post.id}`}>
                {post.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </Link>
              ...
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-end gap-4 py-9 relative">
            {/* Share button and reactions wrapper */}
            <div
              className="relative group"
              onMouseEnter={showIcons}
              onMouseLeave={hideIconsWithDelay}
            >
              {/* Share button */}
              <CiShare2 className="text-black text-4xl cursor-pointer" />

              {/* Reactions - shown on hover */}
              {isHovered && (
                <div
                  className="absolute flex gap-3 top-[-3rem] right-0 bg-white p-2 rounded-xl shadow-lg transition-all duration-300"
                  onMouseEnter={clearHideTimeout} // Clear hide timeout when hovering over the icons
                  onMouseLeave={hideIconsWithDelay} // Set timeout again when leaving the icons
                >
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <FaFacebook className="text-blue-600 w-6 h-6" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <FaTwitter className="text-blue-400 w-6 h-6" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      window.location.href
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <FaLinkedin className="text-blue-700 w-6 h-6" />
                  </a>
                </div>
              )}
            </div>

            {post.wa && (
              <a
                href={`https://wa.me/${post.wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] flex items-center gap-3 text-[19px]"
              >
                <IoLogoWhatsapp className="w-7 h-7" />
                <p>What’s App</p>
              </a>
            )}

            {post.email && (
              <a
                href={`mailto:${post.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6D05DC] flex items-center gap-3 text-[19px]"
              >
                <MdEmail />
                <p className="text-[#667085]">{post.email}</p>
                <Image src={copyIcon} width={28} height={28} alt="copy-icon" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
