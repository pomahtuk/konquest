import { StoreData } from "../stores/game.store";
import Player from "../../logic/Player";

const rootPlayersSelector = (state: StoreData): Player[] => state.players;

export default rootPlayersSelector;
