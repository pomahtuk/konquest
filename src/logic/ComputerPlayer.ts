import Player, { PlayerTurnOrder } from "./Player";
import { PlanetMap } from "./Planet";
import Fleet from "./Fleet";

export enum ComputerPlayerType {
  EASY = "easy",
  NORMAL = "normal",
  HARD = "hard"
}

class ComputerPlayer extends Player {
  public computerType: ComputerPlayerType;

  constructor(name: string, type: ComputerPlayerType) {
    super(name);
    this.isComputer = true;
    this.computerType = type;
  }

  public shouldSkipPlanet(planetName: string, orders: PlayerTurnOrder[], fleets: Fleet[]): boolean {
    for (const order of orders) {
      if (order.destination === planetName) {
        return true;
      }
    }

    for (const fleet of fleets) {
      if (fleet.destination === planetName) {
        return true;
      }
    }

    return false;
  }

  public takeTurn(planets: PlanetMap, fleets: Fleet[]): PlayerTurnOrder[] {
    return [];
  }
}

export default ComputerPlayer;
