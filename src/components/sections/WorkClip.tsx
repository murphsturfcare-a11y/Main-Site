'use client';

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { allowsVideo, staticPoster, subscribeToPlaybackPolicy } from '@/lib/media/playback-policy';

interface WorkClipProps {
  src: string;
  poster: string;
  /** Describes the footage for assistive technology and the play control. */
  label: string;
  className?: string;
}

/**
 * A short, silent clip of actual work. The served HTML carries only the poster
 * image; the video is attached after load, and only when the visitor's device
 * and settings allow motion. Same policy as the homepage hero.
 */
export default function WorkClip({ src, poster, label, className = '' }: WorkClipProps) {
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
    let disposed = false;

    const playIfReady = () => {
      if (disposed || !visible || document.hidden || userPaused.current) return;
      if (!video.getAttribute('src')) video.src = src;
      // Muted autoplay can still be refused, for example in low-power mode.
      void video.play().catch(() => {});
    };
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else playIfReady();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) playIfReady();
      else video.pause();
    }, { threshold: 0.25 });

    observer.observe(video);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [eligible, src]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video || !eligible) return;
    if (!video.paused) {
      userPaused.current = true;
      video.pause();
    } else {
      userPaused.current = false;
      if (!video.getAttribute('src')) video.src = src;
      void video.play().catch(() => {});
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-charcoal ${className}`}>
      <Image src={poster} alt={label} fill sizes="(min-width: 640px) 50vw, 100vw" loading="lazy" className="object-cover" />
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
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${eligible && hasPlayed ? 'opacity-100' : 'opacity-0'}`}
      />
      {eligible && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-controls={videoId}
          aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-forest-dark/80 px-3 py-1.5 text-xs font-body text-white hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {playing ? <Pause aria-hidden="true" className="h-3.5 w-3.5" /> : <Play aria-hidden="true" className="h-3.5 w-3.5" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
}
