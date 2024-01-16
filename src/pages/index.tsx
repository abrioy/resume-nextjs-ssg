import { MDXComponents } from "mdx/types";
import Head from "next/head";
import CV from "@/src/components/cv/cv";
import Resume from "@/src/components/resume/resume";

import styles from "./index.module.css";
import Break from "@/src/components/layout/_break";
import { useEffect, useState } from "react";
import Toolbar from "@/src/components/layout/_toolbar";
import { publicInfo } from "@/src/content/public-info";
import { Constant } from "@/src/model/constant";

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
        <meta
          name="viewport"
          content="user-scalable=yes, width=850, viewport-fit=contain"
        />
        <link rel="icon" href={`${Constant.basePath}/favicon.ico`} />
        <title>{publicInfo.pageTitle}</title>

        <meta property="og:locale" content={publicInfo.og.lang} />
        <meta property="og:title" content={publicInfo.og.title} />
        <meta property="og:site_name" content={publicInfo.og.siteName} />
        <meta property="og:description" content={publicInfo.pageDesc} />

        <meta property="og:type" content="profile" />
        <meta
          property="og:profile:username"
          content={publicInfo.anonymousName}
        />
        <meta property="og:profile:first_name" content={publicInfo.firstName} />
        <meta property="og:profile:last_name" content={publicInfo.lastName} />

        <meta
          property="og:image"
          content={`${Constant.basePath}/preview.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:width"
          content={Constant.openGraphImageWidth.toFixed(0)}
        />
        <meta
          property="og:image:height"
          content={Constant.openGraphImageHeight.toFixed(0)}
        />
        <meta property="og:image:alt" content="preview" />

        {publicInfo.picture && (
          <>
            <meta
              property="og:image"
              content={`${Constant.basePath}/${publicInfo.picture.url}`}
            />
            <meta property="og:image:type" content={publicInfo.picture.type} />
            <meta property="og:image:alt" content={publicInfo.picture.alt} />
          </>
        )}
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
