import { StoreData } from "../stores/game.store";
import { GameState } from "../reducers/game.reducers";

const rootGameSelector = (state: StoreData): GameState => state.game;

export default rootGameSelector;
