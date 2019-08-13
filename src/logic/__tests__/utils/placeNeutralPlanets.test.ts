import placeNeutralPlanets from "../../utils/placeNeutralPlanets";

import Planet, { PlanetMap } from "../../Planet";
import Player from "../../Player";

const player1 = new Player("player1");
const player2 = new Player("player2");
const player3 = new Player("player2");
const player4 = new Player("player2");

const planets: PlanetMap = {
  A: new Planet("A", player1),
  B: new Planet("B", player2),
  C: new Planet("C", player3),
  D: new Planet("D", player4)
};

describe("placeNeutralPlanets", (): void => {
  it("Able to place planets", (): void => {
    const fieldWidth = 8;
    const fieldHeight = 8;
    placeNeutralPlanets({
      planets,
      fieldWidth,
      fieldHeight,
      playerCount: 4,
      planetCount: 4
    });
  });

  it("Places planets evenly distributed", (): void => {});
  it("Place planets so they do not collide with players planets coordinates", (): void => {});
});
