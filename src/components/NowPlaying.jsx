import React, { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import { FaPlay, FaPause, FaBackward, FaForward, FaRandom, FaRedo } from 'react-icons/fa';

const NowPlaying = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, toggleShuffle, toggleLoop, isShuffling, isLooping, smallScreen }) => {
    const soundRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (currentSong) {
            if (soundRef.current) {
                soundRef.current.unload();
            }

            soundRef.current = new Howl({
                src: [currentSong.filePath],
                html5: true,
                loop: isLooping,
                onend: () => {
                    if (isLooping) {
                        soundRef.current.seek(0);
                        soundRef.current.play();
                    } else {
                        onNext();
                    }
                },
            });

            if (isPlaying) {
                soundRef.current.play();
                startProgressTracking();
            }
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
            }
            clearInterval(intervalRef.current);
        };
    }, [currentSong]);

    useEffect(() => {
        if (soundRef.current && isPlaying) {
            soundRef.current.loop(isLooping);
        }
    }, [isLooping]);

    useEffect(() => {
        if (soundRef.current) {
            if (isPlaying) {
                soundRef.current.play();
                startProgressTracking();
            } else {
                soundRef.current.pause();
                clearInterval(intervalRef.current);
            }
        }
    }, [isPlaying]);

    const startProgressTracking = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setProgress(soundRef.current.seek());
        }, 1000);
    };

    const handlePlayPause = () => {
        onPlayPause(currentSong);
    };

    const handleSeek = (e) => {
        const seekTo = parseFloat(e.target.value);
        soundRef.current.seek(seekTo);
        setProgress(seekTo);
    };

    if (!currentSong) {
        return <div className="text-white">No song selected</div>;
    }

    return (
        <div className={`bg-red-800 p-4 rounded-lg text-white ${smallScreen ? 'fixed bottom-0 left-0 right-0 w-full' : 'm-auto w-80'}`}>
            <h3 className="text-center font-bold mb-4">Now Playing</h3>
            {!smallScreen && (
                <img
                    src={currentSong.albumCoverPath}
                    alt={currentSong.title}
                    className="w-56 h-auto rounded-lg mb-4 m-auto"
                />
            )}
            <div className="text-center">
                <h4 className="font-bold text-lg">{currentSong.title}</h4>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>
            <div className="mt-2">
                <input
                    type="range"
                    className="w-full"
                    value={progress}
                    max={soundRef.current?.duration() || 0}
                    onChange={handleSeek}
                    style={{ accentColor: '#8B0000' }}
                />
            </div>
            <div className="flex justify-between items-center mt-4">
                <button onClick={toggleShuffle}>
                    <FaRandom className={`w-6 h-6 ${isShuffling ? 'text-red-400' : 'text-white'}`} />
                </button>
                <div className="flex space-x-4">
                    <button onClick={onPrevious}>
                        <FaBackward className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={handlePlayPause}>
                        {isPlaying ? (
                            <FaPause className="w-6 h-6 text-white" />
                        ) : (
                            <FaPlay className="w-6 h-6 text-white" />
                        )}
                    </button>
                    <button onClick={onNext}>
                        <FaForward className="w-6 h-6 text-white" />
                    </button>
                </div>
                <button onClick={toggleLoop}>
                    <FaRedo className={`w-6 h-6 ${isLooping ? 'text-red-400' : 'text-white'}`} />
                </button>
            </div>
        </div>
    );
};

export default NowPlaying;
