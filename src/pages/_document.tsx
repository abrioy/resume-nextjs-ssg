import { Head, Html, Main, NextScript } from "next/document";
import { configuration } from "@/src/content/configuration";

export default function Document() {
  return (
    <Html lang={configuration.variants[0].locale.htmlLang}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
