import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectGame } from "../../features/game/gameSlice";
import { resetGame } from "../../features/game/gameSlice";
import "./Scoreboard.css";

export const Scoreboard = () => {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  return (
    <div className="container">
      <h1>Highscores</h1>
      <Button
        variant="primary"
        type="submit"
        onClick={() => dispatch(resetGame())}
      >
        Reset and try again!
      </Button>
      {game.highscores.map((highscore) => {
        return (
          <div className="list-element" key={highscore.id}>
            <span>{highscore.userName}</span>
            <span>{100 / 1 + highscore.errors}</span>
          </div>
        );
      })}
    </div>
  );
};
