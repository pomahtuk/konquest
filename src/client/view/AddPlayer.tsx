import React, { ReactElement, ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "./foundations/Button";
import InputText from "./foundations/InputText";

import InputSelect from "./foundations/InputSelect";
import { addPlayer } from "../actions/players.actions";
import { ComputerPlayerType } from "../../logic/ComputerPlayer";
import playerMapper from "../../logic/helpers/playerMapper";

type PlayerTypeVariant = "human" | ComputerPlayerType;

const AddPlayer = (): ReactElement => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerType, setNewPlayerType] = useState<PlayerTypeVariant>("human");
  const dispatch = useDispatch();

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => setNewPlayerName(event.target.value);

  const onTypeChange = (event: ChangeEvent<HTMLSelectElement>): void => setNewPlayerType(event.target.value as PlayerTypeVariant);

  const onAddPlayer = (): void => {
    if (newPlayerName && newPlayerName !== "") {
      const newPlayer = playerMapper({
        screenName: newPlayerName,
        isComputer: newPlayerType !== "human",
        computerType: newPlayerType as ComputerPlayerType
      });
      dispatch(addPlayer(newPlayer));
      setNewPlayerName("");
    }
  };

  const playerTypeOptions = [
    {
      text: "Player",
      value: "human"
    },
    {
      text: "Computer Easy",
      value: ComputerPlayerType.EASY
    },
    {
      text: "Computer Normal (Offensive)",
      value: ComputerPlayerType.NORMAL
    },
    {
      text: "Computer Hard (Defensive)",
      value: ComputerPlayerType.HARD
    }
  ];

  return (
    <React.Fragment>
      <InputText label="Player name" type="text" value={newPlayerName} onChange={onNameChange} placeholder="Player name" data-testid="playerName" />
      <InputSelect label="Player type" value={newPlayerType} onChange={onTypeChange} options={playerTypeOptions} data-testid="playerType" />

      <Button onClick={onAddPlayer}>Add player</Button>
    </React.Fragment>
  );
};

export default AddPlayer;
