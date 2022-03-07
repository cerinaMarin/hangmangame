import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setGameState, setName } from "../../features/game/gameSlice";
import { gameState } from "../../types/gameState";
import "./NameInput.css";

export const NameInput = () => {
  const [nameInput, setNameInput] = useState("");
  const dispatch = useDispatch();

  const handleSaveName = () => {
    if (nameInput === "") return;
    dispatch(setName(nameInput));
    dispatch(setGameState(gameState.PLAYING));
  };

  return (
    <div>
      <h1>Welcome to the Hangman Game!</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUserName">
          <div>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={nameInput}
              className="input-lg"
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
        </Form.Group>
        <button
          variant="primary"
          className="start"
          onClick={() => handleSaveName()}
        >
          Submit
        </button>
      </Form>
    </div>
  );
};
