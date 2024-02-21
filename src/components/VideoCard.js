import React, { useState } from "react";
import Image from "next/image";
import VideoModal from "./VideoModal";

const VideoCard = ({ videoItem, handleWatchVideo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="bg-black rounded-md overflow-hidden shadow-md"
        style={{
          width: "300px",
          height: "200px",
          position: "relative",
        }}
      >
        <Image
          src={videoItem.thumbnail}
          alt="Video Thumbnail"
          width="300"
          height= "200"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex items-end px-4 pb-4"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          }}
        >
          <button
            onClick={() => handleWatchVideo(videoItem)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            style={{
              transition: "opacity 0.2s",
            }}
          >
            Stream
          </button>
        </div>
      </div>
      <div className="mt-2 text-white">
        <h2 className="text-lg font-semibold">{videoItem.title}</h2>
        <p className="text-sm">{videoItem.description}</p>
        <p className="text-sm"> {videoItem.creator}</p>
      </div>
      {isModalOpen && (
        <VideoModal
          videoURL={videoItem.VideoURL}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default VideoCard;
