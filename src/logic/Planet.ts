import Player from "./Player";

export interface PlanetCoordinates {
  x: number;
  y: number;
}

export default class Planet {
  public name: string;
  public owner: number | null = null; // reference co playerId
  public ships: number;
  public shipsDue: number | 0 = 0; // only if there are ships en route
  public production: number; // only happens when planet is taken, next turn
  public killPercent: number;
  // Kill percent is a measure of the effectiveness of the ships produced at that planet.
  // Attack fleets take the kill percentage of their planet of departure,
  // and defense fleets use the kill percentage of the planet they are defending.
  public coordinates: PlanetCoordinates;

  public constructor(name: string, player?: Player | null, coordinates: PlanetCoordinates = { x: 0, y: 0 }) {
    // initialize
    this.name = name;
    this.coordinates = coordinates;

    let production = 10;
    const killPercent = 0.5;
    if (!player) {
      production = 8 + Math.floor(Math.random() * 8);
      // TODO: generate killPercent
      this.ships = 0;
    } else {
      this.owner = player.id;
      this.ships = production;
    }

    this.production = production;
    this.killPercent = killPercent;
  }
}

export interface PlanetMap {
  [key: string]: Planet;
}
