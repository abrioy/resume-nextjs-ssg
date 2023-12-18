import styles from "./_progress.module.css";

export default function Progress({ score }: { score: number }) {
  return (
    <div
      className={styles.progress}
      style={{ ["--score" as any]: score / 10 }}
    ></div>
  );
}
