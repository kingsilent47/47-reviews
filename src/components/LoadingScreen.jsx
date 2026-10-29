import { useState, useEffect } from 'react';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-paper z-[9999] flex flex-col items-center justify-center">
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-ink mb-8 tracking-tight">
        47 Reviews
      </h1>
      
      <div className="w-64 h-px bg-gray-300 mb-4">
        <div 
          className="h-full bg-ink transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-sm text-muted uppercase tracking-widest">
        Loading
      </p>
    </div>
  );
}

export default LoadingScreen;
