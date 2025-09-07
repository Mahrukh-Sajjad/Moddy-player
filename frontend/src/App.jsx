import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import FacialExpressions from "./components/FacialExpressions";
import "./App.css";
import MoodSongs from "./components/Songs";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <>
      <FacialExpressions setSongs={setSongs} />
      <MoodSongs songs={songs} />
    </>
  );
}

export default App;
