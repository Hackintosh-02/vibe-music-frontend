import React, { useState } from 'react';
import axios from 'axios';

const UploadSong = () => {
    const [songData, setSongData] = useState({
        title: '',
        artist: '',
        album: '',
        albumCoverPath: '',
        filePath: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSongData({ ...songData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setSongData({ ...songData, [name]: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', songData.title);
        formData.append('artist', songData.artist);
        formData.append('album', songData.album);
        formData.append('albumCover', songData.albumCoverPath);
        formData.append('songFile', songData.filePath);

        try {
            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_ADDRESS}/api/songs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Song uploaded successfully!');
            setSongData({
                title: '',
                artist: '',
                album: '',
                albumCoverPath: '',
                filePath: '',
            });
        } catch (error) {
            console.error('Error uploading song:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 w-full md:w-80 rounded-lg m-auto text-white">
            <h3 className="text-center font-bold mb-4">Upload Song</h3>
            <div className="mb-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={songData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 bg-gray-700 rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="artist" className="block text-sm font-medium text-gray-300">Artist</label>
                <input
                    type="text"
                    id="artist" 
                    name="artist"
                    value={songData.artist}
                    onChange={handleInputChange}
                    placeholder="Artist"
                    className="w-full p-2 bg-gray-700 rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="album" className="block text-sm font-medium text-gray-300">Album</label>
                <input
                    type="text"
                    id="album"
                    name="album"
                    value={songData.album}
                    onChange={handleInputChange}
                    placeholder="Album"
                    className="w-full p-2 bg-gray-700 rounded"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="albumCoverPath" className="block text-sm font-medium text-gray-300">Album Cover</label>
                <input
                    type="file"
                    id="albumCoverPath"
                    name="albumCoverPath"
                    onChange={handleFileChange}
                    className="w-full bg-gray-700 rounded text-white"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="filePath" className="block text-sm font-medium text-gray-300">Song File</label>
                <input
                    type="file"
                    id="filePath"
                    name="filePath"
                    onChange={handleFileChange}
                    className="w-full bg-gray-700 rounded text-white"
                />
            </div>
            <button type="submit" className="w-full p-2 bg-red-700 rounded hover:bg-red-800">
                Upload Song
            </button>
        </form>
    );
};

export default UploadSong;
