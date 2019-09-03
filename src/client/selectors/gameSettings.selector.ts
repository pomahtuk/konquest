import { createSelector } from "reselect";

import { StateGameOptions } from "../actions/game.actions";
import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";
import rootGameSelector from "./root.game.selector";
import rootPlayersSelector from "./root.players.selector";

export interface SettingsStoreSlice {
  gameOptions: StateGameOptions;
  players: Player[];
}

const gameSettingsSelectorFunction = (game: GameState, players: Player[]): SettingsStoreSlice => ({
  gameOptions: game.gameOptions,
  players
});

const gameSettingsSelector = createSelector(
  rootGameSelector,
  rootPlayersSelector,
  gameSettingsSelectorFunction
);

export default gameSettingsSelector;
