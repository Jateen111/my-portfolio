import React, { useEffect, useRef, useState } from 'react';

// --- CSS STYLES ---
// All styles are now included directly here to avoid external file issues.
const GlobalStyles = () => (
  <style>{`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body, html {
      background: #000;
      color: #fff;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    html.lenis,
    html.lenis body {
      height: auto;
    }

    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }

    .cursor-dot {
      position: fixed;
      top: -10px;
      left: -10px;
      width: 10px;
      height: 10px;
      background-color: white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
    }

    /* Work Section Styles */
    .project-item {
      @apply text-5xl font-extrabold text-gray-700 border-b border-gray-800 transition-colors duration-500 cursor-pointer;
    }
    .project-item:hover {
      @apply text-white border-white;
    }
    
    .hover-image-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 300px;
      height: 400px;
      pointer-events: none;
      z-index: 9998;
      overflow: hidden;
      border-radius: 8px;
    }
    .hover-image-container img {
      width: 100%;
      height: 100%;
      object-cover:
    }
    
    /* Footer Styles */
    .footer-section {
      @apply border-t border-gray-800;
    }
    .footer-link {
        @apply text-lg text-gray-400 transition-colors duration-300;
    }
    .footer-link:hover {
        @apply text-white;
    }
  `}</style>
);


// --- CURSOR COMPONENT ---
const Cursor = () => {
    const cursorRef = useRef(null);
    useEffect(() => {
        const setFromEvent = (e) => {
            if (window.gsap) {
                window.gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
            }
        };
        window.addEventListener('mousemove', setFromEvent);
        return () => window.removeEventListener('mousemove', setFromEvent);
    }, []);
    return <div ref={cursorRef} className="cursor-dot"></div>;
};


// --- HERO COMPONENT ---
const Hero = ({ isReady }) => {
  const videoContainerRef = useRef(null);
  const heroSectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    if (!isReady) return;
    const ctx = window.gsap.context(() => {
        window.gsap.from(titleRef.current, { opacity: 0, y: 80, duration: 1.4, ease: 'power3.out' });
        window.gsap.from(subtitleRef.current, { opacity: 0, y: 60, delay: 0.3, duration: 1.2, ease: 'power3.out' });
        const tl = window.gsap.timeline({
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: 'top top',
                end: '+=1500',
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            },
        });
        tl.to(videoContainerRef.current, { scale: 13, duration: 1, ease: 'power2.inOut' }, 0)
          .to([titleRef.current, subtitleRef.current], { opacity: 0, y: -50, duration: 0.3 }, 0);
    });
    return () => ctx.revert();
  }, [isReady]);

  return (
    <section ref={heroSectionRef} className="h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center z-10 pointer-events-none">
        <h1 ref={titleRef} className="text-6xl font-extrabold mb-4 tracking-tight">Hi, I&apos;m Jateen</h1>
        <p ref={subtitleRef} className="text-xl text-gray-300">Crafting digital experiences with design + code</p>
      </div>
      <div ref={videoContainerRef} className="absolute w-[20vw] h-[20vh] rounded-lg overflow-hidden" style={{ maxWidth: '320px', maxHeight: '180px' }}>
        <video
          className="w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/4784266/4784266-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
    </section>
  );
};

// --- WORK SECTION COMPONENT ---
const workData = [
    { title: "LuxeStay Hotel Booking", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" },
    { title: "Quantum Analytics", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80" },
    { title: "FlowState Fitness App", image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=80" },
    { title: "Nova AI Writing Assistant", image: "https://images.unsplash.com/photo-1620712943543-285f7267a868?w=500&q=80" },
    { title: "Terra Gallery Exhibition", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80" },
];

const WorkSection = ({ isReady }) => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        if (!isReady) return;
        const moveImage = (e) => {
            window.gsap.to(imageContainerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.8,
                ease: 'power3.out'
            });
        };
        window.addEventListener('mousemove', moveImage);
        return () => window.removeEventListener('mousemove', moveImage);
    }, [isReady]);
    
    return (
        <section className="bg-black pt-20 pb-10 px-10">
            <div className="max-w-4xl mx-auto">
                {workData.map((project) => (
                    <div 
                        key={project.title}
                        className="project-item py-8"
                        onMouseEnter={() => setHoveredImage(project.image)}
                        onMouseLeave={() => setHoveredImage(null)}
                    >
                        <h2>{project.title}</h2>
                    </div>
                ))}
            </div>
            <div 
                ref={imageContainerRef}
                className="hover-image-container transition-transform duration-500"
                style={{
                    transform: `scale(${hoveredImage ? 1 : 0})`,
                    transformOrigin: 'center'
                }}
            >
                {hoveredImage && (
                    <img 
                        src={hoveredImage} 
                        alt="Project Preview" 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </section>
    );
};

// --- FOOTER COMPONENT ---
const Footer = ({ isReady }) => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const linksRef = useRef(null);

    useEffect(() => {
        if(!isReady) return;
        const ctx = window.gsap.context(() => {
            const tl = window.gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 90%',
                }
            });
            tl.from(headingRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power3.out' })
              .from(linksRef.current.children, { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.8");
        }, sectionRef);
        return () => ctx.revert();
    }, [isReady]);

    return (
        <footer ref={sectionRef} className="footer-section bg-black py-20 text-center">
            <h2 ref={headingRef} className="text-5xl font-bold mb-8">Get in Touch</h2>
            <div ref={linksRef} className="flex justify-center space-x-8">
                <a href="mailto:contact@yourdomain.com" className="footer-link">Email</a>
                <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
                <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            </div>
        </footer>
    );
};


// --- MAIN APP COMPONENT ---
// FIXED: Removed Next.js specific 'Head' component and re-implemented dynamic library loading.
export default function App() {
  const [libsReady, setLibsReady] = useState(false);
  
  useEffect(() => {
    let lenis;
    const initLibs = async () => {
      try {
        // Dynamically import libraries to ensure they only run on the client side
        const gsapModule = await import('https://esm.sh/gsap');
        const scrollTriggerModule = await import('https://esm.sh/gsap/ScrollTrigger');
        const lenisModule = await import('https://esm.sh/@studio-freight/lenis');
        
        window.gsap = gsapModule.default;
        window.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

        lenis = new lenisModule.default();
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        document.documentElement.classList.add('lenis');
        
        setLibsReady(true);
      } catch (error) {
          console.error("Failed to load animation libraries", error);
      }
    };

    // This check ensures we don't try to run this code on the server
    if (typeof window !== 'undefined') {
        initLibs();
    }

    return () => {
      if (lenis) lenis.destroy();
      if(window.gsap) {
        window.gsap.killTweensOf(window);
        const triggers = window.gsap.ScrollTrigger.getAll();
        triggers.forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <Cursor />
      <main>
        {libsReady && (
            <>
                <Hero isReady={libsReady} />
                <WorkSection isReady={libsReady} />
                <Footer isReady={libsReady} />
            </>
        )}
      </main>
    </>
  );
}
