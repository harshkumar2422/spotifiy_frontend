import React, { useState } from "react";
import "./createSong.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateSong = () => {
  const navigate = useNavigate();
  const [posterFile, setPosterFile] = useState(null);
  const [songName, setSongName] = useState("");
  const [songFile, setSongFile] = useState(null);

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    setPosterFile(file);
  };

  const handleSongNameChange = (event) => {
    const name = event.target.value;
    setSongName(name);
  };

  const handleSongFileChange = (event) => {
    const file = event.target.files[0];
    setSongFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create FormData object for poster
      const posterFormData = new FormData();
      posterFormData.append("file", posterFile);
      console.log("processing 1");

      // Post poster to create it
      const posterResponse = await axios.post(
        "http://localhost:4000/api/v1/addPoster",
        posterFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Extract posterId from the response
      const posterId = posterResponse.data.poster._id;
      console.log("POster created successfully");
      // Create FormData object for song with posterId
      const songFormData = new FormData();
      songFormData.append("songname", songName);
      songFormData.append("file", songFile);
      songFormData.append("posterId", posterId);

      console.log("processing2.....");

      // Post song with posterId
      const songResponse = await axios.post(
        "http://localhost:4000/api/v1/addSong",
        songFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (songResponse.data.success === "true") {
        navigate("/");
      }
      console.log("Song created successfully:", songResponse.data.success);
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  return (
    <>
      <h2>Create Song</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="poster">Poster:</label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={handlePosterChange}
            required
          />
        </div>
        <div>
          <label htmlFor="songName">Song Name:</label>
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={handleSongNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="song">Song:</label>
          <input
            type="file"
            id="song"
            accept="audio/*"
            onChange={handleSongFileChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateSong;
