import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaylistContext = createContext();

export const usePlaylistContext = ()=>{
    return useContext(PlaylistContext);
}

export const PlaylistContextProvider = ({children}) => {
    
    const[playlistTracks, setPlaylistTracks] = useState([]);

    const [currentPlaylist, setCurrentPlaylist] = useState({});

    useEffect(() => {
        console.log(playlistTracks, 'playlistContext');
    }, [playlistTracks]);

    useEffect(() => {
        console.log(currentPlaylist, 'currentPlaylist');
    }, [currentPlaylist]);

    const value = {
        playlistTracks,
        setPlaylistTracks,
        currentPlaylist,
        setCurrentPlaylist
    }
    return <PlaylistContext.Provider value = {value}>
        {children}
    </PlaylistContext.Provider>
}