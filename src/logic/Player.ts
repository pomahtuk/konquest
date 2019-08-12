export default class Player {
  public id: number;
  public screenName: string;

  public constructor(name: string) {
    // TODO: player actually have to be stored somewhere
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
  }
}

export interface PlayerMap {
  [key: string]: Player;
}
