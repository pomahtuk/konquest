import Player, { PlayerTurn, PlayerTurnOrder } from "../../logic/Player";
import Planet from "../../logic/Planet";

/*
 * action types
 */
export enum GameActionTypes {
  START_GAME = "START_GAME",
  SET_GAME_OPTIONS = "SET_GAME_OPTIONS",
  ADD_PLAYER_TURN = "ADD_PLAYER_TURN",
  ADD_PLAYER = "ADD_PLAYER",
  SET_ORIGIN_PLANET = "SET_ORIGIN_PLANET",
  SET_DESTINATION_PLANET = "SET_DESTINATION_PLANET",
  ADD_PLAYER_TURN_ORDER = "ADD_PLAYER_TURN_ORDER"
}

export interface StateGameOptions {
  fieldSize: number;
  neutralPlanetCount: number;
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

export interface AddPlayerAction {
  type: typeof GameActionTypes.ADD_PLAYER;
  player: Player;
}

export interface SetPlanetAction {
  type: typeof GameActionTypes.SET_ORIGIN_PLANET | typeof GameActionTypes.SET_DESTINATION_PLANET;
  planet?: Planet;
}

export interface AddPlayerTurnOrderAction {
  type: typeof GameActionTypes.ADD_PLAYER_TURN_ORDER;
  order: PlayerTurnOrder;
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

export function addPlayer(player: Player): AddPlayerAction {
  return { type: GameActionTypes.ADD_PLAYER, player };
}

export function setOriginPlanet(planet?: Planet): SetPlanetAction {
  return { type: GameActionTypes.SET_ORIGIN_PLANET, planet };
}

export function setDestinationPlanet(planet?: Planet): SetPlanetAction {
  return { type: GameActionTypes.SET_DESTINATION_PLANET, planet };
}

export function addPlayerTurnOrder(order: PlayerTurnOrder): AddPlayerTurnOrderAction {
  return { type: GameActionTypes.ADD_PLAYER_TURN_ORDER, order };
}
