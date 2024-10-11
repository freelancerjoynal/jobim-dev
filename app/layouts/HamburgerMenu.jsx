'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // React Icons for menu icon
import { usePathname } from 'next/navigation'; // Use this instead of useRouter

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        className="text-3xl p-2 focus:outline-none z-50"
        onClick={toggleMenu}
      >
        {isOpen ? <FiX className="text-black" /> : <FiMenu className="text-black" />}
      </button>

      {/* Right Sided Fixed Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex flex-col justify-center items-end h-full pr-3 relative">
          {/* Close Button inside the menu */}
          <button
            className="absolute top-4 right-4 text-3xl text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <FiX />
          </button>

          <ul className="space-y-8 mt-12 text-right">
            {/* Menu Items */}
            <li >
              <Link href="/" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              עמוד הבית
              </Link>
            </li>
            <li >
              <Link href="/resume-tips" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/resume-tips' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              טיפים לכתיבת קורות חיים
              </Link>
            </li>
            <li >
              <Link href="/job-interview-tips" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/job-interview-tips' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              טיפים לראיון עבודה
              </Link>
            </li>
            <li >
              <Link href="/salary-tables" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/salary-tables' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              טבלאות שכר
              </Link>
            </li>
            <li >
              <Link href="/tax-calculator" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/tax-calculator' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              מחשבון מס (בקרוב) 
              </Link>
            </li>
            <li >
              <Link href="/accessibility-statement" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/accessibility-statement' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
              הצהרת נגישות
              </Link>
            </li>
            <li >
              <Link href="/privacy-policy" onClick={closeMenu} className={`block ml-3 text-xl hover:text-gray-600 ${pathname === '/privacy-policy' ? 'text-white hover:bg-purple-900 bg-purple-700 p-2 rounded' : 'text-black'}`}>
                מדיניות הפרטיות
              </Link>
            </li>
            {/* Add more items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
