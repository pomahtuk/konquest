export default class Player {
  public id: number;
  public screenName: string;
  public statEnemyShipsDestroyed: number = 0;
  public statEnemyFleetsDestroyed: number = 0;

  public constructor(name: string) {
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
  }
}

export interface PlayerMap {
  [key: string]: Player;
}
