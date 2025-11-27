'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader = () => {
  useEffect(() => {
    // Ensure this only runs in the browser after full load
    const onLoad = () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', duration: 1 },
      });

      tl.to('.preloader-top', { yPercent: -100 })
        .to('.preloader-bottom', { yPercent: 100 }, '<')
        .to('#preloader', {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.5,
        })
        .from('#main-content', { opacity: 0, y: 50, duration: 1 }, '-=0.5');
    };

    // Attach after window load to ensure DOM + images are ready
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
    }

    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div
      id="preloader"
      className="fixed inset-0 z-50 flex flex-col pointer-events-auto"
    >
      <div className="preloader-top bg-black flex-1" />
      <div className="preloader-bottom bg-black flex-1" />
    </div>
  );
};

export default Preloader;
