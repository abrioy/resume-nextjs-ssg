import { MDXComponents } from "mdx/types";
import Head from "next/head";
import CV from "@/src/components/cv/cv";
import Resume from "@/src/components/resume/resume";

import styles from "./index.module.css";
import Break from "@/src/components/layout/_break";
import { useEffect, useState } from "react";
import Toolbar from "@/src/components/layout/_toolbar";
import { publicInfo } from "@/src/content/public-info";

const components: MDXComponents = {};

const cleanUrl = (url: string): string => {
  return url.replace(/^([^#]*#)/, "");
};

export default function Index() {
  const [current, setCurrent] = useState("all");

  useEffect(() => {
    setCurrent(cleanUrl(location.hash));
    const onHashChange = (event: HashChangeEvent) => {
      setCurrent(cleanUrl(event.newURL));
    };

    addEventListener("hashchange", onHashChange);

    return () => {
      removeEventListener("hashchange", onHashChange);
    };
  }, [setCurrent]);

  return (
    <>
      <Head>
        <meta name="viewport" content="user-scalable=yes, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>{`${publicInfo.anonymousName} - ${publicInfo.title}`}</title>
      </Head>

      <div
        className={`${styles.container} page-container`}
        data-show-children={current || "all"}
      >
        <section className={`page page-single`} data-show-when="resume">
          <Toolbar type="resume"></Toolbar>
          <Resume components={components} />
        </section>

        <Break />

        <section className={`page`} data-show-when="cv">
          <Toolbar type="cv"></Toolbar>
          <CV components={components} />
        </section>
      </div>
    </>
  );
}
