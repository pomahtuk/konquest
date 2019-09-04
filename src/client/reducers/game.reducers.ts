import { StateGameOptions, GameActionTypes, StartGameAction, AddPlayerTurnAction, SetGameOptionsAction } from "../actions/game.actions";
import ConquestGame, { GameStatus, TurnStatus } from "../../logic/Game";
import Player from "../../logic/Player";
import { PlanetMap } from "../../logic/Planet";
import Fleet from "../../logic/Fleet";
import ComputerPlayerEasy from "../../logic/ComputerPlayerEasy";

export interface GameState {
  iteration: number;
  isStarted: boolean;
  status: GameStatus;
  winner: Player | null;
  activePlayer?: Player;
  planets: PlanetMap;
  gameOptions: StateGameOptions;
  gameStartError: boolean;
  errorText?: string;
  currentPlayerFleets: ArrivingFleet[];
}

export interface ArrivingFleet {
  arrivingIn: number;
  destination: string;
  killPercent: number;
  amount: number;
}

export const defaultState: GameState = {
  iteration: 0,
  isStarted: false,
  status: GameStatus.NOT_STARTED,
  winner: null,
  planets: {},
  gameOptions: {
    fieldSize: 5,
    neutralPlanetCount: 3,
    players: []
  },
  gameStartError: false,
  currentPlayerFleets: []
};

export const getArrivingPlayerFleets = (fleets: Fleet[][], activePlayer: Player): ArrivingFleet[] => {
  return fleets.reduce((acc: ArrivingFleet[], fleetList: Fleet[], index: number): ArrivingFleet[] => {
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

function konquestGame(state: GameState = defaultState, action: StartGameAction | AddPlayerTurnAction | SetGameOptionsAction): GameState {
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
    case GameActionTypes.START_GAME:
      try {
        game = new ConquestGame({
          fieldHeight: state.gameOptions.fieldSize,
          fieldWidth: state.gameOptions.fieldSize,
          neutralPlanetCount: state.gameOptions.neutralPlanetCount,
          players: state.gameOptions.players.map((p) => (p.isComputer ? new ComputerPlayerEasy(p.screenName) : new Player(p.screenName)))
        });
        return {
          ...state,
          iteration: state.iteration + 1,
          isStarted: true,
          gameStartError: false,
          status: game.status,
          winner: game.winner,
          activePlayer: game.getPlayers()[game.waitingForPlayer],
          planets: game.getPlanets(),
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
      if (game && state.isStarted === true) {
        turnStatus = game.addPlayerTurnData(action.turnData);
        activePlayer = game.getPlayers()[game.waitingForPlayer];
        if (turnStatus !== TurnStatus.INVALID) {
          return {
            ...state,
            status: game.status,
            winner: game.winner,
            activePlayer,
            planets: game.getPlanets(),
            errorText: undefined,
            currentPlayerFleets: getArrivingPlayerFleets(game.getFleets(), activePlayer)
          };
        } else {
          return {
            ...state,
            errorText: "Turn data invalid"
          };
        }
      } else {
        return {
          ...state,
          errorText: "Game not started"
        };
      }
    default:
      return state;
  }
}

export default konquestGame;
