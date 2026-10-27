import { useEffect, useRef } from 'react';

function Comments() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', 'kingsilent47/47-reviews');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // Append to container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="mt-24 pt-12 border-t border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-8">Discussion</h2>
      <div className="bg-gray-50 p-8 border border-gray-200">
        <div ref={containerRef} className="utterances-container" />
      </div>
    </section>
  );
}

export default Comments;
