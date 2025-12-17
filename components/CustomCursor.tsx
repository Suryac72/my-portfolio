import React, { useEffect, useState, useRef } from "react";

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Only show custom cursor on desktop
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) return;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.onclick !== null ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable);
    };

    const hideCursor = () => setIsHidden(true);
    const showCursor = () => setIsHidden(false);

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("mouseenter", showCursor);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("mouseenter", showCursor);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Don't render until mounted on client
  if (!isMounted || isHidden) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorDot}
        className="custom-cursor-dot hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
        }}
      />

      {/* Cursor Outline */}
      <div
        ref={cursorOutline}
        className="custom-cursor-outline hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />

      <style jsx>{`
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #facc15, #eab308);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease;
          mix-blend-mode: difference;
        }

        .custom-cursor-outline {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 2px solid rgba(250, 204, 21, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.2s ease;
        }

        @media (max-width: 768px) {
          .custom-cursor-dot,
          .custom-cursor-outline {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};