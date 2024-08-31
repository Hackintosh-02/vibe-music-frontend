import React, { useEffect, useState } from 'react';
import bannerImage from '../assets/images/Banner.png';
import axios from 'axios';


const MainContent = ({ onPlayPause }) => {
    const [songs, setSongs] = useState([]);
    const [draggedSong, setDraggedSong] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS}/api/songs`);
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const onDragStart = (e, index) => {
        setDraggedSong(songs[index]);
        e.dataTransfer.effectAllowed = "move";
    };

    const onDragOver = (index) => {
        const draggedOverSong = songs[index];

        if (draggedSong === draggedOverSong) {
            return;
        }

        let newSongs = songs.filter(song => song !== draggedSong);

        newSongs.splice(index, 0, draggedSong);

        setSongs(newSongs);
    };

    const onDrop = () => {
        setDraggedSong(null);
        // After dropping, update the indexes
        setSongs((prevSongs) =>
            prevSongs.map((song, index) => ({
                ...song,
                index: index + 1,
            }))
        );
    };

    return (
        <div className="flex-1 overflow-y-scroll p-8 bg-transparent text-white hide-scrollbar">
            <div className="max-w-6xl mx-auto">
                <div className="w-full mb-10">
                    <img
                        src={bannerImage}
                        alt="Banner"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <h2 className="text-3xl font-bold mb-4">Trending Songs</h2>
                
                <ul className="space-y-4">
                    {songs.map((song, index) => (
                        <li
                            key={song._id}
                            className="grid grid-cols-4 gap-4 items-center p-2 rounded hover:bg-gray-700 cursor-pointer"
                            onClick={() => onPlayPause(song)}
                            draggable
                            onDragStart={(e) => onDragStart(e, index)}
                            onDragOver={() => onDragOver(index)}
                            onDrop={onDrop}
                        >
                            <div className="flex items-center space-x-4 col-span-2">
                                <span>{index + 1}</span>
                                <img src={song.albumCoverPath} alt={`${song.title} cover`} className="w-10 h-10 rounded-md" />
                                <span>{song.title}</span>
                            </div>
                            <span>{song.playing || "4:00"}</span> 
                            <span className="hidden sm:block">{song.album}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MainContent;
