import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <p className={styles.p1}>404 - Error</p>
      <p className={styles.p2}>Page Not Found</p>
    </div>
  );
}

export default NotFound;
