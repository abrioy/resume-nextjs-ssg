import styles from "./_emList.module.css";

export default function EmList({
  values,
  light,
  inline,
}: {
  values: string;
  light?: boolean;
  inline?: boolean;
}) {
  const tags = values?.split(", ").map((child) => child.trim()) || [];
  const childrenElements = tags.map((child, index) => (
    <span key={index}>
      <em
        className={`${styles.element} ${index === 0 ? styles.first : ""} ${
          light ? styles.light : ""
        }`}
      >
        {child.trim()}
      </em>
      {index !== tags.length - 1 ? "," : ""}&ensp;
    </span>
  ));

  if (!inline) {
    return (
      <p style={{ margin: 0 }} className={styles.tags}>
        {childrenElements}
      </p>
    );
  } else {
    return <span className={styles.tags}>{childrenElements}</span>;
  }
}
