import Player from "../Player";
import Planet from "../Planet";

const testPlanet = new Planet("A");

describe("Player", () => {
  it("Creates a new Player", () => {
    const playerName = "Tester";
    const player = new Player(playerName);

    expect(player).toBeDefined();

    expect(player.screenName).toEqual(playerName);
    expect(player.id).toBeDefined();
  });

  it("can add planets", () => {
    const playerName = "Tester";
    const player = new Player(playerName);

    player.addPlanet(testPlanet);

    expect(testPlanet.owner).toBe(player.id);
    expect(player.getPlanets().length).toBe(1);
  });

  it("can remove planets", () => {
    const playerName = "Tester";
    const player = new Player(playerName);

    player.addPlanet(testPlanet);

    expect(player.getPlanets().length).toBe(1);

    player.removePlanet(testPlanet);
    expect(testPlanet.owner).toBe(null);
    expect(player.getPlanets().length).toBe(0);
  });

  it("can return list of planets", () => {
    const playerName = "Tester";
    const player = new Player(playerName);

    player.addPlanet(testPlanet);

    expect(player.getPlanets()[0]).toBe(testPlanet);
  });
});
