import Planet, { PlanetMap } from "./Planet";
import Player, { PlayerTurn } from "./Player";
import Fleet from "./Fleet";

import getPlanetName from "./helpers/getPlanetName";
import getDistanceBetweenPoints from "./helpers/getDistanceBetweenPoints";
import validateGameParams from "./helpers/validateGameParams";
import validateTurnData from "./helpers/validateTurnData";
import placePlanets from "./helpers/placePlanets";
import conductBattle from "./helpers/conductBattle";
import markDeadPlayers from "./helpers/markDeadPlayers";

export interface GameOptions {
  fieldHeight: number;
  fieldWidth: number;
  neutralPlanetCount: number;
  players: Player[];
}

export enum GameStatus {
  "NOT_STARTED" = "not_started",
  "IN_PROGRESS" = "in_progress",
  "COMPLETED" = "completed"
}

// making fields truly private
const addPlayers = Symbol("addPlayers");
const addNeutralPlanets = Symbol("addNeutralPlanets");
const processTurn = Symbol("processTurn");
const fleetTimeline = Symbol("fleetTimeline");
const waitingForPlayer = Symbol("waitingForPlayer");
const currentTurn = Symbol("currentTurn");
const completedTurns = Symbol("completedTurns");
const players = Symbol("players");
const planets = Symbol("planets");
const planetCount = Symbol("planetCount");
const fieldHeight = Symbol("fieldHeight");
const fieldWidth = Symbol("fieldWidth");
const turns = Symbol("turns");
const status = Symbol("status");
const winner = Symbol("winner");
const findWinner = Symbol("findWinner");

class ConquestGame {
  public static maxSize: number = 20;
  public static minSize: number = 4;
  public static minPlayers: number = 2;
  public static maxPlayers: number = 4;

  private [fieldHeight]: number;
  private [fieldWidth]: number;
  private [turns]: PlayerTurn[][] = [];
  private [planets]: PlanetMap = {};
  private [players]: Player[] = [];
  private [planetCount]: number = 0;
  private [currentTurn]: number = 0;
  private [completedTurns]: boolean[] = [];
  private [waitingForPlayer]: number = 0;
  private [fleetTimeline]: Fleet[][] = [];
  private [status]: GameStatus = GameStatus.NOT_STARTED;
  private [winner]: Player | null = null;

  public get width(): number {
    return this[fieldWidth];
  }

  public get height(): number {
    return this[fieldHeight];
  }

  public get status(): GameStatus {
    return this[status];
  }

  public get winner(): Player | null {
    return this[winner];
  }

  public constructor({ fieldHeight: height, fieldWidth: width, neutralPlanetCount, players: newPlayers }: GameOptions) {
    const result = validateGameParams({ fieldHeight: height, fieldWidth: width, neutralPlanetCount, players: newPlayers });
    if (!result.valid) {
      // TODO: not sure throwing is a best approach here
      throw new Error(result.error);
    }

    this[fieldHeight] = height;
    this[fieldWidth] = width;
    // create game field
    // get players in easy way
    this[addPlayers](newPlayers);
    // add neutral planets
    this[addNeutralPlanets](neutralPlanetCount, newPlayers.length);
    // place planets
    placePlanets({
      planets: this[planets],
      fieldHeight: this[fieldHeight],
      fieldWidth: this[fieldWidth],
      planetCount: this[planetCount]
    });
  }

  public addPlayerTurnData(data: PlayerTurn): void {
    // do not accept any turns for completed game
    if (this[status] === GameStatus.COMPLETED) {
      return;
    }
    const { player } = data;
    const playerWeAreWaitingFor = this[players][this[waitingForPlayer]];
    if (player.id !== playerWeAreWaitingFor.id) {
      throw new Error("We are waiting for other player to make a move");
    }
    // this will throw if data is invalid
    const result = validateTurnData(data, this[planets]);
    if (!result.valid) {
      // TODO: not sure throwing is a best approach here
      throw new Error(result.error);
    }
    // mark game as in progress if it is not started yet
    if (this.status === GameStatus.NOT_STARTED) {
      this[status] = GameStatus.IN_PROGRESS;
    }
    // check if we already have some data for this turn
    let turn = this[turns][this[currentTurn]];
    if (!turn) {
      turn = [];
    }
    turn.push(data);
    this[turns][this[currentTurn]] = turn;
    // update pointer to player we are waiting for
    this[waitingForPlayer] += 1;
    if (this[waitingForPlayer] >= this[players].length) {
      // if we made full circle - start anew
      this[waitingForPlayer] = 0;
      // and process current turn
      this[processTurn]();
    }
  }

