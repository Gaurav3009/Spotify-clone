import React from 'react';
import Sidebar from './Sidebar';
import './styles/Player.css';
import Body from './Body';
import Footer from './Footer';
import Playlist from './Playlist';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';

function Player({ spotify }) {

  return (
    <div className = 'player'>
        <div className = 'player_body'>
          <Sidebar spotify = {spotify}/>

            <Routes>
              <Route path = '/' element = {<Body spotify = {spotify}/>}></Route>
              <Route path = 'playlist' element = {<Playlist spotify = {spotify}/>}></Route>
            </Routes>
        </div>
        <Footer spotify = {spotify}/>
    </div>
  )
}

export default Player