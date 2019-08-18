export default class Player {
  public id: number;
  public screenName: string;
  public statEnemyShipsDestroyed = 0;
  public statEnemyFleetsDestroyed = 0;
  public statShipCount = 0;
  public isDead = false;

  public constructor(name: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
    this.statEnemyShipsDestroyed = 0;
    this.statEnemyFleetsDestroyed = 0;
    this.statShipCount = 0;
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
