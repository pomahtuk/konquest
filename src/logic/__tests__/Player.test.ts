import Player from "../Player";

describe("Player", (): void => {
  it("Creates a new Player", (): void => {
    const playerName = "Tester";
    const player = new Player(playerName);

    expect(player).toBeDefined();

    expect(player.screenName).toEqual(playerName);
    expect(player.id).toBeDefined();
    expect(player.statEnemyShipsDestroyed).toBe(0);
    expect(player.statEnemyFleetsDestroyed).toBe(0);
    expect(player.statShipCount).toBe(0);
  });
});
