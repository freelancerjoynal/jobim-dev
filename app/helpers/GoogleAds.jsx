import React from "react";
import Script from "next/script";

export default function GoogleAds() {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8986453606609093"
        crossOrigin="anonymous"
        strategy="afterInteractive"  />
    </>
  );
}
