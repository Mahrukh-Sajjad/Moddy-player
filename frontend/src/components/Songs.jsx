import React, { useState } from "react";
import "./Songs.css";
const MoodSongs = ({ songs }) => {
  return (
    <div className="mood-songs">
      <h2 style={{ color: " rgb(192, 194, 196)" }}>Recommended Songs</h2>

      {songs.map((song, index) => (
        <div key={index} className="song">
          <div className="title">
            <h3 style={{ color: " rgb(192, 194, 196)" }}>{song.title}</h3>
            <p style={{ color: " rgb(192, 194, 196)" }}>{song.artist}</p>
          </div>
          <div className="play-pause-button">
            <audio src={song.audio} controls></audio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodSongs;
