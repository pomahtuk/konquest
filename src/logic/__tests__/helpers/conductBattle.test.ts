// import conductBattle from "../../helpers/conductBattle";

import Player from "../../Player";
import Planet from "../../Planet";
import Fleet from "../../Fleet";
import conductBattle from "../../helpers/conductBattle";

const player1 = new Player("One");

const attackerFleet = new Fleet({
  owner: player1,
  amount: 100,
  destination: "A",
  killPercent: 0.5
});

const defenderPlanet = new Planet("A");

describe("conductBattle", (): void => {
  it("Able to conduct simple battle with attacker as a clear winner", (): void => {
    conductBattle({
      attackerFleet,
      defenderPlanet
    });
    expect(player1.statEnemyFleetsDestroyed).toBe(1);
  });
  it("Able to conduct simple battle with defender as a clear winner", (): void => {
    // expect(conductBattle);
  });
});
