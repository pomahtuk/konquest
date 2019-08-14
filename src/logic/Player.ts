export default class Player {
  public id: number;
  public screenName: string;
  public statEnemyShipsDestroyed: number = 0;
  public statEnemyFleetsDestroyed: number = 0;
  public statShipCount: number = 0;
  public isDead: boolean = false;

  public constructor(name: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
  }
}

export interface PlayerTurnOrder {
  origin: string;
  destination: string;
  amount: number;
}

export interface PlayerTurn {
  player: Player;
  orders: PlayerTurnOrder[];
}
