import Planet, { PlanetMap } from "./Planet";
import Player, { PlayerMap } from "./Player";

export type GameOptions = {
  fieldHeight: number;
  fieldWidth: number;
  neutralPlanetCount: number;
  players: Player[];
};

export type PlayerTurnOrder = {
  origin: string;
  destination: string;
  amount: number;
};

export type PlayerTurn = {
  playerId: number;
  orders: PlayerTurnOrder[];
};

export const getPlanetLimit = (fieldSize: number, playerCount: number): number => {
  const densityRation = 0.2;
  // it make sense to space things out
  return Math.ceil(fieldSize * densityRation) - playerCount;
};

const getPlanetName = (index: number): string => String.fromCharCode(65 + index);

class ConquestGame {
  private fieldHeight: number;
  private fieldWidth: number;
  private turns: PlayerTurn[] = [];
  private planets: PlanetMap = {};
  private players: PlayerMap = {};
  private playerCount: number = 0;
  private planetCount: number = 0;

  constructor({ fieldHeight, fieldWidth, neutralPlanetCount, players }: GameOptions) {
    this.validateParams({ fieldHeight, fieldWidth, neutralPlanetCount, players });

    this.fieldHeight = fieldHeight;
    this.fieldWidth = fieldWidth;
    // create game field
    // get players in easy way
    this.addPlayers(players);
    // add neutral planets
    this.addNeutralPlanets(neutralPlanetCount, players.length);
    // place planets
    this.placePlanets();
  }

  private validateParams({ fieldHeight, fieldWidth, neutralPlanetCount, players = [] }: GameOptions): void {
    // add validations
    const playerCount = players.length;
    if (playerCount > 4 || playerCount < 2) {
      throw new Error("Player count should be between 2 and 4");
    }

    if (fieldHeight < 4 || fieldWidth < 4 || fieldHeight > 20 || fieldWidth > 20) {
      throw new Error("Game Field could not be less than 4 and bigger than 20 in any dimension");
    }

    const planetLimit = getPlanetLimit(fieldWidth * fieldHeight, playerCount);
    if (neutralPlanetCount > planetLimit) {
      throw new Error(`Game Field could not accommodate that many neutral planets, limit: ${planetLimit}`);
    }
  }

  private addPlayers(players: Player[]): void {
    this.playerCount = players.length;
    this.players = players.reduce((acc, player, index): PlayerMap => {
      const playerPlanet = new Planet(getPlanetName(index), undefined, player);
      player.addPlanet(playerPlanet);
      this.planets[playerPlanet.name] = playerPlanet;
      acc[player.id] = player;
      return acc;
    }, {});
  }

  private addNeutralPlanets(neutralPlanetCount: number, playersCount: number): void {
    for (let i = 0; i < neutralPlanetCount; i++) {
      // 65 - charCode for A letter
      // we will leave first planets to players
      const planet = new Planet(getPlanetName(playersCount + i));
      this.planets[planet.name] = planet;
    }
    this.planetCount = neutralPlanetCount + playersCount;
  }

  private placePlanets(): void {
    // first - place player planets
    this.placePlayerPlanets();
    // now divide matrix to equal segments
    // and place each planet in segment randomly

    // we could assume we are dealing with square
    const fieldSize = this.fieldWidth * this.fieldHeight;
    const targetSubSquareSide = Math.floor((fieldSize / this.planetCount) ** 0.5);
    const leftover = this.fieldWidth % targetSubSquareSide;

    // now actually we know size of
    let squareOffsetX = 0;
    let squareOffsetY = 0;
    for (let i = 0; i < this.planetCount - this.playerCount; i++) {
      // iterate over planets
      const planetName = getPlanetName(this.playerCount + i);
      const planet = this.planets[planetName];
      squareOffsetX += targetSubSquareSide;
      if (squareOffsetX + targetSubSquareSide > this.fieldWidth) {
        squareOffsetX = 0 + Math.round(Math.random() * leftover);
        squareOffsetY += targetSubSquareSide;
        if (squareOffsetY + targetSubSquareSide > this.fieldHeight) {
          squareOffsetY = this.fieldHeight - targetSubSquareSide;
        }
      }
      planet.coordinates = {
        x: squareOffsetX + Math.floor(Math.random() * targetSubSquareSide),
        y: squareOffsetY + Math.floor(Math.random() * targetSubSquareSide)
      };
    }
  }

  private placePlayerPlanets(): void {
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

  public processTurn(): void {}

  public addPlayerTurnData(): void {
    // based on orders - calculate how long will it take for ships to arrive
    //
  }

  public getPlayers(): PlayerMap {
    return this.players;
  }

  public getPlanets(): PlanetMap {
    return this.planets;
  }

  public getTurns(): PlayerTurn[] {
    return this.turns;
  }

  public getDimensions(): { width: number; height: number } {
    return {
      height: this.fieldHeight,
      width: this.fieldWidth
    };
  }
}

export default ConquestGame;
