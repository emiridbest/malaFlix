export const contractAddress= "0x79a4ad75fc5360a25ad09ab4bb2fa9a77d1663ae"; //"0x3491dfb0362f6a923b40246c7c64a0e8f6f372d9" //0x6c432a07d2c7c5abbbbb47e408c5ecc40eea0c4b  //"0x291e6c4a1a834e9ec4bd33ffdb2e7c90680abd5e" //0x3491dfb0362f6a923b40246c7c64a0e8f6f372d9
export const contractAbi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "videoId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "thumbnail",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "CID",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "VideoUploaded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "videoId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "viewer",
				"type": "address"
			}
		],
		"name": "VideoWatched",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "thumbnail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "CID",
				"type": "string"
			}
		],
		"name": "addVideo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "videoId",
				"type": "uint256"
			}
		],
		"name": "watchVideo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllVideos",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userVideos",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "videoList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "thumbnail",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "CID",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "isStreaming",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
