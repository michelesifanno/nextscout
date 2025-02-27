import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolla in alto con animazione
  }, [pathname]);

  return null; // Non rende nulla, è solo per l'effetto
};

export default ScrollToTop;
