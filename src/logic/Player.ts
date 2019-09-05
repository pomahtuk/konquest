import uuid from "uuid";

import Fleet from "./Fleet";
import { PlanetMap } from "./Planet";

export interface PlayerTurnOrder {
  origin: string;
  destination: string;
  amount: number;
}

export interface PlayerTurn {
  player: Player;
  orders: PlayerTurnOrder[];
}

export interface SerializedPlayerTurn {
  playerId: string;
  orders: PlayerTurnOrder[];
}

export default class Player {
  public id: string;
  public screenName: string;
  public statEnemyShipsDestroyed = 0;
  public statEnemyFleetsDestroyed = 0;
  public statShipCount = 0;
  public isDead = false;
  public isComputer = false;

  public constructor(name: string) {
    this.id = uuid().split("-")[0];
    this.screenName = name;
    this.statEnemyShipsDestroyed = 0;
    this.statEnemyFleetsDestroyed = 0;
    this.statShipCount = 0;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public takeTurn(planets: PlanetMap, fleets: Fleet[]): PlayerTurnOrder[] {
    return [];
  }
}
