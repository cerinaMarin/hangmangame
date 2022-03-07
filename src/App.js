import React from "react";
import { HangmanGame } from "./components/HangmanGame/HangmanGame";
import "./App.css";
import { NameInput } from "./components/NameInput/NameInput";
import { useSelector } from "react-redux";
import { selectGame } from "./features/game/gameSlice";
import { gameState } from "./types/gameState";
import { Scoreboard } from "./components/Scoreboard/Scoreboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const currentGameState = useSelector(selectGame);

  const renderGameState = () => {
    switch (currentGameState.gameState) {
      case gameState.NAME_INPUT:
        return <NameInput />;
      case gameState.PLAYING:
        return <HangmanGame />;

      case gameState.SCOREBOARD:
        return <Scoreboard />;

      default:
        break;
    }
  };

  return (
    <div className="App">
      <header className="App-header">{renderGameState()}</header>
    </div>
  );
}

export default App;
