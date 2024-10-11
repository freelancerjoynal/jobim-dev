'use client'

import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-5HR65VVVEK');
  }, []);

  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-5HR65VVVEK"
        strategy="afterInteractive"
      />
    </>
    
  );
}
