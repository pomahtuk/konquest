import Player from "../../Player";
import Planet from "../../Planet";
import Fleet from "../../Fleet";

import markDeadPlayers from "../../helpers/markDeadPlayers";

describe("markDeadPlayers", (): void => {
  it("Do nothing if all players are alive", (): void => {
    const player1 = new Player("One");
    const player2 = new Player("Two");
    const players = [player1, player2];
    const planets = {
      A: new Planet("A", player1),
      B: new Planet("B", player2)
    };

    markDeadPlayers({
      players,
      planets,
      remainingTimeline: [[]]
    });

    expect(player1.isDead).toBe(false);
    expect(player2.isDead).toBe(false);
  });

  it("Do nothing if player have one fleet flying", (): void => {
    const player1 = new Player("One");
    const players = [player1];
    const planets = {};

    markDeadPlayers({
      players,
      planets,
      remainingTimeline: [
        [
          new Fleet({
            owner: player1,
            amount: 10,
            destination: "A"
          })
        ]
      ]
    });

    expect(player1.isDead).toBe(false);
  });

  it("Mark player dead if it has no planets and no fleets standing", (): void => {
    const player1 = new Player("One");
    const players = [player1];
    const planets = {};

    markDeadPlayers({
      players,
      planets,
      remainingTimeline: [[]]
    });

    expect(player1.isDead).toBe(true);
  });
});
