import React, { useState, ReactElement, ChangeEvent } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";
import { addPlayer } from "../actions/game.actions";
import PlayersList from "./PlayersList";
import AddPlayer from "./AddPlayer";

interface PlayerSettingsStoreSlice {
  players: Player[];
}

const selectorFunction = (state: GameState): PlayerSettingsStoreSlice => ({
  players: state.players
});

const PlayerSettings = (): ReactElement => {
  const [newPlayerName, setNewPlayerName] = useState("");
  const dispatch = useDispatch();
  // get data from redux
  const { players }: PlayerSettingsStoreSlice = useSelector(selectorFunction, shallowEqual);
  // setup handlers
  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => setNewPlayerName(event.target.value);
  const onAddPlayer = (): void => {
    dispatch(addPlayer(new Player(newPlayerName)));
    setNewPlayerName("");
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
