"use client";
import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import styles from "./CommentSection.module.css";

const comments = [
  {
    id: 1,
    category: "recent graduate",
    text: "As a recent graduate with very little experience, job hunting was really tough on me. MyFuse provided opportunities that matched my skills, making it easier to land my first job.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
  {
    id: 4,
    category: "recent graduate",
    text: "As a recent graduate with very little experience, job hunting was really tough on me. MyFuse provided opportunities that matched my skills, making it easier to land my first job.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
  {
    id: 5,
    category: "recent graduate",
    text: "As a recent graduate with very little experience, job hunting was really tough on me. MyFuse provided opportunities that matched my skills, making it easier to land my first job.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
  {
    id: 2,
    category: "young professional",
    text: "As a young professional, I needed career guidance. MyFuse connected me with great opportunities that matched my skills, making my transition smooth.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
  {
    id: 3,
    category: "experienced professional",
    text: "As an experienced professional, I was looking for better opportunities. MyFuse helped me find a position that aligns perfectly with my expertise.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
  {
    id: 10,
    category: "recent graduate",
    text: "As an experienced professional, I was looking for better opportunities. MyFuse helped me find a position that aligns perfectly with my expertise.",
    name: "Rajesh Singh",
    profile: "/images/profile/rajeshpfp.jpg",
  },
];

export default function CommentSection() {
  const [activeCategory, setActiveCategory] = useState("recent graduate");
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Update isMobile state based on viewport width.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter comments by the active category.
  const filteredComments = comments.filter(
    (comment) => comment.category === activeCategory
  );

  // When scrolling horizontally, update the current index.
  const handleScroll = (e) => {
    const containerWidth = e.currentTarget.clientWidth;
    const index = Math.round(e.currentTarget.scrollLeft / containerWidth);
    setCurrentIndex(index);
  };

  // Scroll smoothly to a particular comment.
  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: index * scrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  // Pagination Dot Logic for Mobile
  const totalDots = filteredComments.length;
  const windowSize = Math.min(5, totalDots);
  let startDot = 0;
  if (totalDots > windowSize) {
    startDot = currentIndex - Math.floor(windowSize / 2);
    if (startDot < 0) startDot = 0;
    if (startDot > totalDots - windowSize) startDot = totalDots - windowSize;
  }
  const visibleDots = filteredComments.slice(startDot, startDot + windowSize);
  const activeDotInWindow = currentIndex - startDot;

  return (
    <section className={styles.commentSection}>
      <div className={styles.backgroundContainer}>
        {/* Heading & Image */}
        <div className={styles.headingContainer}>
          <img
            src="/images/animations/testimonialSectionClip.svg"
            alt="Pin"
            className={styles.headingImage}
          />
          <h2 className={styles.heading}>
            Job Seekers Love <br className="hidden md:block" /> MyFuse
          </h2>
        </div>
        <hr className={styles.divider} />

        {/* Category Buttons */}
        <div className={styles.categoryButtons}>
          {[
            "recent graduate",
            "young professional",
            "experienced professional",
          ].map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollLeft = 0;
                }
              }}
              className={`${styles.categoryButton} ${
                activeCategory === category
                  ? styles.activeCategoryButton
                  : styles.inactiveCategoryButton
              }`}
              style={{ border: "2px solid #4d4dff" }}
            >
              {category.toUpperCase().replace("_", " ")}
            </button>
          ))}
        </div>

        {/* Comments Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={styles.commentsContainer}
          style={{
            touchAction: "pan-x",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {filteredComments.map((comment) => (
            <div key={comment.id} className={styles.commentCard}>
              <img
                src="/images/animations/quotations.svg"
                alt="Quotation Mark"
                className={styles.quotationImage}
              />
              <p className={styles.commentText}>{comment.text}</p>
              <div className={styles.cardFooter}>
                <img
                  src={comment.profile}
                  alt={comment.name}
                  className={styles.profileImage}
                />
                <span className={styles.commentName}>{comment.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        {isMobile && totalDots > 1 && (
          <div className={styles.paginationDots}>
            {visibleDots.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i + startDot)}
                className={`${styles.dot} ${
                  activeDotInWindow === i
                    ? styles.activeDot
                    : styles.inactiveDot
                }`}
                style={{ border: "1px solid #4d4dff" }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
