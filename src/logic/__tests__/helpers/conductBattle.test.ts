// import conductBattle from "../../helpers/conductBattle";

import Player from "../../Player";
import Planet from "../../Planet";
import Fleet from "../../Fleet";
import conductBattle from "../../helpers/conductBattle";

describe("conductBattle", (): void => {
  it("Able to conduct simple battle with attacker as a clear winner", (): void => {
    const player1 = new Player("One");
    const attackerFleet = new Fleet({
      owner: player1,
      amount: 100,
      destination: "A",
      killPercent: 0.5
    });

    const defenderPlanet = new Planet("A");

    const shipsToDestroy = defenderPlanet.ships;
    conductBattle({
      attackerFleet,
      defenderPlanet
    });
    expect(player1.statEnemyFleetsDestroyed).toBe(1);
    expect(player1.statEnemyShipsDestroyed).toBe(shipsToDestroy);
    expect(defenderPlanet.owner).toMatchObject(player1);
  });

  it("Able to conduct simple battle with defender as a clear winner", (): void => {
    const player1 = new Player("One");
    const attackerFleet = new Fleet({
      owner: player1,
      amount: 3,
      destination: "A",
      killPercent: 0.5
    });

    const defenderPlanet = new Planet("A");

    conductBattle({
      attackerFleet,
      defenderPlanet
    });
    expect(player1.statEnemyFleetsDestroyed).toBe(0);
    expect(defenderPlanet.owner).toBeNull();
  });
});
