import React, { useState, useEffect } from 'react';
import { play } from '../assets';
import { stop } from '../assets';

function AudioPlayer(props) {
  const [audio] = useState(new Audio(props.src));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleAudioEnded);

    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [audio]);

  const handlePlay = () => {
    setIsPlaying(true);
    audio.play();
    audio.playbackRate = 0.9;
  };

  const handleStop = () => {
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <div>
      {isPlaying ? (
        <button
          type="button"
          onClick={handleStop}
          className="outline-none bg-transparent border-none invert"
        >
          <img
            src={stop}
            alt="download"
            className="w-10 h-10 object-contain"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="outline-none bg-transparent border-none invert"
        >
          <img
            src={play}
            alt="download"
            className="w-10 h-10 object-contain"
          />
        </button>
      )}
    </div>
  );
}

export default AudioPlayer;
