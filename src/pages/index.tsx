import { MDXComponents } from "mdx/types";
import Head from "next/head";

import styles from "./index.module.css";
import Break from "@/src/components/layout/_break";
import { Fragment, useEffect, useState } from "react";
import Toolbar from "@/src/components/layout/_toolbar";
import { configuration } from "@/src/content/configuration";
import { Constant } from "@/src/model/constant.model";

const components: MDXComponents = {};

const cleanUrl = (url: string): string => {
  return url.replace(/^([^#]*#)/, "");
};

export default function Index() {
  const [variant] = useState(configuration.variants[0]);
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
        <meta name="viewport" content="user-scalable=yes, width=850" />
        <link rel="icon" href={`${Constant.baseUrl}/favicon.ico`} />
        <title>{variant.infos.pageTitle()}</title>
        <meta name="description" content={variant.infos.pageDesc()} />

        <meta property="og:locale" content={variant.locale.openGraph} />
        <meta property="og:title" content={variant.infos.pageTitle()} />
        <meta property="og:site_name" content={variant.infos.fullName()} />
        <meta property="og:description" content={variant.infos.pageDesc()} />

        <meta property="og:type" content="profile" />
        <meta
          property="og:profile:username"
          content={variant.infos.anonymousName()}
        />
        <meta
          property="og:profile:first_name"
          content={variant.infos.firstName()}
        />
        <meta
          property="og:profile:last_name"
          content={variant.infos.lastName()}
        />

        <meta property="og:image" content={`${variant.baseUrl}/preview.png`} />
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

        {variant.picture && (
          <>
            <meta
              property="og:image"
              content={`${variant.baseUrl}/${variant.picture.url()}`}
            />
            <meta property="og:image:type" content={variant.picture.type()} />
            <meta property="og:image:alt" content={variant.picture.alt()} />
          </>
        )}
      </Head>

      <div
        className={`${styles.container} page-container`}
        data-show-children={current || "all"}
      >
        {variant.documents.map((variantDocument, index) => (
          <Fragment key={index}>
            {index !== 0 ? <Break /> : <></>}

            <section
              className={`page ${variantDocument.singlePage ? "page-single" : ""}`}
              data-show-when={index}
            >
              <Toolbar variant={variant} resume={variantDocument}></Toolbar>
              {variantDocument.component({
                variant,
                variantDocument,
                components,
              })}
            </section>
          </Fragment>
        ))}
      </div>
    </>
  );
}
