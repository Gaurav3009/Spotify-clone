import React, { useEffect, useState } from 'react';
import './styles/Footer.css';
import { useDataLayerContext } from './DataContext';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { loginUrl } from './spotify';

function Footer({ spotify }) {
    console.log(spotify, 'spot');
    const [{ playing, item }, dispatch] = useDataLayerContext();
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);

    useEffect(()=>{
      spotify.setRepeat(repeat).then((res)=>{console.log('Repeat Toggled');});
    }, [repeat]);

    useEffect(()=>{
      spotify.setShuffle(shuffle).then((res)=>{console.log('Shuffle Toggled');});
    }, [shuffle])
    useEffect(() => {
        spotify.getMyCurrentPlaybackState().then((r)=>{

            dispatch({
                type : 'SET_PLAYING',
                playing : r.is_playing
            });

            dispatch({
                type : 'SET_ITEM',
                item : r.item
            });
            console.log(r.item, 'item');

        });

    }, [spotify]);

    const handleSongPlay = () => {
        if(playing) {
            spotify.pause();
            dispatch({
                type : 'SET_PLAYING',
                playing : false
            })
        }else{
            spotify.play();
            dispatch({
                type : 'SET_PLAYING',
                playing : true
            })
        }
    }

    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };

      const handleVolume = (e) => {
        spotify.setVolume(e.target.value).then((res)=>{console.log('volume set');});
      }

  return (
    <div className = 'footer'>
        <div className = 'footer_left'>
            <img className = 'footer_albumlogo' src = {item?.album.images[0].url} alt = {item?.name}/>
            {item ? (
          <div className="footer_songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer_songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
        </div>
        <div className = 'footer_center'>
            <ShuffleIcon onClick = {()=>{setShuffle(!shuffle);}} className = {shuffle ? 'footer_green' : 'footer_icon'}/>
            <SkipPreviousIcon onClick = {skipPrevious} className = 'footer_icon'/>
            {playing ? <PauseCircleOutlineIcon onClick = {handleSongPlay} className = 'footer_icon' fontSize = 'large' /> : <PlayCircleOutlinedIcon onClick = {handleSongPlay} className = 'footer_icon' fontSize = 'large' />}
            <SkipNextIcon onClick = {skipPrevious} className = 'footer_icon'/>
            <RepeatIcon onClick = {()=>{setRepeat(!repeat);}} className = {repeat ? 'footer_green' : 'footer_icon'}/>
        </div>
        <div className = 'footer_right'>
            <Grid container spacing = {2} direction = 'row'
                    justifyContent = 'center' 
                    align-items = 'center'>
                <Grid style = {{marginRight : '1vw'}} item xs = {1}>
                    <PlaylistPlayIcon/>
                </Grid>
                <Grid style = {{marginRight : '1vw'}} item xs = {1}>
                    <VolumeDownIcon/>
                </Grid>
                <Grid item xs = {4}>
                {/* <Slider/> */}
                <Slider onChange = {handleVolume}
                    size="small"
                    defaultValue={70}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                />
                </Grid>
            </Grid>
        </div>
    </div>
  )
}

export default Footer