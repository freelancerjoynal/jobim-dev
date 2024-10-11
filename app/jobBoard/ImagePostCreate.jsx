'use client';

import React, { useState, useRef } from 'react';
import { FaCameraRetro } from "react-icons/fa";

export default function ImagePostCreate({ setLoading, setPosts }) {
  const [isUploading, setUploading] = useState(false);
  const [isSuccess, setSuccess] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];

      // Check if file size exceeds 1 MB
      if (image.size > 512 * 512) {
        alert('The selected file exceeds 500KB. Please choose a smaller image.');
        return; // Exit the function early
      }

      await uploadImage(image);
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    setUploading(true);
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-image`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Get data from the response
        setUploading(false);
        
        // Log the response data to the console
        setLoading(false)
        setPosts(data)
        
        setSuccess('התמונה הועלתה בהצלחה');
      } else {
        setSuccess('Image upload failed');
      }
    } catch (error) {
      // console.error('Error during image upload:', error);
      setSuccess('העלאת התמונה נכשלה');
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mt-3">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        className="hidden" 
        ref={fileInputRef}
      />
      <button 
        onClick={openFileDialog}
        className="border rounded-full py-4 md:py-3  px-4 text-md md:text-2xl transition-colors bg-[#720ADA] text-white flex gap-3 justify-center items-center"
      >
        <span><FaCameraRetro /></span>
        <span>העלה תמונה</span>
      </button>
      
      {isUploading && (
        <progress className="progress w-56 h-5 bg-red-[#E98333] mt-3"></progress>
      )}
      <div>
        <p>{isSuccess}</p>
      </div>
    </div>
  );
}
