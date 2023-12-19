import { Head, Html, Main, NextScript } from "next/document";
import { publicInfo } from "@/src/content/public-info";

export default function Document() {
  return (
    <Html lang={publicInfo.lang}>
      <Head />

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
