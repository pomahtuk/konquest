import {
  StateGameOptions,
  GameActionTypes,
  StartGameAction,
  AddPlayerTurnAction,
  SetGameOptionsAction,
  AddPlayerAction,
  SetPlanetAction,
  AddPlayerTurnOrderAction
} from "../actions/game.actions";
import ConquestGame, { GameStatus, TurnStatus } from "../../logic/Game";
import Player, { PlayerTurnOrder } from "../../logic/Player";
import Planet, { PlanetMap } from "../../logic/Planet";

export interface GameState {
  isStarted: boolean;
  status: GameStatus;
  winner: Player | null;
  activePlayer?: Player;
  players: Player[];
  planets: PlanetMap;
  gameOptions: StateGameOptions;
  gameStartError: boolean;
  turnError: boolean;
  errorText?: string;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
  currentPlayerOrders: PlayerTurnOrder[];
  currentShipsModifier: { [key: string]: number };
}

const defaultState: GameState = {
  isStarted: false,
  status: GameStatus.NOT_STARTED,
  winner: null,
  players: [],
  planets: {},
  gameOptions: {
    fieldSize: 10,
    neutralPlanetCount: 4
  },
  gameStartError: false,
  turnError: false,
  currentPlayerOrders: [],
  currentShipsModifier: {}
};

let game: ConquestGame;

function konquestGame(
  state: GameState = defaultState,
  action: StartGameAction | AddPlayerTurnAction | SetGameOptionsAction | AddPlayerAction | SetPlanetAction | AddPlayerTurnOrderAction
): GameState {
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
          players: state.players.map((p) => new Player(p.screenName))
        });
        return {
          ...state,
          isStarted: true,
          gameStartError: false,
          status: game.status,
          winner: game.winner,
          players: game.getPlayers(),
          activePlayer: game.getPlayers()[game.waitingForPlayer],
          planets: game.getPlanets(),
          errorText: undefined,
          currentPlayerOrders: [],
          currentShipsModifier: {}
        };
      } catch (e) {
        return {
          ...state,
          gameStartError: true,
          errorText: e.message
        };
      }
    case GameActionTypes.ADD_PLAYER_TURN_ORDER:
      return {
        ...state,
        currentPlayerOrders: [...state.currentPlayerOrders, action.order],
        currentShipsModifier: [...state.currentPlayerOrders, action.order].reduce((acc, order): { [key: string]: number } => {
          acc[order.origin] = (acc[order.origin] || 0) + order.amount;
          return acc;
        }, {})
      };
    case GameActionTypes.ADD_PLAYER_TURN:
      if (game && state.isStarted === true) {
        turnStatus = game.addPlayerTurnData(action.turnData);
        if (turnStatus !== TurnStatus.INVALID) {
          return {
            ...state,
            status: game.status,
            winner: game.winner,
            players: game.getPlayers(),
            activePlayer: game.getPlayers()[game.waitingForPlayer],
            planets: game.getPlanets(),
            turnError: false,
            errorText: undefined,
            currentPlayerOrders: [],
            currentShipsModifier: {}
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
