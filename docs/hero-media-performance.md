# Homepage hero media optimization

Verified September 12, 2026 against the local development site and then rechecked against the final production export in Chromium. No production deployment or field Core Web Vitals improvement is claimed.

## Asset change

The original five-second lawn clip is preserved at `public/images/gallery/hero-video.mp4`. The homepage uses a smaller rendition of that same clip, plus a poster extracted from its first frame. The existing crop and green overlay remain in the page.

| Asset | Dimensions | File bytes | Behavior |
| --- | --- | ---: | --- |
| Original MP4 | 4096 × 2160 | 12,922,331 | Preserved source; no longer requested by the hero |
| Optimized MP4 | 1280 × 676 | 836,458 | Eligible desktop playback; 93.5% smaller than the original |
| WebP poster | 1280 × 676 | 47,918 | Eager, high-priority image in the initial HTML |

Desktop background media totals 884,376 bytes for the video and poster, 93.2% below the previous video alone. Static-only devices request the 47,918-byte poster and no video, 99.6% below the previous video file. These are measured local file sizes, not page-weight or timing claims. Other page assets remain separate.

The video keeps the original clip's scene and approximate five-second duration, encoded as H.264 MP4 with a front-loaded playback index, no audio track, and 24 frames per second. The decorative media carries no information missing from the homepage text.

## Playback policy

`HeroMedia` server-renders the poster and a video element with no `src` or child source element. On suitable desktop viewports (768 pixels and up), JavaScript attaches the video URL after page load and only while the hero is in view. Smaller viewports, reduced-motion preferences, Save-Data connections, and reported slow-2G/2G/3G connections retain the poster without requesting video. Browser support for connection reporting varies; reduced motion and viewport checks still apply where that API is absent.

The video is muted and plays inline. A keyboard-accessible pause/play button is available for eligible desktop playback. Deliberate pauses survive scrolling away and back; otherwise playback pauses offscreen or when the document is hidden. Changing to reduced motion removes the source and stops playback. If autoplay is rejected, the poster remains visible and the user can explicitly choose play.

## Verification

- Eight regression tests passed in `src/__tests__/sections/HeroMedia.test.tsx`: server HTML, mobile/reduced-motion/connection exclusions, delayed in-view loading, deliberate pause persistence, autoplay rejection and preference changes.
- Scoped ESLint passed for the component and its tests.
- Browser checks passed for desktop, 390-pixel mobile, reduced motion, Save-Data, 3G, simulated autoplay rejection, and JavaScript disabled. Static-only scenarios made **zero video requests**. Eligible desktop made one request to the optimized MP4. No scenario requested the original 12.9 MB file.
- Browser checks verified pause/play, pause persistence, offscreen pause/resume, source removal after enabling reduced motion, visible poster/headline without JavaScript, and zero page errors in all seven scenarios.
- Desktop and mobile screenshots were inspected for the preserved visual treatment and accessible control placement.

Evidence: [browser results](audits/2026-09-12-hero-media-qa.json), [desktop screenshot](audits/hero-media-desktop.png), [mobile screenshot](audits/hero-media-mobile.png).

Re-run the component tests with `npx vitest run src/__tests__/sections/HeroMedia.test.tsx`. The final production build and all seven exported-site media scenarios passed; verify live production requests separately after an authorized deployment.

## Asset reproduction

No dependency was added. FFmpeg created the video and first-frame PNG; the installed Sharp package converted that PNG to WebP. Use a new output filename when changing a deployed media file because the site's image directory uses immutable caching.

```sh
ffmpeg -i public/images/gallery/hero-video.mp4 -an \
  -vf 'scale=1280:-2:flags=lanczos,fps=24' \
  -c:v libx264 -preset slow -crf 28 -profile:v main -level:v 3.1 \
  -pix_fmt yuv420p -movflags +faststart public/images/gallery/hero-video-1280.mp4
ffmpeg -i public/images/gallery/hero-video.mp4 -frames:v 1 \
  -vf 'scale=1280:-2:flags=lanczos' /tmp/murphys-hero-first-frame.png
node --input-type=module -e "import sharp from 'sharp'; await sharp('/tmp/murphys-hero-first-frame.png').webp({quality:78}).toFile('public/images/gallery/hero-poster.webp');"
```
