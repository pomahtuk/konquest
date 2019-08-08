import Planet, { PlanetMap } from "./Planet";

export default class Player {
  id: number;
  screenName: string;
  private planets: PlanetMap = {};

  constructor(name: string) {
    // TODO: player actually have to be stored somewhere
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
  }

  public addPlanet(planet: Planet): void {
    this.planets[planet.name] = planet;
    planet.owner = this.id;
  }

  public removePlanet(planet: Planet): void {
    this.planets[planet.name].owner = null;
    delete this.planets[planet.name];
  }

  public getPlanets(): Planet[] {
    return Object.keys(this.planets).map((planetName) => this.planets[planetName]);
  }
}

export type PlayerMap = {
  [key: string]: Player;
};
