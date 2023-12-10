import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import { MarketPlace } from "./Pages/MarketPlace";
import { UserStories } from "./Pages/UserStories";
import { GenerateStories } from "./Pages/GenerateStories";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<MarketPlace />} />
            <Route path="/stories" element={<UserStories />} />
            <Route path="/generate-story" element={<GenerateStories />} />
          </Routes>
          <Toaster />
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
