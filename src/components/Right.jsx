import React from 'react';
import UploadSong from './UploadSong';
import NowPlaying from './NowPlaying';

const Right = ({ currentSong, isPlaying, onPlayPause, onNext, onPrevious, toggleShuffle, toggleLoop, isShuffling, isLooping }) => {
    return (
        <div className="w-96 fixed inset-y-0 right-0 p-4 bg-gradient-to-b flex flex-col justify-between z-40"
            style={{ background: 'linear-gradient(180deg, #000000 0%, #0F0F0F 60%)' }}>
            <UploadSong />
            <NowPlaying
                currentSong={currentSong}
                isPlaying={isPlaying}
                onPlayPause={onPlayPause}
                onNext={onNext}
                onPrevious={onPrevious}
                toggleShuffle={toggleShuffle}
                toggleLoop={toggleLoop}
                isShuffling={isShuffling}
                isLooping={isLooping}
            />
        </div>
    );
};

export default Right;
