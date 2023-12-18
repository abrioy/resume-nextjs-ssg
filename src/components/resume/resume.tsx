import Intro from "@/src/content/resume/intro.mdx";
import Experience from "@/src/content/resume/experience.mdx";
import Skills from "@/src/content/resume/skills.mdx";
import Training from "@/src/content/resume/training.mdx";
import SkillsSecondary from "@/src/content/resume/skills-secondary.mdx";
import { MDXComponents } from "mdx/types";
import styles from "./resume.module.css";
import stylesTimeline from "./resume-timeline.module.css";
import Header from "@/src/components/commons/header";

export default function Resume({ components }: { components: MDXComponents }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <header className={styles.resume}>
        <Header type={"resume"}>
          <Intro components={components}></Intro>
        </Header>
      </header>
      <main className={styles.resume}>
        <section className={styles.body}>
          <section className={styles.skills}>
            <section>
              <Skills components={components}></Skills>
            </section>
            <section className={styles.secondary}>
              <SkillsSecondary components={components}></SkillsSecondary>
            </section>
            <section className={styles.training}>
              <Training components={components}></Training>
            </section>
          </section>
          <section className={stylesTimeline.timeline}>
            <Experience components={components}></Experience>
          </section>
        </section>
      </main>
    </div>
  );
}
