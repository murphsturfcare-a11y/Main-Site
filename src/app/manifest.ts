import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Murphy's Turf Care",
    short_name: "Murphy's Turf Care",
    description:
      "Professional turf cleaning and lawn care services across California.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2D5016",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
