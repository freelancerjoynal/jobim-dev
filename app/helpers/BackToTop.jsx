'use client'

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";


const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down at least 500px
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll the page back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="back-to-top p-3 rounded-full bg-gradient-to-r from-[#720ADA] to-[#EF892B] text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          style={{ fontSize: '24px' }}
          aria-label="Scroll back to top"
        >
          <FaArrowUp />

        </button>
      )}
    </div>
  );
};

export default BackToTop;
