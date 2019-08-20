import { StateGameOptions } from "../actions/game.actions";
import Player from "../../logic/Player";
import { GameState } from "../reducers/game.reducers";

export interface SettingsStoreSlice {
  gameOptions: StateGameOptions;
  players: Player[];
}

const gameSettingsSelectorFunction = (state: GameState): SettingsStoreSlice => ({
  gameOptions: state.gameOptions,
  players: state.players
});

export default gameSettingsSelectorFunction;
