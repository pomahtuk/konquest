import React, { ReactElement, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { addPlayer } from "../actions/game.actions";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

import Player from "../../logic/Player";

const AddPlayer = (): ReactElement => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const dispatch = useDispatch();

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => setNewPlayerName(event.target.value);

  const onAddPlayer = (): void => {
    if (newPlayerName && newPlayerName !== "") {
      dispatch(addPlayer(new Player(newPlayerName)));
      setNewPlayerName("");
    }
  };

  return (
    <React.Fragment>
      <InputText label="Player name" type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" />
      <Button onClick={onAddPlayer} variant="secondary">
        Add player
      </Button>
    </React.Fragment>
  );
};

export default AddPlayer;
