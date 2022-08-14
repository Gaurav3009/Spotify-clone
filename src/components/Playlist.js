import React from 'react';
import './styles/Playlist.css';
import Header from './Header';
import  { useDataLayerContext } from './DataContext';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SongRow from './SongRow';
import { usePlaylistContext } from './PlaylistContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Playlist({ spotify }) {
    
    const { currentPlaylist, setCurrentPlaylist } = usePlaylistContext();

    const [{ current_playlist }, dispatch] = useDataLayerContext();

    const playPlaylist = (id) => {
        spotify.play({
            context_uri : `spotify:playlist:${currentPlaylist?.id}`,
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then(
                (r)=>{
                    console.log(r.item);
                    dispatch({
                        type: "SET_ITEM",
                        item: r.item,
                      });
                      dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                      });
                }
            );
        });
    }

    const playSong = (id) => {
        console.log(id, 'id');
        spotify.play({
            uris : [`spotify:track:${id}`],
        })
        .then((res) => {
            spotify.getMyCurrentPlayingTrack().then((r) => {
                dispatch({
                    type: "SET_ITEM",
                    item: r.item,
                  });
                  dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                  });
            })
        })
    }

    return (
    <div className = 'body'>
        <Header spotify = {spotify}/>
        <div className = 'body_info'>
            <img src = {currentPlaylist?.images[0]?.url} alt = 'view'/>
            <div className = 'body_infoText'>
                <strong>PLAYLIST</strong>
                <h2>{currentPlaylist?.name}</h2>
                <p>{currentPlaylist?.description}</p>
            </div>
        </div>
        <div className = 'body_songs'>
            <div className = 'body_icons'>
                <PlayCircleFilledIcon onClick = {playPlaylist} className = 'body_shuffle'/>
                <FavoriteIcon style = {{color : 'green'}} fontSize = 'large'/>
            </div>
            {/* List of songs  */}
            <div className = 'tophead'>
                <div className = 'index'>#</div>
                <div className = 'song_details'>TITLE</div>
                <div className = 'track'>ALBUM</div>
                <div className = 'time'><AccessTimeIcon/></div>
            </div>
            <hr/>
        
            {
                currentPlaylist?.tracks?.items?.map((item, index)=>{
                    return <SongRow index = {index + 1} playSong = {playSong} key = {index} track = {item.track}/>
                })
            }
        </div>
    </div>
  )
}

export default Playlist