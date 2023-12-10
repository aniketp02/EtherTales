import { useRef, useState } from "react";
import "../MarketPlace/style.css";
import "./gen.css";
import { NFTStorage } from "nft.storage";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";

const ABI = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string[]", name: "_ipfsHashes", type: "string[]" },
    ],
    name: "createStorybook",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllStorybooks",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "storyLength", type: "uint256" },
        ],
        internalType: "struct StorybookPlatform.StoryInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getIpfsHash",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "storyLength", type: "uint256" },
        ],
        internalType: "struct StorybookPlatform.StoryInfo",
        name: "newStoryInfo",
        type: "tuple",
      },
    ],
    name: "getStorybookDetails",
    outputs: [
      { internalType: "string[]", name: "_ipfsHashes", type: "string[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserStorybooks",
    outputs: [
      {
        components: [
          { internalType: "address", name: "user", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "storyLength", type: "uint256" },
        ],
        internalType: "struct StorybookPlatform.StoryInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserStorybooksCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

export const GenerateStoryContainer = () => {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const client = new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI1MENCYUNlM0NkMDUwMmVDOTRBMTdDNDQxYjk3NWE5MjE3QjJkNzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjA0NDYzNzc4OCwibmFtZSI6IlN0b3J5QmxvY2tzIn0.dtSMCyC0cdNfbQ40ZOZGJmcdgStLqhTov9-WM_hUT08",
  });

  function selectFiles() {
    //@ts-ignore
    fileInputRef.current.click();
  }
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = "0x42437974Bc49D153a8F6a9C1519042554b430763";
  const contractObject = new ethers.Contract(contractAddress, ABI, provider);
  const signer = provider.getSigner();
  //@ts-ignore
  const contractWithSigner = contractObject.connect(signer);
  async function onFileSelect(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      //@ts-ignore
      if (!images.some((e) => e.name === files[i].name)) {
        //@ts-ignore
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index: any) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  const uploadFiles = async () => {
    const uploadedHashes: any = [];

    try {
      await toast.promise(
        Promise.all(
          images.map(async (image) => {
            const response = await fetch(image.url);
            const blobData = await response.blob();
            const result = await client.storeBlob(blobData);
            uploadedHashes.push(JSON.stringify(result));
          })
        ),
        {
          loading: "Uploading Images on Lighthouse",
          success: "Uploaded Successfully",
          error: "Failed Uploading to IPFS",
        }
      );
      await toast.promise(contractWithSigner.createStorybook(uploadedHashes), {
        loading: "Storing Hashes on Chain",
        success: "Stored Successfully",
        error: "Failed",
      });
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
    }
  };

  return (
    <>
      <section
        className="section explore mt-12 px-24 bg-[#121117]"
        style={{ height: "calc(100vh - 3rem)" }}
        id="explore"
      >
        <div
          // onDragOver={onDragOver}
          // onDragLeave={onDragLeave}
          // onDrop={onDrop}
          className="bg-purple-900 h-3/5 bg-opacity-20 rounded-xl border-dotted border-4 border-blue-500 flex flex-col items-center justify-center"
        >
          <div>
            <span className="text-white font-roboto text-4xl font-bold select">
              Drag and Drop Images Here or{" "}
            </span>
            <span
              role="button"
              onClick={selectFiles}
              className="text-white font-roboto text-4xl font-bold select"
            >
              Browse
            </span>
          </div>
          <input
            name="file"
            type="file"
            className="input"
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          ></input>
        </div>
        <div className="cont">
          {images.map((image, index) => (
            <div className="image" key={index}>
              <span onClick={() => deleteImage(index)} className="delete">
                &times;
              </span>
              {
                //@ts-ignore
                <img src={image.url} alt={image.name}></img>
              }
            </div>
          ))}
        </div>
        <form>
          <input
            className="name-btn text-white mt-12 w-full flex flex-row px-4 items-center justify-center text-center"
            type="text"
            placeholder="Name"
          ></input>
          <input
            className="name-btn text-white mt-12 w-full flex flex-row px-4 items-center justify-center text-center"
            type="text"
            placeholder="Price"
          ></input>
          <button
            className="btn mt-12 w-full text-center flex flex-row items-center justify-center"
            type="button"
            onClick={uploadFiles}
          >
            Upload
          </button>
        </form>
      </section>
    </>
  );
};
