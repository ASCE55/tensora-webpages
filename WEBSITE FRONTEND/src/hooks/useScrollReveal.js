import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const revealAllElementsInView = () => {
      const observerOptions = {
        root: null,
        rootMargin: '80px 0px 0px 0px',
        threshold: 0.02
      };

      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersect, observerOptions);
      const elements = document.querySelectorAll(
        '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom'
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in or near the visible viewport, reveal immediately
        if (rect.top <= window.innerHeight + 150) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });

      return observer;
    };

    // Run once on route change after DOM render
    const timer = setTimeout(() => {
      const obs = revealAllElementsInView();
      return () => obs?.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};
