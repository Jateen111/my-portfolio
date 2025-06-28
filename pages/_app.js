// File: pages/_app.js
import '../styles/globals.css';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <Component {...pageProps} />;
}