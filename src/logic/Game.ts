import Planet, { PlanetMap } from "./Planet";
import Player, { PlayerMap } from "./Player";

import getPlanetLimit from "./utils/getPlanetLimit";
import getPlanetName from "./utils/getPlanetName";
import getDistanceBetweenPoints from "./utils/getDistanceBetweenPoints";
import validateGameParams from "./utils/validateGameParams";

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
const validateParams = Symbol("validateParams");
const addPlayers = Symbol("addPlayers");
const addNeutralPlanets = Symbol("addNeutralPlanets");
const placePlanets = Symbol("placePlanets");
const placePlayerPlanets = Symbol("placePlayerPlanets");
const processTurn = Symbol("processTurn");
const _status = Symbol("_status");
const _winner = Symbol("_winner");
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
  private [_status]: string = "";
  private [_winner]: number | undefined = undefined;

  public constructor({ fieldHeight, fieldWidth, neutralPlanetCount, players }: GameOptions) {
    this[validateParams]({ fieldHeight, fieldWidth, neutralPlanetCount, players });

    this.fieldHeight = fieldHeight;
    this.fieldWidth = fieldWidth;
    // create game field
    // get players in easy way
    this[addPlayers](players);
    // add neutral planets
    this[addNeutralPlanets](neutralPlanetCount, players.length);
    // place planets
    this[placePlanets]();
  }

  public addPlayerTurnData(data: PlayerTurn): void {
    const { playerId } = data;
    const playerWeAreWaitingFor = this.players[this[waitingForPlayer]];
    if (playerId !== playerWeAreWaitingFor.id) {
      throw new Error("We are waiting for other player to make a move");
    }
    // this will throw if data is invalid
    this.validateTurnData(data);
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
    return this.players;
  }

  public getPlanets(): PlanetMap {
    return this.planets;
  }

  public getTurns(): PlayerTurn[][] {
    return this.turns;
  }

  public getDimensions(): { width: number; height: number } {
    return {
      height: this.fieldHeight,
      width: this.fieldWidth
    };
  }

  public validateTurnData({ playerId, orders }: PlayerTurn): void {
    if (!playerId) {
      throw new Error("Player must be specified");
    }
    // check if all fields are filled
    if (!orders || orders.length === 0) {
      // we don't have orders, might be normal
      return;
    }
    // make sure that
    // 0 - source is specified
    // 1 - source planet belong to player
    // 2 - destination is specified
    // 3 - source planet have required amount of ships available
    // 4 - stays true for all orders submitted
    const modifiers: { [key: string]: number } = {};
    for (const order of orders) {
      if (!order.origin) {
        throw new Error("Origin planet is not specified");
      }
      if (!order.destination) {
        throw new Error("Destination planet is not specified");
      }
      const origin = this.planets[order.origin];
      if (origin.owner !== playerId) {
        throw new Error("Source planet does not belong to player!");
      }
      const planetShipModifier = modifiers[origin.name] || 0;
      if (origin.ships - planetShipModifier < order.amount) {
        throw new Error("Source planet have less ships than required");
      }
      modifiers[origin.name] = planetShipModifier + order.amount;
    }
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
      .map((planetName) => this.planets[planetName])
      .filter((planet) => planet.owner)
      .forEach((planet) => (planet.ships += planet.production));
    this[currentTurn] += 1;
    // check if someone won
  }

  private [validateParams](options: GameOptions): void {
    const result = validateGameParams(options);
    if (!result.valid) {
      throw new Error(result.error);
    }
  }

  private [addPlayers](players: Player[]): void {
    this.playerCount = players.length;
    this.players = players.reduce((acc, player, index): PlayerMap => {
      const playerPlanet = new Planet(getPlanetName(index), undefined, player);
      player.addPlanet(playerPlanet);
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

  private [placePlanets](): void {
    // first - place player planets
    this[placePlayerPlanets]();
    // now divide matrix to equal segments
    // and place each planet in segment randomly

    // we could assume we are dealing with square
    const fieldSize = this.fieldWidth * this.fieldHeight;
    const targetSubSquareSide = (fieldSize / this.planetCount) ** 0.5;
    const leftover = this.fieldWidth % targetSubSquareSide;

    // now actually we know size of
    let squareOffsetX = 0;
    let squareOffsetY = 0;
    let axisMaxX = this.fieldWidth;
    const axisMaxY = this.fieldHeight;
    for (let i = 0; i < this.planetCount - this.playerCount; i++) {
      // iterate over planets
      const planetName = getPlanetName(this.playerCount + i);
      const planet = this.planets[planetName];
      // random things to space out
      // start increasing
      squareOffsetX += targetSubSquareSide;
      // in case we have 4 players - top right corner have to be vacant
      if (squareOffsetY === 0 && this.playerCount === 4) {
        axisMaxX = this.fieldWidth - targetSubSquareSide;
      } else {
        axisMaxX = this.fieldWidth;
      }
      if (squareOffsetX + targetSubSquareSide > axisMaxX) {
        // We need to avoid not only top left corner, but others as well
        squareOffsetX = 0;
        squareOffsetY += targetSubSquareSide;
        if (squareOffsetY + targetSubSquareSide > axisMaxY) {
          squareOffsetY = axisMaxY - targetSubSquareSide;
        }
        if (squareOffsetX === 0 && this.playerCount >= 3 && squareOffsetY >= this.fieldHeight - leftover - targetSubSquareSide) {
          // in case we have 3 players - bottom left corner have to be free
          squareOffsetX += targetSubSquareSide;
        }
      }

      planet.coordinates = {
        x: Math.floor(squareOffsetX + Math.random() * targetSubSquareSide),
        y: Math.floor(squareOffsetY + Math.random() * targetSubSquareSide)
      };
    }
  }

  private [placePlayerPlanets](): void {
    // for now stick to the corners
    const corners = {
      A: { x: 0, y: 0 },
      B: { x: this.fieldWidth - 1, y: this.fieldHeight - 1 },
      C: { x: 0, y: this.fieldHeight - 1 },
      D: { x: this.fieldWidth - 1, y: 0 }
    };
    // grab available planets and update their coordinates
    for (let i = 0; i < this.playerCount; i++) {
      const name = getPlanetName(i);
      const planet = this.planets[name];
      planet.coordinates = corners[name];
    }
  }

  get status(): string {
    return this[_status];
  }

  get winner(): number | undefined {
    return this[_winner];
  }
}

export default ConquestGame;
