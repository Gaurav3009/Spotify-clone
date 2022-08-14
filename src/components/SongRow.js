import React from 'react';
import './styles/SongRow.css';

function SongRow({ track, playSong, index }) {

  const getTime = (time) =>{
    console.log(time);
    let a = '';
    time = (time / 1000).toFixed(0);
    a += (time / 60).toFixed(0) + ':';
    time = time % 60;
    if(time > 60) {
      a += (time / 60).toFixed(0) + ':';
      time = time % 60;
      if(time == 0) {
        a += '00';
      }else if(time < 10) {
        a += `${time *10}`;
      }else {
        a += time;
      }
    }else if(time == 0) {
      a += ':00';
    }else if(time < 10) {
      a += `${time *10}`;
    }else {
      a += time;
    }
    console.log(a, 'timestamp');
    return a;
  }

  return (
    <div className = 'songrow' onClick = {() => playSong(track.id)}>
      <div className = 'index'>
        {index}
      </div>
        <div className = 'song_details'>
        <img className = 'songrow_album' src = {track.album.images[0].url} alt =''/>
        <div className = 'songrow_info'>
            <h1>{track.name}</h1>
            <p>
                {track.artists.map((artist) => artist.name).join(',')}
                {track.album.name}
            </p>
        </div>
        </div>
        <div className = 'track'>
          {track.album.name}
        </div>
        <div className = 'time'>
          {getTime(track.duration_ms)}
        </div>
    </div>
  )
}

export default SongRow