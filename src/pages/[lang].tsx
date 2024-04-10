import { configuration } from "@/src/content/configuration";
import { useRouter } from "next/router";
import { useState } from "react";
import Variant from "@/src/components/variant";

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = configuration.variants.map((variant) => ({
    params: {
      lang: variant.locale.url,
    },
  }));

  return { paths, fallback: false };
}

export default function Lang() {
  const router = useRouter();
  const lang =
    (Array.isArray(router.query.lang)
      ? router.query.lang[0]
      : router.query.lang) || "";

  const [variant] = useState(
    configuration.variants.find((variant) => variant.locale.url === lang) ||
      configuration.defaultVariant,
  );

  return (
    <>
      <Variant variant={variant}></Variant>
    </>
  );
}
