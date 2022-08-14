import React, { useState, useEffect } from 'react'
import './styles/Sidebar.css';
import { useDataLayerContext } from './DataContext';
import SidebarOption from './SidebarOption';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Link } from 'react-router-dom';
import { usePlaylistContext } from './PlaylistContext';

function Sidebar({ spotify }) {
  
    const{ playlistTracks, setPlaylistTracks  } = usePlaylistContext();
    
    const [ { playlists }, dispatch] = useDataLayerContext();
    
    console.log(playlists, 'playlists');

    // const handleClick = (playlist) => {
    //   dispatch({
    //     type : 'SET_CURRENT_PLAYLIST',
    //     set_current_playlist : playlist,
    //   });
    // }

  return (
    <div className = 'sidebar'>
        <img className = 'sidebar_logo' src = 'https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt = 'spotify logo'
        />

        <Link style = {{textDecoration : 'none'}} to = ''><SidebarOption title = 'Home' Icon = {HomeRoundedIcon}/></Link>
        <SidebarOption title = 'Search' Icon = {SearchRoundedIcon}/>
        <SidebarOption title = 'Your Library' Icon = {LibraryMusicRoundedIcon}/>
        <br/>

        <SidebarOption title = 'Create Playlist' Icon = {AddBoxIcon}/>
        <SidebarOption title = 'Liked Songs' Icon = {FavoriteBorderIcon}/>
        <SidebarOption title = 'Your Episodes' Icon = {TurnedInIcon}/>

        {/* <br/> */}
        {/* <strong className = 'sidebar_title'>PLAYLISTS</strong> */}
        <hr/>
        {
            playlistTracks.map((playlist, index) => {
                console.log(playlist, 'check');
                return <SidebarOption playlist = { playlist }  key = { index } title = {playlist.name}/>
            })
        }
    </div>
  )
}

export default Sidebar;