import Player from "./Player";

export type PlanetCoordinates = {
  x: number;
  y: number;
};

export default class Planet {
  name: string;
  owner: number | null = null; // reference co playerId
  ships: number;
  shipsDue: number | 0 = 0; // only if there are ships en route
  production: number; // only happens when planet is taken, next turn
  killPercent: number;
  // Kill percent is a measure of the effectiveness of the ships produced at that planet.
  // Attack fleets take the kill percentage of their planet of departure,
  // and defense fleets use the kill percentage of the planet they are defending.
  coordinates: PlanetCoordinates;

  constructor(name: string, coordinates: PlanetCoordinates = { x: 0, y: 0 }, player?: Player | null) {
    // initialize
    this.name = name;
    this.coordinates = coordinates;

    let production = 10;
    const killPercent = 0.5;
    if (!player) {
      production = 8 + Math.floor(Math.random() * 8);
      // TODO: generate killPercent
    } else {
      this.owner = player.id;
    }
    this.ships = production;
    this.production = production;
    this.killPercent = killPercent;
  }
}

export type PlanetMap = {
  [key: string]: Planet;
};
