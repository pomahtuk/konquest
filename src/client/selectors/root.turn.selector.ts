import { StoreData } from "../stores/game.store";
import { TurnStoreData } from "../reducers/turn.reducers";

const rootTurnSelector = (state: StoreData): TurnStoreData => state.turn;

export default rootTurnSelector;
