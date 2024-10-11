'use client';
import React, { useState, useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function SearchPost({ setLoading, professions, areas, setPosts }) {
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (hasInteracted) {
      const handleFilterChange = async () => {
        setLoading(true); // Set loading state
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/filter-post`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profession_id: selectedProfession || null,
              area_id: selectedArea || null,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setPosts(data); // Update posts with filtered data
            setLoading(false); // Set loading to false once data is fetched
          } else {
            console.error('Error fetching filtered posts');
            setLoading(false);
          }
        } catch (error) {
          console.error('API error:', error);
          setLoading(false);
        }
      };

      handleFilterChange();
    }
  }, [selectedProfession, selectedArea, hasInteracted, setLoading, setPosts]); // Add setLoading and setPosts to dependencies

  return (
    <div className='px-9 py-7 rounded-lg bg-[#F0E1FF]'>
      <form>
        {/* Profession Selection */}
        <div className="py-2 relative">
          <label htmlFor="job-profession" className='font-semibold text-xl block text-[#344054] py-2'>
            באיזה מקצוע אתה מחפש עבודה
          </label>
          <div className="relative">
            <select
              id='job-profession'
              className='block appearance-none border border-[#D0D5DD] w-full py-2 sm:py-4  pr-10 rounded-lg text-[#667085] text-right text-xl sm:text-2xl'
              value={selectedProfession}
              onChange={(e) => {
                setSelectedProfession(e.target.value);
                setHasInteracted(true);
              }}
            >
              <option value="">בחר</option>
              {professions.map((item) => (
                <option key={item.profession_id} value={item.profession_id}>
                  {item.profession_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
              <FaAngleDown />
            </div>
          </div>
        </div>

        {/* Area Selection */}
        <div className="py-2 relative">
          <label htmlFor="job-location" className='font-semibold text-xl block text-[#344054] py-2'>
            באיזה אזור אתה מחפש
          </label>
          <div className="relative">
            <select
              id='job-location'
              className='block appearance-none border border-[#D0D5DD] w-full py-2 sm:py-4  pr-10 rounded-lg text-[#667085] text-right text-xl sm:text-2xl'
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                setHasInteracted(true);
              }}
            >
              <option value="">בחר</option>
              {areas.map((item) => (
                <option key={item.area_id} value={item.area_id}>
                  {item.area_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
              <FaAngleDown />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
