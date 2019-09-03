import React, { ReactElement, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { addPlayer } from "../actions/game.actions";
import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

import Player from "../../logic/Player";
import InputSelect from "./foundations/InputSelect";
import ComputerPlayerEasy from "../../logic/ComputerPlayerEasy";

type PlayerTypeVariant = "normal" | "computer";

const AddPlayer = (): ReactElement => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerType, setNewPlayerType] = useState<PlayerTypeVariant>("normal");
  const dispatch = useDispatch();

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => setNewPlayerName(event.target.value);

  const onTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => setNewPlayerType(event.target.value as PlayerTypeVariant);

  const onAddPlayer = (): void => {
    if (newPlayerName && newPlayerName !== "") {
      dispatch(addPlayer(newPlayerType === "normal" ? new Player(newPlayerName) : new ComputerPlayerEasy(newPlayerName)));
      setNewPlayerName("");
    }
  };

  const playerTypeOptions = [
    {
      text: "Player",
      value: "normal"
    },
    {
      text: "Computer",
      value: "computer"
    }
  ];

  return (
    <React.Fragment>
      <InputText label="Player name" type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" />
      <InputSelect label="Player type" value={newPlayerType} onChange={onTypeChange} options={playerTypeOptions} />

      <Button onClick={onAddPlayer} variant="secondary">
        Add player
      </Button>
    </React.Fragment>
  );
};

export default AddPlayer;
