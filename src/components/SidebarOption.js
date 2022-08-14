import React from 'react'
import './styles/SidebarOption.css';
import { usePlaylistContext } from './PlaylistContext';
import { Link } from 'react-router-dom';

function SidebarOption({title, Icon, playlist}) {

  const { setCurrentPlaylist } = usePlaylistContext();

  return (
    <div className = 'sidebar_option'>
        {Icon && <Icon className = 'sidebarOption_icon'/>}
        {Icon ? <h4>{title}</h4> : <p onClick = { () => {console.log(playlist, 'setingcurrent!!!!'); setCurrentPlaylist(playlist);} }><Link style = {{textDecoration : 'none', color : 'white'}} to = '/playlist'>{title}</Link></p>}
    </div>
  )
}

export default SidebarOption