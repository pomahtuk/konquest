import Player from "./Player";

export interface FleetParams {
  amount: number;
  killPercent?: number;
  owner: Player;
  destination: string;
}

export default class Fleet {
  public amount: number;
  public killPercent: number;
  public owner: Player;
  public destination: string;

  public constructor({ owner, killPercent = 0.5, amount, destination }: FleetParams) {
    this.owner = owner;
    this.killPercent = killPercent;
    this.amount = amount;
    this.destination = destination;
  }
}
