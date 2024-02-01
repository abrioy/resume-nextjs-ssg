import React from "react";
import styles from "./_missionTitle.module.css";

export default function MissionTitle({
  title,
  employer,
}: Record<string, string>) {
  return (
    <>
      <h2 className={styles.title}>
        <span>{title}</span>
        <span>{employer}</span>
      </h2>
      <hr className={styles.separator} />
    </>
  );
}
