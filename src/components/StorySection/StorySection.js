"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { imageLinks } from "../../constants/featureImages";
import styles from "./StorySection.module.css";

function StorySection() {
  // Use the appropriate image set (big for desktop, small for mobile)
  const [activeImages, setActiveImages] = useState(imageLinks.big);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setActiveImages(imageLinks.small);
      } else {
        setIsMobile(false);
        setActiveImages(imageLinks.big);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel images array
  const images = activeImages;

  // Current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide width in pixels (desktop vs. mobile)
  const slidePx = isMobile ? 400 : 800;
  const gap = 24; // fixed gap in px

  // Reference to carousel container
  const carouselRef = useRef(null);
  // Track the calculated slide width
  const [slideWidth, setSlideWidth] = useState(0);

  // Measure the container width on mount and on window resize
  useEffect(() => {
    function updateSlideWidth() {
      if (carouselRef.current) {
        setSlideWidth(carouselRef.current.offsetWidth);
      }
    }
    updateSlideWidth();
    window.addEventListener("resize", updateSlideWidth);
    return () => window.removeEventListener("resize", updateSlideWidth);
  }, []);

  // Compute the offset for the currentIndex

  // Calculate offset consistently (remove the special-case for index 7)
  // If px-4 is ~16px, do:
  const computedOffset = 2150 - currentIndex * (slidePx + gap);

  // Arrow handlers
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Drag handler for mobile: update index if dragged more than half a slide
  const handleDragEnd = (event, info) => {
    if (!carouselRef.current) return;
    if (info.offset.x < -slidePx / 2) {
      setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
    } else if (info.offset.x > slidePx / 2) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Dot pagination logic (mobile only)
  const windowSize = 7;
  const totalDots = images.length;
  let startDot = 0;
  if (totalDots > windowSize) {
    startDot = currentIndex - Math.floor(windowSize / 2);
    if (startDot < 0) startDot = 0;
    if (startDot > totalDots - windowSize) startDot = totalDots - windowSize;
  }
  const visibleDots = images.slice(startDot, startDot + windowSize);
  const activeDotInWindow = currentIndex - startDot;

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: isMobile
          ? "url('/images/backgrounds/featureSectionPhone.svg')"
          : "url('/images/backgrounds/featureSection.svg')",
      }}
    >
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <div className={styles.headingText}>
          For you, Make the <br />
          <span className={styles.myFuseBlue}>Algorithm Work</span>
        </div>

        {/* Carousel Container with added padding (px-4) */}
        <div className={`${styles.carouselContainer}`} ref={carouselRef}>
          <motion.div
            className={styles.carouselInner}
            animate={{ x: computedOffset }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag={isMobile ? "x" : false}
            onDragEnd={isMobile ? handleDragEnd : undefined}
            style={{ display: "flex", gap: `${gap}px` }}
          >
            {images.map((link, index) => (
              <div key={index} className={styles.slideWrapper}>
                {link ? (
                  <img
                    src={link}
                    alt={`Slide ${index}`}
                    width={isMobile ? 260 : 800}
                    height={400}
                    className={styles.slideImage}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Arrow Buttons (desktop only) */}
        {!isMobile && (
          <div className={styles.arrowButtonsContainer}>
            <button
              onClick={handlePrev}
              className={styles.arrowButton}
              disabled={currentIndex === 0}
              style={{ border: "none" }}
            >
              <img
                width={24}
                height={24}
                src="/images/icons/Arrow_right.svg"
                alt="Previous Slide"
              />
            </button>
            <button
              onClick={handleNext}
              className={styles.arrowButton}
              disabled={currentIndex === images.length - 1}
              style={{ border: "none" }}
            >
              <img
                width={24}
                height={24}
                src="/images/icons/Arrow_right.svg"
                className={styles.rotate180}
                alt="Next Slide"
              />
            </button>
          </div>
        )}

        {/* Dot Pagination (mobile only) */}
        {isMobile && (
          <div className={styles.paginationDots}>
            {visibleDots.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${
                  i === activeDotInWindow
                    ? styles.activeDot
                    : styles.inactiveDot
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StorySection;
