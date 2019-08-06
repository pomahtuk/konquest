export default class Player {
  id: number;
  screenName: string;

  constructor(name: string) {
    // TODO: player actually have to be stored somewhere
    this.id = Math.floor(Math.random() * 1000);
    this.screenName = name;
  }
}

export type PlayerMap = {
  [key: string]: Player;
};
