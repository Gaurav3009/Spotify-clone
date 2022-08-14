import React from 'react'
import './styles/Body.css';
import Header from './Header';
import  { useDataLayerContext } from './DataContext';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SongRow from './SongRow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Body({ spotify }) {
    
    const [{ discover_weekly }, dispatch] = useDataLayerContext();

    const playPlaylist = (id) => {
        spotify.play({
            context_uri : `spotify:playlist:37i9dQZEVXcS4pi7fkzD2k`,
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
            <img src = {discover_weekly?.images[0]?.url} alt = 'view'/>
            <div className = 'body_infoText'>
                <strong>PLAYLIST</strong>
                <h2>Discover Weekly</h2>
                <p>{discover_weekly?.description}</p>
            </div>
        </div>
        <div className = 'body_songs'>
            <div className = 'body_icons'>
                <PlayCircleFilledIcon onClick = {playPlaylist} className = 'body_shuffle'/>
                <FavoriteIcon style = {{color : 'green'}}fontSize = 'large'/>
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
                discover_weekly?.tracks.items.map((item, index)=>{
                    return <SongRow index = {index + 1} playSong = {playSong} key = {index} track = {item.track}/>
                })
            }
        </div>
    </div>
  )
}

export default Body