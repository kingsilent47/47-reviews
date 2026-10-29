import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Films from './pages/Films';
import Music from './pages/Music';
import Games from './pages/Games';
import ReviewArchive from './pages/ReviewArchive';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReviewDetail from './pages/ReviewDetail';
import PageTransition from './components/PageTransition';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 1 second on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="films" element={<Films />} />
          <Route path="music" element={<Music />} />
          <Route path="games" element={<Games />} />
          <Route path="archive" element={<ReviewArchive />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path=":category/:id" element={<ReviewDetail />} />
        </Route>
      </Routes>
    </PageTransition>
  );
}

export default App;
