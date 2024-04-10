import { MetadataRoute } from "next";
import { Constant } from "@/src/model/constant.model";
import { configuration } from "@/src/content/configuration";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: configuration.defaultVariant.infos.pageTitle(),
    short_name: configuration.defaultVariant.infos.fullName(),
    description: configuration.defaultVariant.infos.pageDesc(),
    start_url: Constant.baseUrl,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: `${Constant.baseUrl}/favicon.ico`,
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: `${Constant.baseUrl}/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${Constant.baseUrl}/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
