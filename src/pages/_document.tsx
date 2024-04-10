import { Head, Html, Main, NextScript } from "next/document";
import { NextPageContext } from "next";
import { configuration } from "@/src/content/configuration";
import { useState } from "react";

export default function Document(ctx: NextPageContext) {
  const pathLang = (ctx as any).dangerousAsPath?.replaceAll(/^\//g, "");
  const [variant] = useState(
    configuration.variants.find((variant) => variant.locale.url === pathLang) ||
      configuration.defaultVariant,
  );

  return (
    <Html lang={variant.locale.htmlLang}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
