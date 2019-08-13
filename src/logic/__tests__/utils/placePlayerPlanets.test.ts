import placePlayerPlanets from "../../utils/placePlayerPlanets";

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

describe("Placing player planets", (): void => {
  it("Can place planets", (): void => {
    const fieldWidth = 4;
    const fieldHeight = 4;

    placePlayerPlanets({
      planets,
      fieldWidth,
      fieldHeight,
      playerCount: 4
    });

    expect(planets.A.coordinates).toMatchObject({
      x: 0,
      y: 0
    });

    expect(planets.B.coordinates).toMatchObject({
      x: fieldWidth - 1,
      y: fieldHeight - 1
    });

    expect(planets.C.coordinates).toMatchObject({
      x: 0,
      y: fieldHeight - 1
    });

    expect(planets.D.coordinates).toMatchObject({
      x: fieldWidth - 1,
      y: 0
    });
  });
});
