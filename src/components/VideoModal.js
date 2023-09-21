import React, { useState } from "react";

const VideoModal = ({ videoURL, onClose }) => {
  const [src, setSrc] = useState("");
  if (videoURL) {
    console.log(videoURL);
  }
  return (
    <div className="video-modal">
      <video controls autoPlay>
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default VideoModal;
