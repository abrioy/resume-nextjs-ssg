import { MetadataRoute } from "next";
import { Constant } from "@/src/model/constant";
import { publicInfo } from "@/src/content/public-info";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: publicInfo.pageTitle,
    short_name: publicInfo.fullName,
    description: publicInfo.pageDesc,
    start_url: Constant.basePath,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: `${Constant.basePath}/favicon.ico`,
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: `${Constant.basePath}/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${Constant.basePath}/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
