import { Link } from "react-router-dom";
import { Card } from "./Card";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { walletAddressState } from "../../atoms/atoms";

export const MarketContainer = () => {
  const walletAddress = useRecoilValue(walletAddressState);
  const [cards, setCards] = useState([
    {
      id: 1,
      owner: "0x61a9A07...",
      name: "Aniket's Story",
      src: "src\\assets\\book.png",
      price: "0.00154",
      visible: true,
    },
    {
      id: 2,
      owner: "0x927032C...",
      name: "Devaansh's Story",
      src: "src\\assets\\auction-3.jpg",
      price: "0.00156",
      visible: true,
    },
  ]);

  useEffect(() => {
    console.log(walletAddress);
    getFilesFromIPFS();
  }, []);

  const getFilesFromIPFS = async () => {
    console.log("Hii");
    const response = await axios.get(
      "https://nftstorage.link/ipfs/bafybeidkkjewu2gy7y6k7vzh42hq4y5nf54sp7hnjgbtdxgwyktctlxfji/auction-3.jpg"
    );
  };
  const handleCardBuy = (cardId: number) => {
    // Perform the buy action and then update card visibility
    // For example:
    // Call buyCard function and then update the state to hide the card

    // Here, I'm simulating the change in visibility by filtering out the bought card
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, visible: false } : card
    );
    setCards(updatedCards);
  };

  return (
    <>
      <section
        className="section explore mt-12 px-24 bg-[#121117]"
        style={{ height: "calc(100vh - 3rem)" }}
        id="explore"
      >
        <div className="container">
          <div className="title-wrapper">
            <h2 className="h2 section-title">Live Auctions</h2>

            <button className="btn">
              <Link to={"/stories"}>
                <span>Your Stories</span>
              </Link>
            </button>
          </div>
        </div>
        <ul className="grid-list">
          {cards.map((card) =>
            card.visible ? (
              <Card
                key={card.id}
                owner={card.owner}
                name={card.name}
                src={card.src}
                price={card.price}
                onBuy={() => handleCardBuy(card.id)}
              />
            ) : null
          )}
        </ul>
      </section>
    </>
  );
};