  public getPlayers(): Player[] {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this[players]));
  }

  public getPlanets(): PlanetMap {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this[planets]));
  }

  public getTurns(): PlayerTurn[][] {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this[turns]));
  }

  private [processTurn](): void {
    // do not process processed turn
    if (this[completedTurns][this[currentTurn]]) {
      return;
    }
    // send fleets
    const currentTurns = this[turns][this[currentTurn]];
    for (const turn of currentTurns) {
      for (const order of turn.orders) {
        const originPlanet = this[planets][order.origin];
        const destinationPlanet = this[planets][order.destination];
        const fleetTravelTime = getDistanceBetweenPoints(originPlanet.coordinates, destinationPlanet.coordinates);
        const fleetTimelineIndex = this[currentTurn] + fleetTravelTime;
        const fleetTimelinePoint = this[fleetTimeline][fleetTimelineIndex] || [];
        fleetTimelinePoint.push(
          new Fleet({
            owner: turn.player,
            amount: order.amount,
            killPercent: originPlanet.killPercent,
            destination: destinationPlanet.name
          })
        );
        this[fleetTimeline][fleetTimelineIndex] = fleetTimelinePoint;
        originPlanet.ships -= order.amount;
      }
    }
    // check arrival
    const arrivingFleets = this[fleetTimeline][this[currentTurn]] || [];
    for (const fleet of arrivingFleets) {
      const destinationPlanet = this[planets][fleet.destination];
      if (destinationPlanet.owner && destinationPlanet.owner.id === fleet.owner.id) {
        // arriving to own planet, grow fleet
        destinationPlanet.ships += fleet.amount;
      } else {
        conductBattle({
          attackerFleet: fleet,
          defenderPlanet: destinationPlanet
        });
      }
    }
    // do production only for captured planets
    Object.keys(this[planets])
      .map((planetName): Planet => this[planets][planetName])
      .filter((planet): boolean => !!planet.owner)
      .forEach((planet): void => {
        planet.ships += planet.production;
        if (planet.owner) {
          // increase produced ship count
          planet.owner.statShipCount += 1;
        }
      });
    // mark turn complete
    this[completedTurns][this[currentTurn]] = true;
    // mark dead players
    markDeadPlayers({
      players: this[players],
      planets: this[planets],
      remainingTimeline: this[fleetTimeline].slice(this[currentTurn])
    });
    // advance turn
    this[currentTurn] += 1;
    // check if someone won
    this[findWinner]();
  }

  private [findWinner](): void {
    // may be check if all planets are captured?
    const alivePlayers = this[players].filter((player): boolean => !player.isDead);
    // if we have exactly 1 alive player
    if (alivePlayers.length === 1) {
      this[winner] = alivePlayers[0];
      this[status] = GameStatus.COMPLETED;
    }
  }

  private [addPlayers](newPlayers: Player[]): void {
    this[players] = newPlayers;
    // generate player planets
    newPlayers.forEach((player, index): void => {
      const playerPlanet = new Planet(getPlanetName(index), player);
      this[planets][playerPlanet.name] = playerPlanet;
    });
  }

  private [addNeutralPlanets](neutralPlanetCount: number, playersCount: number): void {
    for (let i = 0; i < neutralPlanetCount; i++) {
      const planet = new Planet(getPlanetName(playersCount + i));
      this[planets][planet.name] = planet;
    }
    this[planetCount] = neutralPlanetCount + playersCount;
  }
}

export default ConquestGame;
