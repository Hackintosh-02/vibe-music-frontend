import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Right from './components/Right';
import NowPlaying from './components/NowPlaying';
import UploadSong from './components/UploadSong';
import axios from 'axios';

// console.log(process.env.REACT_APP_BACKEND_ADDRESS); 
const App = () => {
    // const address = {import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS};
    // console.log(address);
    // console.log(import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS);

    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
    console.log(import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS);
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS}/api/songs`);
                setSongs(response.data);
                if (response.data.length > 0) {
                    setCurrentSong(response.data[0]);
                    setCurrentIndex(0);
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1200);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePlayPause = (song) => {
        if (song) {
            if (currentSong && currentSong._id === song._id) {
                setIsPlaying(!isPlaying);
            } else {
                setCurrentSong(song);
                setIsPlaying(true);
                setCurrentIndex(songs.findIndex(s => s._id === song._id));
            }
        } else {
            setIsPlaying(false);
        }
    };

    const playNextSong = () => {
        if (songs.length > 0) {
            let nextIndex;
            if (isShuffling) {
                nextIndex = Math.floor(Math.random() * songs.length);
            } else {
                nextIndex = (currentIndex + 1) % songs.length;
            }
            setCurrentIndex(nextIndex);
            setCurrentSong(songs[nextIndex]);
            setIsPlaying(true);
        }
    };

    const playPreviousSong = () => {
        if (songs.length > 0) {
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            setCurrentIndex(prevIndex);
            setCurrentSong(songs[prevIndex]);
            setIsPlaying(true);
        }
    };

    const toggleShuffle = () => {
        setIsShuffling(!isShuffling);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-b from-red-800 to-black">
            {!isSmallScreen && (
                <div className="hidden lg:flex w-64">
                    <Sidebar />
                </div>
            )}
            <div className={`flex-1 flex flex-col overflow-y-auto ${isSmallScreen ? 'main-content-mobile' : ''}`}>
                <Header />
                {isSmallScreen && (
                    <div className="block lg:hidden p-4">
                        <UploadSong />
                    </div>
                )}
                <MainContent 
                    songs={songs}
                    currentSong={currentSong} 
                    onPlayPause={handlePlayPause} 
                />
            </div>
            {!isSmallScreen && (
                <div className="hidden lg:flex w-96">
                    <Right
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onNext={playNextSong}
                        onPrevious={playPreviousSong}
                        toggleShuffle={toggleShuffle}
                        toggleLoop={toggleLoop}
                        isShuffling={isShuffling}
                        isLooping={isLooping}
                    />
                </div>
            )}
            {isSmallScreen && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <NowPlaying
                        currentSong={currentSong}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        onNext={playNextSong}
                        onPrevious={playPreviousSong}
                        toggleShuffle={toggleShuffle}
                        toggleLoop={toggleLoop}
                        isShuffling={isShuffling}
                        isLooping={isLooping}
                        smallScreen={true}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
