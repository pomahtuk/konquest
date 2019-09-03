import { StoreData } from "../stores/game.store";

const rootGameSelector = (state: StoreData) => state.game;

export default rootGameSelector;
