import Player, { PlayerTurn } from "../../logic/Player";

/*
 * action types
 */
export enum GameActionTypes {
  START_GAME = "START_GAME",
  SET_GAME_OPTIONS = "SET_GAME_OPTIONS",
  ADD_PLAYER_TURN = "ADD_PLAYER_TURN"
}

export interface StateGameOptions {
  fieldSize: number;
  neutralPlanetCount: number;
  players: Player[];
}

export interface StartGameAction {
  type: typeof GameActionTypes.START_GAME;
}

export interface SetGameOptionsAction {
  type: typeof GameActionTypes.SET_GAME_OPTIONS;
  gameOptions: StateGameOptions;
}

export interface AddPlayerTurnAction {
  type: typeof GameActionTypes.ADD_PLAYER_TURN;
  turnData: PlayerTurn;
}
/*
 * action creators
 */
export function startGame(): StartGameAction {
  return { type: GameActionTypes.START_GAME };
}

export function setGameOptions(gameOptions: StateGameOptions): SetGameOptionsAction {
  return { type: GameActionTypes.SET_GAME_OPTIONS, gameOptions };
}

export function addPlayerTurn(turnData: PlayerTurn): AddPlayerTurnAction {
  return { type: GameActionTypes.ADD_PLAYER_TURN, turnData };
}
