"use client";
import React, { useState, useEffect, useCallback } from "react";
import SuperfluidWidget from "@superfluid-finance/widget";
import superTokenList from "@superfluid-finance/tokenlist";
import { WagmiConfig } from "wagmi";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Web3 from "web3";
import { contractAddress, contractAbi } from "../abi/malaFlix";
import { wagmiConfig, chains } from "../components/wagmi";
import { client, getOwnedBy } from "../components/utils";
import productDetails from "../components/productDetails";
import paymentDetails from "../components/paymentDetails";
import AddVideo from "../components/AddVideo";
import VideoCard from "../components/VideoCard";
import { Footer, Sidebar, Header, VideoModal } from "../components/Index";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [existingLensWallet, setExistingLensWallet] = useState("");
  const [nonExistingLensWallet, setNonExistingLensWallet] = useState("");
  const [lensHandleExists, setLensHandleExists] = useState("");
  const [video, setVideos] = useState([]);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [play, setPlay] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoItem, setModalVideoItem] = useState(null); // Define modalVideoItem

  useEffect(() => {
    async function checkIfWalletIsConnected() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      } else {
        console.log("MetaMask extension not found.");
      }
    }
  
    checkIfWalletIsConnected();
  }, []);
  
  const initializeWeb3 = useCallback (async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        setContract(contract);
      } catch (error) {
        console.error("Error initializing web3:", error);
      }
    } else {
      console.log("MetaMask extension not found.");
    }
  }, []);

  useEffect(() => {
    if(account){
    initializeWeb3();}
  }, [account, initializeWeb3]);

  async function fetchProfile() {
    try {
      const response = await client.query({
        query: getOwnedBy,
        variables: {
          address: walletAddress,
        },
      });

      if (response.data.defaultProfile == null) {
        setLensHandleExists("false");
        setNonExistingLensWallet(walletAddress);
        setExistingLensWallet("");
      } else {
        setLensHandleExists("true");
        setExistingLensWallet(walletAddress);
        setNonExistingLensWallet("");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  }

  const handleChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleSubmit = async () => {
    document.querySelector("#inputField").value = "";
    fetchProfile();
  };

  const customPaymentDetails = paymentDetails.paymentOptions.map((option) => {
    return {
      ...option,
      receiverAddress: existingLensWallet,
    };
  });

  const fetchVideoList = useCallback(async () => {
    if (account && contract){
    try {
      const videoIds = await contract.methods.getAllVideos().call();

      const formattedVideos = [];

      for (const videoIdBN of videoIds) {
        const videoIdString = videoIdBN.toString();
        const videoId = parseInt(videoIdString);
        console.log("Real video IDs:", videoId);

        const videoDetail = await contract.methods.videoList(videoId).call();
        formattedVideos.push({ ...videoDetail, key: videoId });
        console.log("Raw video IDs:", videoDetail);
        setVideos(formattedVideos);
      }
    } catch (error) {
      console.error("Error fetching video list:", error);
    }
  }},[account, contract]);


  useEffect(() => {
    fetchVideoList();
  }, [fetchVideoList]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleWatchVideo = useCallback(async (videoItem) => {
    try {
      if (videoItem.creator) {
        console.log(videoItem.creator);
        setWalletAddress(videoItem.creator);
      }

      if (!play) {
        fetchProfile();
      }
      if (play && videoItem.videoURL) {
        console.log(videoItem.videoURL);
        setModalVideoItem(videoItem.videoURL);
        setIsModalOpen(true);
      }

      // Call your existing functions to check Lens Protocol
    } catch (error) {
      console.error("Error watching video:", error);
    }
  });
  useEffect(() => {
    if (play) {
      handleWatchVideo();
    }
  }, [handleWatchVideo, play]);
  async function addVideo(title, description, thumbnail, CID) {
    try {
      console.log(title, description, thumbnail, CID);

      if (!contract || !account) {
        console.error(
          "Contract or account not available. Make sure you are connected to MetaMask."
        );
        return;
      }

      const tx = await contract.methods.addVideo(
        title,
        description,
        thumbnail,
        CID
      );

      // Send the transaction
      const txResponse = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: contractAddress,
            data: tx.encodeABI(),
          },
        ],
      });
      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();

      if (receipt.status === 1) {
        console.log("Video uploaded successfully!");
        fetchVideoList(); // Refresh the video list after upload
      } else {
        console.error("Transaction failed.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  }

  return (
    <main className="container mx-auto p-1">
      <Header />
      <div>
        <Sidebar />
        {isModalOpen && modalVideoItem && (
          <VideoModal
            videoURL={modalVideoItem}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-10 ">
          {video.map((videoItem) => (
            <VideoCard
              key={videoItem.id}
              videoItem={{
                title: videoItem.title,
                description: videoItem.description,
                creator: videoItem.creator,
                thumbnail: `https://gateway.pinata.cloud/ipfs/${videoItem.thumbnail}`,
                videoURL: `https://gateway.pinata.cloud/ipfs/${videoItem.CID}`,
                id: videoItem.id,
              }}
              handleWatchVideo={handleWatchVideo}
            />
          ))}
        </div>
        <div />
      </div>
      <section className="hidden">
        <section className="w-1/2 ml-10">
          <input
            className="w-2/3 h-10 mr-4 pl-2 text-black outline-none border-[#54b840] border-2 rounded-lg"
            type="text"
            id="inputField"
            name="inputField"
            maxLength="120"
            required
            onChange={handleChange}
          />
          <button
            className="bg-[#54b840] hover:bg-[#52aa41] w-1/8 h-10 px-10 outline-none border-none rounded-lg cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
        <section className="w-1/2 text-black pr-10">
          <section className="text-black">
            {lensHandleExists === "true" && (
              <section className="text-black">
                <h2>
                  <span className="font-medium">{existingLensWallet}</span> has
                  a Lens handle. You can start a stream
                </h2>
              </section>
            )}
            {lensHandleExists === "false" && (
              <section>
                {nonExistingLensWallet} does not have a Lens handle
              </section>
            )}
          </section>
        </section>
      </section>
      <section className="h-20 flex justify-center items-center mt-6 mx-10">
        {lensHandleExists === "true" && (
          <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
              <ConnectButton.Custom>
                {({ openConnectModal, connectModalOpen }) => {
                  const walletManager = {
                    open: async () => openConnectModal(),
                    isOpen: connectModalOpen,
                  };
                  return (
                    <section>
                      <SuperfluidWidget
                        productDetails={productDetails}
                        paymentDetails={{
                          paymentOptions: customPaymentDetails,
                        }}
                        tokenList={superTokenList}
                        type="dialog"
                        walletManager={walletManager}
                        eventListeners={{
                          onSuccess: () => {
                            setPlay(true);
                          },
                        }}
                      >
                        {({ openModal }) => (
                          <button
                            onClick={() => {
                              openModal();
                            }}
                            className="bg-red-600 hover:bg-red-500 h-16 px-12 font-medium outline-none border-none rounded-full cursor-pointer"
                          >
                            Start Stream
                          </button>
                        )}
                      </SuperfluidWidget>
                    </section>
                  );
                }}
              </ConnectButton.Custom>
            </RainbowKitProvider>
          </WagmiConfig>
        )}
      </section>
      <AddVideo addVideo={addVideo} />

      <Footer />
    </main>
  );
}
