// src/pages/LandingPage/index.js
import React from "react";
import ResponsiveNavbar from "../../components/Navbar/Navbar";
import styles from "../../Home.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <ResponsiveNavbar />
      {/* Additional landing page content goes here */}
      <section>
        <h1>Welcome to MyFuse</h1>
        <p>This is your landing page content.</p>
      </section>
    </div>
  );
}
