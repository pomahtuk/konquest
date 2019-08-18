import {
  StateGameOptions,
  GameActionTypes,
  StartGameAction,
  AddPlayerTurnAction,
  SetGameOptionsAction,
  AddPlayerAction,
  SetPlanetAction
} from "../actions/game.actions";
import ConquestGame, { GameStatus, TurnStatus } from "../../logic/Game";
import Player from "../../logic/Player";
import Planet from "../../logic/Planet";

export interface GameState {
  isStarted?: boolean;
  status?: GameStatus;
  winner: Player | null;
  activePlayer?: Player;
  players: Player[];
  gameOptions: StateGameOptions;
  game?: ConquestGame;
  gameStartError: boolean;
  turnError: boolean;
  errorText?: string;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
}

const defaultState: GameState = {
  isStarted: false,
  status: GameStatus.NOT_STARTED,
  winner: null,
  players: [],
  gameOptions: {
    fieldSize: 10,
    neutralPlanetCount: 4
  },
  gameStartError: false,
  turnError: false
};

function konquestGame(
  state: GameState = defaultState,
  action: StartGameAction | AddPlayerTurnAction | SetGameOptionsAction | AddPlayerAction | SetPlanetAction
): GameState {
  let game: ConquestGame;
  let turnStatus: TurnStatus;
  switch (action.type) {
    case GameActionTypes.SET_GAME_OPTIONS:
      return {
        ...state,
        gameOptions: {
          ...state.gameOptions,
          ...action.gameOptions
        }
      };
    case GameActionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player]
      };
    case GameActionTypes.START_GAME:
      try {
        game = new ConquestGame({
          fieldHeight: state.gameOptions.fieldSize,
          fieldWidth: state.gameOptions.fieldSize,
          neutralPlanetCount: state.gameOptions.neutralPlanetCount,
          players: state.players
        });
        return {
          ...state,
          game,
          isStarted: true,
          gameStartError: false,
          status: game.status,
          winner: game.winner,
          activePlayer: game.getPlayers()[game.waitingForPlayer],
          errorText: undefined
        };
      } catch (e) {
        return {
          ...state,
          gameStartError: true,
          errorText: e.message
        };
      }
    case GameActionTypes.ADD_PLAYER_TURN:
      if (state.game && state.isStarted === true) {
        turnStatus = state.game.addPlayerTurnData(action.turnData);
        if (turnStatus !== TurnStatus.INVALID) {
          return {
            ...state,
            status: state.game.status,
            winner: state.game.winner,
            activePlayer: state.game.getPlayers()[state.game.waitingForPlayer],
            turnError: false,
            errorText: undefined
          };
        } else {
          return {
            ...state,
            turnError: true,
            errorText: "Turn data invalid"
          };
        }
      } else {
        return {
          ...state,
          turnError: true,
          errorText: "Game not started"
        };
      }
    case GameActionTypes.SET_ORIGIN_PLANET:
      return {
        ...state,
        originPlanet: action.planet
      };
    case GameActionTypes.SET_DESTINATION_PLANET:
      return {
        ...state,
        destinationPlanet: action.planet
      };
    default:
      return state;
  }
}

export default konquestGame;
