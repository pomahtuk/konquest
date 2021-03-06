import { StateGameOptions, GameActionTypes, StartGameAction, AddPlayerTurnAction, SetGameOptionsAction } from "../actions/game.actions";
import ConquestGame, { GameStatus, TurnStatus } from "../../logic/Game";
import Player from "../../logic/Player";
import { PlanetMap } from "../../logic/Planet";
import Fleet from "../../logic/Fleet";
import { saveToCookies, readFromCookies, clearCookie } from "../persisters/cookies.persister";
import { RestoreGameAction, SharedActionTypes } from "../actions/shared.actions";
import playerMapper from "../../logic/helpers/playerMapper";

export interface GameState {
  iteration: number;
  isStarted: boolean;
  status: GameStatus;
  winner: Player | null;
  activePlayer?: Player;
  planets: PlanetMap;
  gameOptions: StateGameOptions;
  gameStartError: boolean;
  gameRestoreError: boolean;
  errorText?: string;
  currentPlayerFleets: ArrivingFleet[];
  activePlayers: Player[];
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
  gameRestoreError: false,
  errorText: undefined,
  currentPlayerFleets: [],
  activePlayers: []
};

export const getArrivingPlayerFleets = (fleets: Fleet[][], activePlayer: Player): ArrivingFleet[] => {
  return fleets.reduce((acc: ArrivingFleet[], fleetList: Fleet[] = [], index: number): ArrivingFleet[] => {
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

function konquestGame(
  state: GameState = defaultState,
  action: StartGameAction | AddPlayerTurnAction | SetGameOptionsAction | RestoreGameAction
): GameState {
  let turnStatus: TurnStatus;
  let activePlayer: Player;
  let planets: PlanetMap;
  let players: Player[];
  let gameStateSerialized: string | undefined;
  let newGame: ConquestGame | undefined;

  switch (action.type) {
    case GameActionTypes.SET_GAME_OPTIONS:
      return {
        ...state,
        gameOptions: {
          ...state.gameOptions,
          ...action.gameOptions
        }
      };
    case SharedActionTypes.RESTORE_GAME:
      gameStateSerialized = action.storedGame || readFromCookies();
      if (!gameStateSerialized) {
        return {
          ...state,
          gameRestoreError: true,
          errorText: "Game was not stored, could not get value from storage"
        };
      }
      newGame = ConquestGame.deSerialize(gameStateSerialized, saveToCookies);
      if (!newGame) {
        return {
          ...state,
          gameRestoreError: true,
          errorText: "Failed to de-serialize game from stored value"
        };
      }
      game = newGame;
      players = game.getPlayers();
      activePlayer = players[game.waitingForPlayer];
      planets = game.getPlanets();
      return {
        ...state,
        isStarted: true,
        gameOptions: {
          ...state.gameOptions,
          fieldSize: game.fieldSize[0],
          neutralPlanetCount: Object.keys(planets).length - players.length,
          players
        },
        status: game.status,
        winner: game.winner,
        errorText: undefined,
        gameRestoreError: false,
        activePlayer,
        currentPlayerFleets: getArrivingPlayerFleets(game.getFleets(), activePlayer),
        planets
      };
    case GameActionTypes.START_GAME:
      try {
        clearCookie();
        game = new ConquestGame(
          {
            fieldHeight: state.gameOptions.fieldSize,
            fieldWidth: state.gameOptions.fieldSize,
            neutralPlanetCount: state.gameOptions.neutralPlanetCount,
            players: state.gameOptions.players.map((p) => playerMapper(p, true))
          },
          saveToCookies
        );
        players = game.getPlayers();
        return {
          ...state,
          iteration: state.iteration + 1,
          isStarted: true,
          gameStartError: false,
          errorText: undefined,
          gameRestoreError: false,
          status: game.status,
          winner: game.winner,
          activePlayer: players[game.waitingForPlayer],
          currentPlayerFleets: [],
          planets: game.getPlanets(),
          activePlayers: players
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
        players = game.getPlayers();
        activePlayer = players[game.waitingForPlayer];
        if (turnStatus !== TurnStatus.INVALID) {
          return {
            ...state,
            status: game.status,
            winner: game.winner,
            activePlayer,
            planets: game.getPlanets(),
            errorText: undefined,
            currentPlayerFleets: getArrivingPlayerFleets(game.getFleets(), activePlayer),
            activePlayers: players
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
