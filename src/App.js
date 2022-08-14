import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import { getTokenFromResponse } from './components/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './components/Player';
import { useDataLayerContext } from './components/DataContext';
import { usePlaylistContext } from './components/PlaylistContext';

const s = new SpotifyWebApi(); // constructor 

function App() {
  
  const { playlistTracks, setPlaylistTracks } = usePlaylistContext();

  const [{ user, token }, dispatch] = useDataLayerContext();

  useEffect(()=>{
    console.log('hello');
    const hash = getTokenFromResponse();
    window.location.hash = '';
    let tok = hash.access_token;
    if(tok) {
      console.log(tok, 'token');
      s.setAccessToken(tok);

      dispatch({
        type : 'SET_TOKEN',
        token : tok
      });

      s.getMe().then(user=>{
        console.log(user);
        dispatch({
          type : 'SET_USER',
          user,
        });
        console.log(user);
      }).catch(error=>{console.log(error);})

      s.getPlaylist('37i9dQZEVXcS4pi7fkzD2k')
      .then(response => {
        dispatch({
          type : 'SET_DISCOVER_WEEKLY',
          discover_weekly : response
        });
        console.log(response, 'discover_weekly');
      });

      s.getUserPlaylists().then(playlists=>{
        dispatch({
          type : 'SET_PLAYLISTS',
          playlists,
        });
        let out = []
        playlists?.items.map((playlist, index) => {
          s.getPlaylist(playlist.id)
          .then(response=>{
            out.push(response);
          })
        });
        setPlaylistTracks(out);
        console.log(playlists, 'Playlist of mine');
      })
      s.getMyTopArtists().then((response) =>
          dispatch({
            type: "SET_TOP_ARTISTS",
            top_artists: response,
          })
        );
  
        dispatch({
          type: "SET_SPOTIFY",
          spotify: s,
        });
    }
    // console.log(token, 'I have a token');
  }, [token, dispatch]);

  return (
    <section className = 'app'>
      {/* {
        token ? <Player spotify = {s}/> : <Login/> 
      } */}
      {!token && <Login />}
      {token && <Player spotify={s} />}
    </section>
  );
}

export default App;
