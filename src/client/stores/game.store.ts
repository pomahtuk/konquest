import { createStore, Store, combineReducers, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import konquestGame, { GameState } from "../reducers/game.reducers";
import players from "../reducers/players.reducers";
import Player from "../../logic/Player";
import turn, { TurnStoreData } from "../reducers/turn.reducers";

export interface StoreData {
  game: GameState;
  players: Player[];
  turn: TurnStoreData;
}

const reducer = combineReducers({
  game: konquestGame,
  players: players,
  turn: turn
});

let composer: StoreEnhancer<{}, {}> | undefined = undefined;
/* istanbul ignore next */
if (process.browser && process.env.NODE_ENV !== "production") {
  composer = composeWithDevTools();
}

const storeCreator = (storeState?: StoreData): Store => createStore(reducer, storeState, composer);

export default storeCreator;
