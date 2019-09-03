import { createStore, Store, combineReducers } from "redux";
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

const storeCreator = (storeState?: StoreData): Store =>
  /* istanbul ignore next */
  createStore(reducer, storeState, process.browser && process.env.NODE_ENV !== "production" ? composeWithDevTools() : undefined);

export default storeCreator;
