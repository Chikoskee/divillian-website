'use client';

import { useRef, useState } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  return (
    <div id="home">
      <button className="mute-btn" onClick={toggleMute}>
        <span>{muted ? '🔇' : '🔊'}</span>
        <span>{muted ? 'Unmute' : 'Mute'}</span>
      </button>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} id="hero-video" className="full-width-media" autoPlay loop muted playsInline>
        <source src="/DevTopvideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
