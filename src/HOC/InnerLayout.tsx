import { ethers } from "ethers";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { walletAddressState } from "../atoms/atoms";
import { useNavigate } from "react-router-dom";
import "../Components/MarketPlace/style.css";
interface OuterLayoutProps {
  children: ReactNode;
}
export const InnerLayout = ({ children }: OuterLayoutProps) => {
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState);
  const history = useNavigate();
  // Helper Functions

  // Requests access to the user's META MASK WALLET
  // https://metamask.io
  async function requestAccount() {
    console.log("Requesting account...");
    //@ts-ignore
    if (window.ethereum) {
      console.log("detected");

      try {
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(walletAddress);
        history("/generate-story");
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    //@ts-ignore
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <>
      <header className="header px-16" data-header>
        <div className="container">
          <div className="overlay" data-overlay></div>

          <a href="#" className="logo">
            <span className="text-white text-6xl underline underline-offset-4 font-bold">
              StoryBlocks
            </span>
          </a>

          <nav className="navbar" data-navbar>
            <div className="navbar-top">
              <p className="navbar-title">Menu</p>
            </div>
          </nav>

          <button
            className="menu-open-btn"
            aria-label="Open Menu"
            data-nav-open-btn
          ></button>
          <button
            onClick={() => {
              history("/home");
            }}
            className="btn"
            aria-labelledby="wallet"
          >
            <span id="wallet">Auction</span>
          </button>
          <button
            onClick={() => {
              history("/generate-story");
            }}
            className="btn"
            aria-labelledby="wallet"
          >
            <span id="wallet">Create Story</span>
          </button>
          <button
            onClick={() => {
              history("/stories");
            }}
            className="btn"
            aria-labelledby="wallet"
          >
            <span id="wallet">Your Stories</span>
          </button>
          {walletAddress ? (
            <button className="btn" aria-labelledby="wallet">
              <span id="wallet">{walletAddress.slice(0, 10)}...</span>
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="btn"
              aria-labelledby="wallet"
            >
              <span id="wallet">Connect With Metamask</span>
            </button>
          )}
        </div>
      </header>
      {children}
    </>
  );
};
