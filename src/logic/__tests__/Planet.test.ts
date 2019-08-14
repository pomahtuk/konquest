import Planet from "../Planet";
import Player from "../Player";

const testPlayer = new Player("tester");

const coordinates = {
  x: 1,
  y: 1
};

describe("Planet", (): void => {
  it("Creates a new neutral Planet", (): void => {
    const planetName = "A";
    const planet = new Planet(planetName);
    planet.coordinates = coordinates;

    expect(planet).toBeDefined();

    expect(planet.name).toBe(planetName);
    expect(planet.owner).toBeNull();
    expect(planet.killPercent).toBeGreaterThanOrEqual(0.3);
    expect(planet.killPercent).toBeLessThanOrEqual(0.9);
    const production = planet.production;
    // we use 5 as a base number and adding random number from 0 to 10
    expect(production).toBeGreaterThanOrEqual(5);
    expect(production).toBeLessThanOrEqual(15);
    // initial amount equals production
    expect(planet.ships).toBe(0);
    // no pending ships here
    expect(planet.shipsDue).toBe(0);
  });

  it("Creates a new player Planet", (): void => {
    const planetName = "A";

    const planet = new Planet(planetName, testPlayer, coordinates);

    expect(planet).toBeDefined();

    expect(planet.name).toBe(planetName);
    expect(planet.owner).toMatchObject(testPlayer);
    expect(planet.killPercent).toBe(0.5);

    expect(planet.coordinates).toEqual(coordinates);

    // players should be in equal conditions from start
    expect(planet.production).toBe(10);
    expect(planet.ships).toBe(10);
    // no pending ships here
    expect(planet.shipsDue).toBe(0);
  });
});
