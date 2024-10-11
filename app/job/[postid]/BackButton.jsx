'use client';

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const handleBack = () => {
    // Use the browser's default back functionality
    window.history.back();
  };

  return (
    <button
      className="flex items-center gap-2 text-white bg-[#6D05DC] px-4 py-2 rounded-full"
      onClick={handleBack}
    >
      <FaArrowLeft />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
