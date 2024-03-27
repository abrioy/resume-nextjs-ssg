import CVBody from "@/src/content/fr/cv/body.mdx";
import styles from "./cv.module.css";
import Header from "@/src/components/commons/header";
import { VariantDocumentComponentArgs } from "@/src/model/configuration.model";

export default function CV({
  variant,
  components,
}: VariantDocumentComponentArgs) {
  return (
    <>
      <header className={styles.cv}>
        <Header variant={variant}></Header>
      </header>
      <main className={styles.cv}>
        <CVBody components={components}></CVBody>
      </main>
    </>
  );
}
