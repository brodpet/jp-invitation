'use client';

import { useEffect } from 'react';

// Progressive enhancement: content is fully visible without this. When JS runs
// and the user has not asked for reduced motion, sections fade up on scroll.
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.body.classList.add('has-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.body.classList.remove('has-reveal');
    };
  }, []);
  return null;
}
