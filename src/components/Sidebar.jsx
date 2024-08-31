import React from 'react';
import logo from '../assets/icons/logo.png';
import homeIcon from '../assets/icons/home.png';
import trendsIcon from '../assets/icons/trends.png';
import libraryIcon from '../assets/icons/library.png';
import discoverIcon from '../assets/icons/discover.png';
import settingsIcon from '../assets/icons/settings.png';
import logoutIcon from '../assets/icons/logout.png';

const Sidebar = () => (
    <div className="fixed bg-[#0E0E0E] text-white w-64 h-full p-6 flex flex-col justify-between z-20">
        <div>
            <div className="flex items-center space-x-2 mb-10">
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <div className="text-3xl font-bold">
                    <span className="text-red-500">Vibe</span>Music
                </div>
            </div>
            <ul className="space-y-6">
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={homeIcon} alt="Home" className="w-6 h-6" />
                    <span>Home</span>
                </li>
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={trendsIcon} alt="Trends" className="w-6 h-6" />
                    <span>Trends</span>
                </li>
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={libraryIcon} alt="Library" className="w-6 h-6" />
                    <span>Library</span>
                </li>
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={discoverIcon} alt="Discover" className="w-6 h-6" />
                    <span>Discover</span>
                </li>
            </ul>
        </div>
        <div>
            <ul className="space-y-6">
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={settingsIcon} alt="Settings" className="w-6 h-6" />
                    <span>Settings</span>
                </li>
                <li className="flex items-center space-x-4 hover:bg-gray-700 rounded-lg p-2 cursor-pointer">
                    <img src={logoutIcon} alt="Log Out" className="w-6 h-6" />
                    <span>Log Out</span>
                </li>
            </ul>
        </div>
    </div>
);

export default Sidebar;
