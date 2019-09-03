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
import Fleet from "../../logic/Fleet";

export interface GameState {
  iteration: number;
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
  currentPlayerFleets: ArrivingFleet[];
}

export interface ArrivingFleet {
  arrivingIn: number;
  destination: string;
  killPercent: number;
  amount: number;
}

const defaultState: GameState = {
  iteration: 0,
  isStarted: false,
  status: GameStatus.NOT_STARTED,
  winner: null,
  players: [new Player("Player One"), new Player("Player Two")],
  planets: {},
  gameOptions: {
    fieldSize: 5,
    neutralPlanetCount: 3
  },
  gameStartError: false,
  turnError: false,
  currentPlayerOrders: [],
  currentShipsModifier: {},
  currentPlayerFleets: []
};

const getArrivingPlayerFleets = (game: ConquestGame, activePlayer: Player): ArrivingFleet[] => {
  return game.getFleets().reduce((acc: ArrivingFleet[], fleetList: Fleet[], index: number): ArrivingFleet[] => {
    fleetList.forEach((fleet: Fleet): void => {
      if (fleet.owner.id === activePlayer.id) {
        acc.push({
          destination: fleet.destination,
          killPercent: fleet.killPercent,
          amount: fleet.amount,
          arrivingIn: index
        });
      }
    });
    return acc;
  }, []);
};

let game: ConquestGame;
let activePlayer: Player;

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
          iteration: state.iteration + 1,
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
        activePlayer = game.getPlayers()[game.waitingForPlayer];
        if (turnStatus !== TurnStatus.INVALID) {
          return {
            ...state,
            status: game.status,
            winner: game.winner,
            players: game.getPlayers(),
            activePlayer,
            planets: game.getPlanets(),
            turnError: false,
            errorText: undefined,
            currentPlayerOrders: [],
            currentShipsModifier: {},
            currentPlayerFleets: getArrivingPlayerFleets(game, activePlayer)
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
