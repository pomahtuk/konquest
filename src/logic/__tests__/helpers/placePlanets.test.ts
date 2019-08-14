import placePlanets, { Point } from "../../helpers/placePlanets";

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
    const fieldWidth = 3;
    const fieldHeight = 3;
    placePlanets({
      planets,
      fieldWidth,
      fieldHeight,
      planetCount: 4
    });
  });

  it("Place planets so they do not collide with other planets coordinates", (): void => {
    const usedCoords: Point[] = Object.keys(planets)
      .map((planetName): Planet => planets[planetName])
      .reduce((acc: Point[], planet: Planet): Point[] => {
        const coords = planet.coordinates;
        const havePointAlready = !!acc.find((point: Point): boolean => point.x === coords.x && point.y === coords.y);
        expect(havePointAlready).toBe(false);
        acc.push(coords);
        return acc;
      }, []);

    expect(usedCoords.length).toBe(Object.keys(planets).length);
  });
});
