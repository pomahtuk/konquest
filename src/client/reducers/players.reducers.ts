import Player from "../../logic/Player";
import { AddPlayerAction, RemovePlayerAction, ClearPlayersAction, PlayerActionTypes, SetPlayersAction } from "../actions/players.actions";

// const defaultState: Player[] = [new Player("Player One"), new ComputerPlayerEasy("Easy Computer")],
const defaultState: Player[] = [new Player("Player One"), new Player("Player Two")];

function players(state: Player[] = defaultState, action: AddPlayerAction | RemovePlayerAction | ClearPlayersAction | SetPlayersAction): Player[] {
  switch (action.type) {
    case PlayerActionTypes.CLEAR_PLAYERS:
      return [];
    case PlayerActionTypes.SET_PLAYERS:
      return [...action.players];
    case PlayerActionTypes.ADD_PLAYER:
      return [...state, action.player];
    case PlayerActionTypes.REMOVE_PLAYER:
      return [...state.filter((p) => p.id !== action.player.id)];
    default:
      return state;
  }
}

export default players;
