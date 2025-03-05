import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePicture.css"

const ProfilePicture = () => {
  const [image, setImage] = useState(localStorage.getItem("profilePic") || "avatar.png");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store selected file
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("https://b1-ibcx.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newImageUrl = response.data.imageUrl;
      localStorage.setItem("profilePic", newImageUrl); // Save to localStorage
      setImage(newImageUrl);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="profile-container">
      <label htmlFor="fileInput">
        <img src={image} alt="Profile" className="avatar" />
      </label>
      <input id="fileInput" type="file" onChange={handleFileChange} hidden />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ProfilePicture;
