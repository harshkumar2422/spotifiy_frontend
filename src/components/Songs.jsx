import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/Songs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [initialClick, setInitialClick] = useState(false); // New state to track initial click

  const getSong = async () => {
    try {
      const { data } = await axios.get(
        "https://spotify-backend-pq7x.onrender.com/api/v1/Songs"
      );
      setSongs(data.songs);
      console.log("data",data)
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getSong();
  }, []);

  const playButtonHandler = (e, index) => {
    e.preventDefault();
    if (!initialClick) {
      setIsPlaying(true); // Start playing on initial click
      setInitialClick(true); // Set initial click to true
    } else {
      if (currentTrackIndex === index) {
        setIsPlaying(!isPlaying); // Toggle play/pause
      } else {
        setCurrentTrackIndex(index);
        setIsPlaying(true); // Start playing the new track
      }
    }
  };

  const handleSongEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  return (
    <div>
      <div className="Container">
        <h2>All Songs playlist</h2>
        <div className="cards">
          {songs?.map((i, index) => (
            <div key={i._id} className="card">
              <div className="poster">
                <img src={i.poster.url} alt="card" />
                <FontAwesomeIcon 
                  onClick={(e) => playButtonHandler(e, index)}
                  icon={
                    currentTrackIndex === index && isPlaying
                      ? faPauseCircle
                      : faCirclePlay
                  }
                  className="fa-icon play"
                  size="2x"
                  style={{ color: "#63E6BE" }}
                />
              </div>
              <span>
                {i.songname}
                <p>artist name: "aditya Rikhari"</p>
              </span>
            </div>
          ))}
          {songs.length > 0 && (
            <AudioPlayer
              className="player"
              autoPlay={initialClick && isPlaying} // Set autoPlay based on initial click and isPlaying state
              src={songs[currentTrackIndex].song.url}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleSongEnd}
              style={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
              // other props here
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Songs;
