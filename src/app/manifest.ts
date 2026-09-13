import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Murphy's Turf",
    short_name: "Murphy's Turf",
    description:
      "Artificial turf cleaning, pet odor treatment, grooming, and maintenance across our California service areas.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2D5016",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
