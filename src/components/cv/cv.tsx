import CVBody from "@/src/content/cv/body.mdx";
import { MDXComponents } from "mdx/types";
import styles from "./cv.module.css";
import Header from "@/src/components/commons/header";

export default function CV({ components }: { components: MDXComponents }) {
  return (
    <>
      <header className={styles.cv}>
        <Header type={"cv"}></Header>
      </header>
      <main className={styles.cv}>
        <CVBody components={components}></CVBody>
      </main>
    </>
  );
}
