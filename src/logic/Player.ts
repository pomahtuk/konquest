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
