import Player from "../../logic/Player";

export enum PlayerActionTypes {
  ADD_PLAYER = "ADD_PLAYER",
  REMOVE_PLAYER = "REMOVE_PLAYER",
  CLEAR_PLAYERS = "CLEAR_PLAYERS"
}

export interface AddPlayerAction {
  type: typeof PlayerActionTypes.ADD_PLAYER;
  player: Player;
}

export interface RemovePlayerAction {
  type: typeof PlayerActionTypes.REMOVE_PLAYER;
  player: Player;
}

export interface ClearPlayersAction {
  type: typeof PlayerActionTypes.CLEAR_PLAYERS;
}

// action creators
export function addPlayer(player: Player): AddPlayerAction {
  return { type: PlayerActionTypes.ADD_PLAYER, player };
}

export function removePlayer(player: Player): RemovePlayerAction {
  return { type: PlayerActionTypes.REMOVE_PLAYER, player };
}

export function clearPlayers(): ClearPlayersAction {
  return { type: PlayerActionTypes.CLEAR_PLAYERS };
}
