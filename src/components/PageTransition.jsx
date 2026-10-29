import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PageTransition({ children }) {
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Instantly hide content when route changes
    setShow(false);
    
    // Wait a tiny fraction of a second, then fade it back in
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className={`transition-opacity duration-300 ease-in-out ${show ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default PageTransition;
