import game, { defaultState, getArrivingPlayerFleets } from "../game.reducers";
import { addPlayerTurn, setGameOptions, startGame } from "../../actions/game.actions";
import Player, { PlayerTurn } from "../../../logic/Player";
import Fleet from "../../../logic/Fleet";

const testTurn: PlayerTurn = {
  player: new Player("test"),
  orders: []
};

describe("game reducer", (): void => {
  it("can calculate arriving fleets for a player", (): void => {
    // let's prepare fake data
    const player1 = new Player("test 1");
    const player2 = new Player("test 2");
    const fleets: Fleet[][] = [
      [],
      [{ amount: 10, owner: player1, destination: "A", killPercent: 0.5 }, { amount: 10, owner: player2, destination: "A", killPercent: 0.5 }]
    ];
    // and see what we could do with it
    const arrivingFleets = getArrivingPlayerFleets(fleets, player1);
    expect(arrivingFleets).toHaveLength(1);
    expect(arrivingFleets[0]).toMatchObject({
      destination: "A",
      killPercent: 0.5,
      amount: 10,
      arrivingIn: 1
    });
    // should not fail
    const brokenFleets = getArrivingPlayerFleets([], player1);
    expect(brokenFleets).toHaveLength(0);
  });

  it("Properly handling exception on starting game with invalid options", (): void => {
    const newState = game(
      defaultState,
      setGameOptions({
        fieldSize: 2,
        neutralPlanetCount: 10,
        players: []
      })
    );
    const res = game(newState, startGame());
    expect(res.gameStartError).toBe(true);
  });

  it("Properly handling trying to add turn data when game is not started", (): void => {
    const res = game(defaultState, addPlayerTurn(testTurn));
    expect(res.errorText).toBe("Game not started");
  });

  it("Properly handling trying to add turn data when game is not started", (): void => {
    const newState = game(
      defaultState,
      setGameOptions({
        fieldSize: 6,
        neutralPlanetCount: 1,
        players: [new Player("1"), new Player("2")]
      })
    );
    const startedState = game(newState, startGame());
    const res = game(startedState, addPlayerTurn(testTurn));
    expect(res.errorText).toBe("Turn data invalid");
  });
});
