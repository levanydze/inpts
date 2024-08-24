import React from "react";
import styles from "./LowerFoot.module.css";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function LowerFoot() {
  return (
    <div className={styles.lowerWrap}>
      <div className={styles.footerOverlay}>
        <p className={` ${styles.heartName} ${styles.dimmed}`}>
          Created with <FaHeart className={styles.heart} />
          by
        </p>
        <Link href="https://www.levanidze.com/" target="_blank">
          <p className={`font2 ${styles.lighted}`}>Levani</p>
        </Link>
        <div className={styles.divider}></div>
        <p className={styles.dimmed}>Powered by</p>
        <Link href="https://www.levanidze.com/" target="_blank">
          <p className={`font2 ${styles.lighted}`}>Levanidze.com</p>
        </Link>
        <div className={styles.divider}></div>
        <p className={styles.dimmed}> Style Guide</p>
        <div className={styles.divider}></div>
        <p className={styles.dimmed}>Licenses</p>
      </div>
    </div>
  );
}
