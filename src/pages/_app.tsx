import "@fontsource-variable/inter";
import "@/src/styles/_variables.css";
import "@/src/styles/globals.css";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
