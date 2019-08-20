import React, { useState, ReactElement, ChangeEvent } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { addPlayer } from "../actions/game.actions";
import playerSettingsSelectorFunction, { PlayerSettingsStoreSlice } from "../selectors/playerSettings.selector";

import Player from "../../logic/Player";

import PlayersList from "./PlayersList";
import AddPlayer from "./AddPlayer";

const PlayerSettings = (): ReactElement => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const dispatch = useDispatch();
  // get data from redux
  const { players }: PlayerSettingsStoreSlice = useSelector(playerSettingsSelectorFunction, shallowEqual);
  // setup handlers
  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => setNewPlayerName(event.target.value);
  const onAddPlayer = (): void => {
    if (newPlayerName && newPlayerName !== "") {
      dispatch(addPlayer(new Player(newPlayerName)));
      setNewPlayerName("");
    }
  };

  return (
    <div>
      <h1>Players:</h1>
      <PlayersList players={players} />
      <AddPlayer newPlayerName={newPlayerName} onNameChange={onNameChange} onAddPlayer={onAddPlayer} />
    </div>
  );
};

export default PlayerSettings;
