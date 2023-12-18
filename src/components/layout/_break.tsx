import styles from "./_break.module.css";

export default function Break() {
  return (
    <div style={{ breakAfter: "page" }}>
      <hr className={styles.break} />
    </div>
  );
}
