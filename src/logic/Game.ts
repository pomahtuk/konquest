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

class ConquestGame {
  private fieldHeight: number;
  private fieldWidth: number;
  private turns: PlayerTurn[] = [];
  private planets: PlanetMap = {};
  private players: PlayerMap = {};

  constructor({ fieldHeight, fieldWidth, neutralPlanetCount, players }: GameOptions) {
    this.fieldHeight = fieldHeight;
    this.fieldWidth = fieldWidth;
    //
    for (let i = 0; i < neutralPlanetCount; i++) {
      // 65 - charCode for A letter
      // we will leave first planets to players
      const planet = new Planet(String.fromCharCode(65 + players.length + i));
      this.planets[planet.name] = planet;
    }
    // create game field
    // get players in easy way
    this.players = players
      ? players.reduce((acc: PlayerMap, player: Player, index: number): PlayerMap => {
          const playerPlanet = new Planet(String.fromCharCode(65 + index), player);
          this.planets[playerPlanet.name] = playerPlanet;
          acc[player.id] = player;
          return acc;
        }, {})
      : {};
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
      height: this.fieldHeight || 0,
      width: this.fieldWidth || 0
    };
  }
}

export default ConquestGame;
