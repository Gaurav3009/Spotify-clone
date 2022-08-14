import React from 'react'
import './styles/Header.css';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { useDataLayerContext } from './DataContext';

function Header() {
  
    const [{ user }, dispatch] = useDataLayerContext();
    return (
    <div className = 'header'>
        <div className = 'header_left'>
            <SearchIcon/>
            <input 
            placeholder = 'Search fro Artists, Song, Podcasts, etc.,'
            type = 'text'/>
        </div>
        <div className = 'header_right'>
            <section style = {{display : 'flex', alignItems : 'center', backgroundColor : '#040406', borderRadius : '30px', justifyContent : 'space-between', paddingRight : '10px'}}>
            <Avatar style = {{marginRight : '1vw', height : '80%'}} alt="Gaurav" src = {user?.images[0]?.url} />
            <h4>{user?.display_name}</h4>
            </section>
        </div>
    </div>
  )
}

export default Header