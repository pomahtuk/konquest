import { GameState } from "../reducers/game.reducers";
import Player from "../../logic/Player";

export interface PlayerSettingsStoreSlice {
  players: Player[];
}

const playerSettingsSelectorFunction = (state: GameState): PlayerSettingsStoreSlice => ({
  players: state.players
});

export default playerSettingsSelectorFunction;
