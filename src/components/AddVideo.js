import React, { useState } from "react";

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_API_SECRET;

const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [CID, setCID] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [thumbnailCID, setThumbnailCID] = useState("");

  const handleThumbnailChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      setIsUploadingThumbnail(true);
      const data = new FormData();
      data.append("file", selectedFile);
      data.append(
        "pinataOptions",
        JSON.stringify({ wrapWithDirectory: false })
      );

      try {
        const response = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
            body: data,
          }
        );

        console.log("Pinata API Response Status:", response.status);
        const responseData = await response.json();
        console.log("Pinata API Response Data:", responseData);

        if (!response.ok) {
          console.error("Error uploading to Pinata:", responseData.error);
          setIsUploadingThumbnail(false);
          return;
        }

        const thumbnailCID = responseData.IpfsHash;
        setThumbnailCID(thumbnailCID);
        setIsUploadingThumbnail(false);
      } catch (error) {
        console.error("Error uploading to Pinata:", error);
        setIsUploadingThumbnail(false);
      }
    }
  };
  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", selectedFile);
      data.append(
        "pinataOptions",
        JSON.stringify({ wrapWithDirectory: false })
      );

      try {
        const response = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "POST",
            headers: {
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
            body: data,
          }
        );

        console.log("Pinata API Response Status:", response.status);
        const responseData = await response.json();
        console.log("Pinata API Response Data:", responseData);

        if (!response.ok) {
          console.error("Error uploading to Pinata:", responseData.error);
          setIsUploading(false);
          return;
        }

        const newCID = responseData.IpfsHash;
        setCID(newCID);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading to Pinata:", error);
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo(title, description, thumbnailCID, CID);
    setTitle("");
    setDescription("");
    setCID("");
    setThumbnailCID("");
    setSelectedFile(null);
  };

  return (
    <div className="py-2 max-w-7xl mx-auto gap-7 space-y-8 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto px-2">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-black">Upload Video</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              id="thumbnailCID"
              placeholder="thumbnailCID"
              value={
                isUploadingThumbnail
                  ? "Retrieving ThumbnailCID..."
                  : thumbnailCID
              }
              readOnly
            />
            <input
              className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              id="CID"
              placeholder="CID"
              value={isUploading ? "Retrieving CID..." : CID}
              readOnly
            />

            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleThumbnailChange}
            />

            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              type="file"
              accept="video/mp4"
              onChange={handleFileChange}
            />

            <button
              className="w-full bg-red-800 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow-lg transition-all duration-200"
              onClick={handleSubmit}
              disabled={isUploading || !thumbnailCID || !CID}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
