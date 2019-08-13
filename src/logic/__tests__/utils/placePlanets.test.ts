import placeNeutralPlanets from "../../utils/placePlanets";

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

describe("placePlanets", (): void => {
  it("Able to place planets", (): void => {
    const fieldWidth = 8;
    const fieldHeight = 8;
    placeNeutralPlanets({
      planets,
      fieldWidth,
      fieldHeight,
      planetCount: 4
    });
  });
  it("Place planets so they do not collide with other planets coordinates", (): void => {});
});
