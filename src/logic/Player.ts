import Planet, { PlanetMap } from "./Planet";

export default class Player {
  public id: number;
  public screenName: string;
  private planets: PlanetMap = {};

  public constructor(name: string) {
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
    return Object.keys(this.planets).map((planetName): Planet => this.planets[planetName]);
  }
}

export interface PlayerMap {
  [key: string]: Player;
}
