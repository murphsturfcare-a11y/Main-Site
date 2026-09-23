'use client';

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

import { allowsVideo, staticPoster, subscribeToPlaybackPolicy } from '@/lib/media/playback-policy';

const VIDEO_URL = '/images/gallery/hero-video-1280.mp4';
const POSTER_URL = '/images/gallery/hero-poster.webp';

export default function HeroMedia() {
  const eligible = useSyncExternalStore(subscribeToPlaybackPolicy, allowsVideo, staticPoster);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoId = useId();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !eligible) return;
    let visible = false;
    let loaded = document.readyState === 'complete';
    let disposed = false;

    const playIfReady = () => {
      if (disposed || !loaded || !visible || document.hidden || userPaused.current) return;
      if (!video.getAttribute('src')) video.src = VIDEO_URL;
      // A browser can reject muted autoplay (for example in low-power mode).
      // Keep the poster visible until the native playing event confirms success.
      void video.play().catch(() => {});
    };
    const onWindowLoad = () => { loaded = true; playIfReady(); };
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else playIfReady();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) playIfReady();
      else video.pause();
    }, { threshold: 0.05 });

    observer.observe(video);
    window.addEventListener('load', onWindowLoad);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('load', onWindowLoad);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [eligible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || !eligible) return;
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      if (!video.getAttribute('src')) video.src = VIDEO_URL;
      void video.play().catch(() => {});
    }
  };

  return (
    <>
      <Image
        src={POSTER_URL}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover z-0"
      />
      <video
        ref={videoRef}
        id={videoId}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => { setPlaying(true); setHasPlayed(true); }}
        onPause={() => setPlaying(false)}
        onEmptied={() => { setPlaying(false); setHasPlayed(false); }}
        className={`absolute inset-0 w-full h-full object-cover z-0 ${eligible && hasPlayed ? 'opacity-100' : 'opacity-0'}`}
      />
      {eligible && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-controls={videoId}
          aria-label={playing ? 'Pause background video' : 'Play background video'}
          className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/30 bg-forest-dark/80 px-4 py-2 text-sm font-body text-white hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
          {playing ? 'Pause video' : 'Play video'}
        </button>
      )}
    </>
  );
}
