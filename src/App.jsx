import React, { useEffect, useRef, useState } from "react";
import { animate, stagger } from "@motionone/dom";
import "./App.css";

function App() {
  const images = [
    "/assets/main-1.jpg",
    "/assets/main-2.jpg",
    "/assets/main-3.jpg",
    "/assets/main-4.jpg",
    "/assets/main-5.jpg",
    "/assets/main-6.jpg",
    "/assets/main-7.jpg",
    "/assets/main-8.jpg",
    "/assets/main-9.jpg",
    "/assets/main-10.jpg",
    "/assets/main-11.jpg",
  ];

  const imageRefs = useRef([]);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    // Initial animations
    animate(".header", { opacity: [0, 1], y: [-20, 0] }, { duration: 1 });
    animate(".footer", { opacity: [0, 1], y: [20, 0] }, { duration: 1 });
    animate(".image-gallery img", { opacity: [0, 1], y: [20, 0] }, { duration: 1, delay: stagger(0.1) });
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isOverlayVisible) return; // Prevent mouse move actions when overlay is visible

      const { clientX } = event;
      const screenWidth = window.innerWidth;
      const mouseX = (clientX / screenWidth) * 100;
      const index = Math.floor((mouseX / 100) * images.length);

      imageRefs.current.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });
    };

    const handleTouchMove = (event) => {
      if (isOverlayVisible) return; // Prevent touch move actions when overlay is visible

      const touch = event.touches[0];
      const { clientX } = touch;
      const screenWidth = window.innerWidth;
      const touchX = (clientX / screenWidth) * 100;
      const index = Math.floor((touchX / 100) * images.length);

      imageRefs.current.forEach((img, i) => {
        img.style.display = i === index ? "block" : "none";
      });
    };

    if (!isOverlayVisible) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOverlayVisible]);

  useEffect(() => {
    if (isOverlayVisible) {
      animate(".overlay-content", { opacity: [0, 1] }, { duration: 1 });
      animate(".close-button", { opacity: [0, 1] }, { duration: 1 });
    }
  }, [isOverlayVisible]);

  const handleInfoClick = () => {
    setIsOverlayVisible(true);
  };

  const handleCloseClick = () => {
    // Perform fade-out animation
    const animation = animate(".overlay", { opacity: [1, 0] }, { duration: 0.5 });
    
    // Set overlay visibility to false after animation completes
    animation.finished.then(() => {
      setIsOverlayVisible(false);
    });
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="mb-header">
          <h1>Carols Furnished Rentals</h1>
          </div>
        </div>
        <div className="full-screen-text">
          <h2>Interior Design Studio</h2>
        </div>
        <div className="image-gallery">
          {images.map((path, index) => (
            <img
              key={index}
              src={path}
              alt={`Gallery Image ${index + 1}`}
              ref={(el) => (imageRefs.current[index] = el)}
              style={{
                display: index === 0 ? "block" : "none",
                position: "absolute",
              }}
            />
          ))}
        </div>
        <div className="footer">
          <div className="footer-content">
            <div>
              <a href="mailto:info@carolsfurnishedrentals.com">EMAIL, &nbsp;</a>
            </div>
            <div>
              <p onClick={handleInfoClick} style={{ cursor: "pointer" }}>
                INFO
              </p>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <div className="overlay">
          <button className="close-button" onClick={handleCloseClick}>
            CLOSE
          </button>
          <div className="overlay-content">
            <p>
              At Carols Furnished Rentals, we transform spaces into extraordinary experiences.
              As a leading design studio, we specialize in bespoke furnishings that reflect your unique style
              and enhance daily living. Our expert team collaborates closely with clients to create tailored
              solutions for apartments, offices, and vacation rentals.
              <br /> <br />
              With a focus on detail and quality, we use the finest materials and innovative designs to bring
              your vision to life. Experience the art of furnishing with Carols Furnished Rentals and create
              a space that truly feels like home.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
