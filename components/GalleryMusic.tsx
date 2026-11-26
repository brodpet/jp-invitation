'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SONG_SRC = '/music/gallery-song.mp3';

export default function GalleryMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;

    const startOnFirstTap = () => {
      audio.play().catch(() => {});
      window.removeEventListener('pointerdown', startOnFirstTap);
    };

    audio.play().catch(() => window.addEventListener('pointerdown', startOnFirstTap));

    return () => {
      window.removeEventListener('pointerdown', startOnFirstTap);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={SONG_SRC}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {mounted &&
        createPortal(
          <button
            type="button"
            className={`music-toggle${playing ? ' is-playing' : ''}`}
            onClick={toggle}
            onPointerDown={(e) => e.stopPropagation()}
            aria-label={playing ? 'Pause music' : 'Play music'}
            aria-pressed={playing}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M9 18V5l11-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="17" cy="16" r="3" />
              {!playing && <path d="M3 3l18 18" />}
            </svg>
          </button>,
          document.body,
        )}
    </>
  );
}
