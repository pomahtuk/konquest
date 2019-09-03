import { createStore, Store, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import konquestGame, { GameState } from "../reducers/game.reducers";
import players from "../reducers/players.reducers";
import Player from "../../logic/Player";

export interface StoreData {
  game: GameState;
  players: Player[];
}

const reducer = combineReducers({
  game: konquestGame,
  players: players
});

const storeCreator = (storeState?: StoreData): Store =>
  /* istanbul ignore next */
  createStore(reducer, storeState, process.browser && process.env.NODE_ENV !== "production" ? composeWithDevTools() : undefined);

export default storeCreator;
