import Planet, { PlanetMap } from "./Planet";
import Player, { PlayerMap } from "./Player";

import getPlanetName from "./utils/getPlanetName";
import getDistanceBetweenPoints from "./utils/getDistanceBetweenPoints";
import validateGameParams from "./utils/validateGameParams";
import validateTurnData from "./utils/validateTurnData";
import placePlayerPlanets from "./utils/placePlayerPlanets";
import placeNeutralPlanets from "./utils/placeNeutralPlanets";

export interface GameOptions {
  fieldHeight: number;
  fieldWidth: number;
  neutralPlanetCount: number;
  players: Player[];
}

export interface PlayerTurnOrder {
  origin: string;
  destination: string;
  amount: number;
}

export interface PlayerTurn {
  playerId: number;
  orders: PlayerTurnOrder[];
}

export interface FleetDetails {
  owner: number;
  destination: string;
  amount: number;
}

// making fields truly private
const addPlayers = Symbol("addPlayers");
const addNeutralPlanets = Symbol("addNeutralPlanets");
const _placePlanets = Symbol("_placePlanets");
const processTurn = Symbol("processTurn");
const fleetTimeline = Symbol("fleetTimeline");
const waitingForPlayer = Symbol("waitingForPlayer");
const currentTurn = Symbol("currentTurn");

class ConquestGame {
  public static maxSize: number = 20;
  public static minSize: number = 4;
  public static minPlayers: number = 2;
  public static maxPlayers: number = 4;

  private fieldHeight: number;
  private fieldWidth: number;
  private turns: PlayerTurn[][] = [];
  private planets: PlanetMap = {};
  private players: PlayerMap = {};
  private playerCount: number = 0;
  private planetCount: number = 0;
  private [currentTurn]: number = 0;
  private [waitingForPlayer]: number = 0;
  private [fleetTimeline]: FleetDetails[][] = [];

  public constructor({ fieldHeight, fieldWidth, neutralPlanetCount, players }: GameOptions) {
    const result = validateGameParams({ fieldHeight, fieldWidth, neutralPlanetCount, players });
    if (!result.valid) {
      // TODO: not sure throwing is a best approach here
      throw new Error(result.error);
    }

    this.fieldHeight = fieldHeight;
    this.fieldWidth = fieldWidth;
    // create game field
    // get players in easy way
    this[addPlayers](players);
    // add neutral planets
    this[addNeutralPlanets](neutralPlanetCount, players.length);
    // place planets
    this[_placePlanets]();
  }

  public addPlayerTurnData(data: PlayerTurn): void {
    const { playerId } = data;
    const playerWeAreWaitingFor = this.players[this[waitingForPlayer]];
    if (playerId !== playerWeAreWaitingFor.id) {
      throw new Error("We are waiting for other player to make a move");
    }
    // this will throw if data is invalid
    const result = validateTurnData(data, this.planets);
    if (!result.valid) {
      // TODO: not sure throwing is a best approach here
      throw new Error(result.error);
    }
    // check if we already have some data for this turn
    let turn = this.turns[this[currentTurn]];
    if (!turn) {
      turn = [];
    }
    turn.push(data);
    this.turns[this[currentTurn]] = turn;
    // update pointer to player we are waiting for
    this[waitingForPlayer] += 1;
    if (this[waitingForPlayer] >= this.playerCount) {
      // if we made full circle - start anew
      this[waitingForPlayer] = 0;
      // and process current turn
      this[processTurn]();
    }
  }

  public getPlayers(): PlayerMap {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this.players));
  }

  public getPlanets(): PlanetMap {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this.planets));
  }

  public getTurns(): PlayerTurn[][] {
    // returning deep copy of an object to prevent modification by pointer
    return JSON.parse(JSON.stringify(this.turns));
  }

  public getDimensions(): { width: number; height: number } {
    return {
      height: this.fieldHeight,
      width: this.fieldWidth
    };
  }

  private [processTurn](): void {
    // send fleets
    const currentTurns = this.turns[this[currentTurn]];
    for (const turn of currentTurns) {
      const owner = turn.playerId;
      for (const order of turn.orders) {
        const originPlanet = this.planets[order.origin];
        const destinationPlanet = this.planets[order.destination];
        const fleetTravelTime = getDistanceBetweenPoints(originPlanet.coordinates, destinationPlanet.coordinates);
        const fleetTimelineIndex = this[currentTurn] + fleetTravelTime;
        const fleetTimelinePoint = this[fleetTimeline][fleetTimelineIndex] || [];
        fleetTimelinePoint.push({
          owner,
          destination: order.destination,
          amount: order.amount
        });
        this[fleetTimeline][fleetTimelineIndex] = fleetTimelinePoint;
        originPlanet.ships -= order.amount;
      }
    }
    // check arrival
    const arrivingFleets = this[fleetTimeline][this[currentTurn]] || [];
    for (const fleet of arrivingFleets) {
      const destinationPlanet = this.planets[fleet.destination];
      // conduct battle!
      if (destinationPlanet.ships < fleet.amount) {
        // new owner
        destinationPlanet.owner = fleet.owner;
      }
      destinationPlanet.ships = Math.abs(destinationPlanet.ships - fleet.amount);
    }
    // do production only for captured planets
    // TODO: not optimal!
    Object.keys(this.planets)
      .map((planetName): Planet => this.planets[planetName])
      .filter((planet): boolean => !!planet.owner)
      .forEach((planet): void => {
        planet.ships += planet.production;
      });
    this[currentTurn] += 1;
    // check if someone won
  }

  private [addPlayers](players: Player[]): void {
    this.playerCount = players.length;
    this.players = players.reduce((acc, player, index): PlayerMap => {
      const playerPlanet = new Planet(getPlanetName(index), player);
      this.planets[playerPlanet.name] = playerPlanet;
      acc[index] = player;
      return acc;
    }, {});
  }

  private [addNeutralPlanets](neutralPlanetCount: number, playersCount: number): void {
    for (let i = 0; i < neutralPlanetCount; i++) {
      // 65 - charCode for A letter
      // we will leave first planets to players
      const planet = new Planet(getPlanetName(playersCount + i));
      this.planets[planet.name] = planet;
    }
    this.planetCount = neutralPlanetCount + playersCount;
  }

  private [_placePlanets](): void {
    // first - place player planets
    placePlayerPlanets({
      planets: this.planets,
      fieldHeight: this.fieldHeight,
      fieldWidth: this.fieldWidth,
      playerCount: this.playerCount
    });
    // then place neutral planets
    placeNeutralPlanets({
      planets: this.planets,
      fieldHeight: this.fieldHeight,
      fieldWidth: this.fieldWidth,
      playerCount: this.playerCount,
      planetCount: this.planetCount
    });
  }
}

export default ConquestGame;
