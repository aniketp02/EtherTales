import { Link } from "react-router-dom";
import { Card } from "../MarketPlace/Card";
import "../MarketPlace/style.css";

export const StoriesContainer = () => {
  return (
    <>
      <section
        className="section explore mt-12 px-24 bg-[#121117]"
        style={{ height: "calc(100vh - 3rem)" }}
        id="explore"
      >
        <div className="container">
          <div className="title-wrapper">
            <h2 className="h2 section-title">Your Stories</h2>

            <button className="btn">
              <Link to={"/generate-story"}>
                <span>Generate Story</span>
              </Link>
            </button>
          </div>
        </div>
        <div className="bg-purple-900 bg-opacity-20 w-full py-20 px-24 h-4/5 rounded-lg overflow-y-auto">
          <ul className="grid-list">
            <li>
              <Card
                owner="0x61a9A07..."
                src="src\assets\book.png"
                name="Aniket's Story"
                price="0.00154"
              />
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};
