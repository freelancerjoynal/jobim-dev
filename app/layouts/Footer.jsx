import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 pb-16">
      <div className="container mx-auto text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          {/* <div className="bg-white p-4 rounded-full shadow-md">
            <FaFacebookF className="text-purple-600 text-2xl" />
          </div> */}
          <div className="bg-white p-4 rounded-full shadow-md">
            <a href="https://www.linkedin.com/company/jobimonline/" target='_blank'>
            <FaLinkedinIn className="text-purple-600 text-2xl" />
            </a>
          </div>
          {/* <div className="bg-white p-4 rounded-full shadow-md">
            <FaTwitter className="text-purple-600 text-2xl" />
          </div>
          <div className="bg-white p-4 rounded-full shadow-md">
            <FaInstagram className="text-purple-600 text-2xl" />
          </div> */}
        </div>
        
        
      </div>
    </footer>
  );
};

export default Footer;
