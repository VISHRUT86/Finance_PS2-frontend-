import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.location.reload();
    window.scrollTo(0, 0); // ✅ Page top par scroll hoga jab bhi route change hoga
  }, [pathname]);

  return null;
};

export default ScrollToTop;
