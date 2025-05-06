import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BestDeal Insurance",
    short_name: "BestDeal",
    description: "BestDeal",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#14141b",
    icons: [
      {
        src: "/svg/qr.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
