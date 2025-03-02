"use client";

import React, { useRef, useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/animations/MyFuse Animation Sparky.json";
import styles from "./VerticalAnimationSection.module.css";

const sections = [
  {
    title: "Check Resume Score",
    subtitle: "Resume Score",
    text: "Turn your experience into an interview-winning resume with MyFuse’s AI builder. Create ATS-optimized formats in minutes, get action word suggestions and tailor content to industry standards effortlessly.",
    buttonText: "Check now",
  },
  {
    title: "Create New Resume using AI",
    subtitle: "Create Resume",
    text: "Turn your experience into an interview-winning resume with MyFuse's AI builder. Create ATS-optimized formats in minutes, get action word suggestions, and tailor content to industry standards effortlessly.",
    buttonText: "Create Now",
  },
  {
    title: "Custom Resume for Every JD",
    subtitle: "Resume Customization",
    text: "Turn your experience into an interview-winning resume with MyFuse's AI builder. Create ATS-optimized formats in minutes, get action word suggestions and tailor content to industry standards effortlessly.",
    buttonText: "Customize Now",
  },
  {
    title: "Smart Job Matching",
    subtitle: "Match Jobs",
    text: "Turn your experience into an interview-winning resume with MyFuse's AI builder. Create ATS-optimized formats in minutes, get action word suggestions and tailor content to industry standards effortlessly.",
    buttonText: "Find Jobs",
  },
];

function VerticalAnimationSection() {
  const containerRef = useRef(null);
  const pinnedRef = useRef(null);
  const textContentRef = useRef(null);
  const lottieRef = useRef(null);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const gsapModule = require("gsap");
    const gsap = gsapModule.gsap || gsapModule;
    const ScrollTriggerModule = require("gsap/ScrollTrigger");
    const ScrollTrigger =
      ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default;
    gsap.registerPlugin(ScrollTrigger);

    // Measure text content height and calculate scroll distance so that
    // the final element reaches the top half of the viewport.
    const contentHeight = textContentRef.current?.clientHeight || 0;
    const scrollDistance = contentHeight * 1.31 - window.innerHeight / 2;
    const totalHeight = scrollDistance + window.innerHeight;
    setScrollHeight(totalHeight);
    if (containerRef.current) {
      containerRef.current.style.height = `${totalHeight}px`;
    }
    lottieRef.current?.goToAndStop(0, true);

    // Animate text upward over the scroll distance.
    gsap.to(textContentRef.current, {
      y: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalHeight}`,
        scrub: 0.1,
      },
    });

    // Pin the section and update Lottie animation based on scroll progress.
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalHeight - 2000}`,
      scrub: 2,
      pin: pinnedRef.current,
      pinSpacing: false,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 0.95;
        const currentFrame = effectiveFrames * progress;
        lottieRef.current?.goToAndStop(currentFrame, true);
      },
      onLeave: () => {
        const totalFrames = 1380;
        const effectiveFrames = totalFrames * 0.95;
        lottieRef.current?.goToAndStop(effectiveFrames - 10, true);
      },
      onLeaveBack: () => {
        lottieRef.current?.goToAndStop(0, true);
      },
    });
  }, []);

  return (
    <div ref={containerRef} className={styles.root}>
      {/* Pinned container: remains fixed while scrolling */}
      <div ref={pinnedRef} className={styles.pinnedContainer}>
        {/* Text Section: occupies the top half */}
        <div className={styles.textSection}>
          <div className={styles.textWrapper}>
            <div ref={textContentRef} className={styles.textContent}>
              {sections.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.sectionItem} ${
                    index === sections.length - 1 ? styles.sectionItemLast : ""
                  }`}
                >
                  <div className={styles.sectionText}>
                    <div className={styles.subtitle}>{item.subtitle}</div>
                    <h2 className={styles.title}>{item.title}</h2>
                    <p className={styles.description}>{item.text}</p>
                  </div>
                  <button className={styles.sectionButton}>
                    {item.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Animation Section: occupies the bottom half */}
        <div className={styles.animationSection}>
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop={false}
            autoPlay={false}
            className={styles.lottieAnimation}
          />
        </div>
      </div>
      {/* Spacer to drive the scroll */}
      <div style={{ height: `${scrollHeight}px` }} />
    </div>
  );
}

export default VerticalAnimationSection;
