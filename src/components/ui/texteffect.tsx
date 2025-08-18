import React, { useState, useEffect, useRef } from "react";

const DigitalSerenity = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState({
    left: "0px",
    top: "0px",
    opacity: 0,
  });
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [scrolled, setScrolled] = useState(false);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const animateWords = () => {
      document
        .querySelectorAll<HTMLElement>(".word-animate")
        .forEach((word) => {
          const delay = parseInt(word.getAttribute("data-delay") || "0");
          setTimeout(() => {
            word.style.animation = "word-appear 0.8s ease-out forwards";
          }, delay);
        });
    };
    const timeoutId = setTimeout(animateWords, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  //Szavak hover glow effektje
  useEffect(() => {
    const handleMouseEnter = (e: Event) => {
      (e.target as HTMLElement).style.textShadow =
        "0 0 20px rgba(203, 213, 225, 0.5)";
    };
    const handleMouseLeave = (e: Event) => {
      (e.target as HTMLElement).style.textShadow = "none";
    };
    const wordElements =
      document.querySelectorAll<HTMLElement>(".word-animate");
    wordElements.forEach((word) => {
      word.addEventListener("mouseenter", handleMouseEnter);
      word.addEventListener("mouseleave", handleMouseLeave);
    });
    return () => {
      wordElements.forEach((word) => {
        word.removeEventListener("mouseenter", handleMouseEnter);
        word.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".floating-element-animate"
    );
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
            el.style.opacity = "";
          }, parseFloat(el.style.animationDelay || "0") * 1000 + index * 100);
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const pageStyles = `
  #mouse-gradient-react {
    position: fixed;
    pointer-events: none;
    border-radius: 9999px;
    background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
    transform: translate(-50%, -50%);
    will-change: left, top, opacity;
    transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
  }
  @keyframes word-appear {
    0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); }
    50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(1.1); }
  }
  .word-animate {
    display: inline-block;
    opacity: 0;
    margin: 0 0.1em;
    transition: color 0.3s ease, transform 0.3s ease;
  }
  .word-animate:hover {
    color: #cbd5e1;
    transform: translateY(-2px);
  }
  .text-decoration-animate {
    position: relative;
  }
  .text-decoration-animate::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
    animation: underline-grow 2s ease-out forwards;
    animation-delay: 3s;
  }
  .text-decoration-animate-top {
    position: relative;
      z-index: 10;
  }
  .text-decoration-animate-top::after {
    content: '';
    position: absolute;
    top: -8px;          
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0.5px;       
    background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
    animation: underline-grow 2s ease-out forwards;
    animation-delay: 5s; 
      z-index: 10;
  }
  @keyframes underline-grow {
    to { width: 100%; }
  }
`;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="text-slate-100 font-primary overflow-hidden relative bg-transparent">
        <div className="relative z-10 w-full pb-10">
          <div className="flex justify-center w-full">
            <h1 className="text-4xl font-extralight tracking-tight text-slate-50 text-decoration-animate leading-tight text-center">
              <span className="word-animate" data-delay="0">
                Fitboard:
              </span>{" "}
              <span className="word-animate" data-delay="1000">
                Your
              </span>{" "}
              <span className="word-animate" data-delay="1500">
                virtual
              </span>{" "}
              <span className="word-animate" data-delay="2000">
                gym
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalSerenity;
