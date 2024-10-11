import Script from 'next/script'
import React from 'react'

export default function PopCash() {
  return (
    <>
      <Script
        id="popcash-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var uid = '481506';
            var wid = '726895';
            (function() {
              var pop_tag = document.createElement('script');
              pop_tag.src = '//cdn.popcash.net/show.js';
              document.body.appendChild(pop_tag);
              
              pop_tag.onerror = function() {
                var fallbackTag = document.createElement('script');
                fallbackTag.src = '//cdn2.popcash.net/show.js';
                document.body.appendChild(fallbackTag);
              };
            })();
          `,
        }}
      />
    </>
  )
}
