'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';


const headlineWords = "When You Care About Clean Turf, Call Murphy\u2019s Turf".split(' ');

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] lg:min-h-screen flex items-center justify-center bg-gradient-to-br from-forest to-sage overflow-hidden"
    >
      {/* Parallax hero background image */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Beautiful clean artificial turf"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Animated gradient overlay — fades in on load, pulses subtly */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/35"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{ opacity: overlayOpacity }}
      />
      {/* Secondary shifting overlay for shimmer effect */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-tr from-black/30 via-transparent to-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content with parallax offset */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 text-center py-20"
        style={{ y: contentY }}
      >
        {/* Cinematic word-by-word headline reveal */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%', rotateX: 40, opacity: 0 }}
                animate={{ y: '0%', rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle — sweeps in with a slight blur clear */}
        <motion.p
          className="text-lg md:text-xl text-white/90 mt-6 font-body max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.3, ease: 'easeOut' }}
        >
          Worried about your pets ruining your turf? Count on Murphy&apos;s to
          help bring your artificial grass back to life with a variety of
          services ranging from reblooming to debris removal &amp; deodorizing.
        </motion.p>

        {/* Floating / breathing CTA button */}
        <motion.div
          className="mt-8 inline-block"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-block rounded-lg"
            animate={{
              y: [0, -5, 0],
              boxShadow: [
                '0 4px 25px rgba(107,142,35,0.25)',
                '0 8px 40px rgba(107,142,35,0.5)',
                '0 4px 25px rgba(107,142,35,0.25)',
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Link
              href="/locations"
              className="inline-block bg-sage text-forest-dark px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sage-light transition"
            >
              Get Your Free Quote
            </Link>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}
