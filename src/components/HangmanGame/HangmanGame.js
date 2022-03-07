import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useStopwatch } from "react-timer-hook";
import {
  selectGame,
  fetchTextAsync,
  addToRevealedCharacters,
  incrementMistakeCount,
  fetchHighScoresAsync,
  setGameState,
} from "../../features/game/gameSlice";
import "./HangmanGame.css";
import { gameState } from "../../types/gameState";
import { Form, Button, Card } from "react-bootstrap";
import { postScore } from "../../service/hangmanAPIService";

export const HangmanGame = () => {
  const game = useSelector(selectGame);
  const dispatch = useDispatch();
  const [formattedText, setFormattedText] = useState("");
  const [guess, setGuess] = useState("");
  const { seconds, minutes } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    dispatch(fetchTextAsync());
  }, []);

  useEffect(() => {
    hideLetters();
  }, [game.revealedCharacters, game.gameText]);

  const handleGuess = (guessedChar) => {
    if (guessedChar === "") return;
    if (isInterpunction(guessedChar)) return;
    if (game.revealedCharacters.includes(guessedChar)) {
      alert("You tried this one already.");
      return;
    }
    if (game.gameText.toLocaleLowerCase().includes(guessedChar)) {
      dispatch(addToRevealedCharacters(guessedChar));
    } else {
      dispatch(incrementMistakeCount());
      dispatch(addToRevealedCharacters(guessedChar));
    }
    setGuess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.value !== undefined) handleGuess(e.target.value);
  };

  const isInterpunction = (char) => {
    return (
      char === " " ||
      char === "," ||
      char === "!" ||
      char === "%" ||
      char === ":" ||
      char === ";" ||
      char === "?" ||
      char === "." ||
      char === "'"
    );
  };

  const checkIfDone = async (text) => {
    if (!text.includes("_") && text !== "") {
      await calculateScore();
      dispatch(fetchHighScoresAsync());
      dispatch(setGameState(gameState.SCOREBOARD));
      return;
    } else return;
  };

  const calculateScore = async () => {
    const score =
      game.gameText.length / (seconds + minutes * 60) - game.mistakesCount * 10;
    await postScore(
      game.quoteId,
      game.gameText.length,
      123,
      game.name,
      game.mistakesCount,
      seconds + minutes * 60
    );
  };

  const hideLetters = () => {
    var formatted = game.gameText;
    for (var i = 0; i < formatted.length; i++) {
      if (
        !game.revealedCharacters.includes(
          formatted.charAt(i).toLocaleLowerCase()
        ) &&
        !isInterpunction(formatted.charAt(i))
      ) {
        formatted = formatted.replace(formatted.charAt(i), "_");
      }
    }
    setFormattedText(formatted);
    checkIfDone(formatted);
  };

  return (
    <div>
      <div className="row">
        <h2>{formattedText}</h2>
      </div>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formGuess">
          <Form.Control
            type="text"
            placeholder="Enter your guess"
            value={guess}
            onChange={(e) =>
              setGuess(e.target.value.charAt(e.target.value.length - 1))
            }
            className="aaa"
          />
          <Button
            variant="primary"
            type="submit"
            onClick={() => handleGuess(guess.toLocaleLowerCase())}
          >
            Guess
          </Button>
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-around">
        <Card className="p-5">{game.mistakesCount} mistakes</Card>
        <Card className="p-5">
          <span>{minutes} minutes </span>
          <span>{seconds} seconds</span>
        </Card>
      </div>
    </div>
  );
};
