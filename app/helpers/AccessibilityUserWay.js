'use client'
import React, { useEffect } from 'react';

export default function AccessibilityUserWay() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.userway.org/widget.js';
    script.setAttribute('data-account', '40iIaW1aZq');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script if the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return null; // No need to return any JSX as the script does everything.
}
