import ComputerPlayerEasy from "../../ComputerPlayerEasy";
import Player from "../../Player";
import ConquestGame, { TurnStatus, GameStatus } from "../../Game";
import { PlanetMap } from "../../Planet";

const computer = new ComputerPlayerEasy("test");
const player = new Player("gamer");

const makeEmptyPlayerTurn = (game: ConquestGame): TurnStatus => {
  return game.addPlayerTurnData({
    player: player,
    orders: []
  });
};

describe("Could have a game with Computer player", (): void => {
  let game: ConquestGame;
  beforeAll((): void => {
    game = new ConquestGame({
      players: [player, computer],
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 1
    });
  });

  it("can let computer make a turn", (): void => {
    // do nothing
    const result = makeEmptyPlayerTurn(game);
    // turn must be valid
    expect(result).toBe(TurnStatus.VALID);
    // and we should be waiting for player again
    expect(game.waitingForPlayer).toBe(0);
    // now let's wait for 5 turns
    for (let i = 0; i < 5; i++) {
      makeEmptyPlayerTurn(game);
    }
    // after this neutral planet should belong to Computer player
    const planets: PlanetMap = game.getPlanets();
    const computerPlanets = Object.keys(planets)
      .map((planetName) => planets[planetName])
      .filter((planet) => planet.owner && planet.owner.id === computer.id);

    expect(computerPlanets).toHaveLength(2);

    // now, if we just wait few more turns computer should not be able to consolidate fleets
    for (let i = 0; i < 10; i++) {
      makeEmptyPlayerTurn(game);
    }

    expect(player.isDead).toBe(false);

    // now let's send half of player planet fleet to computer planet, releasing deadlock
    game.addPlayerTurnData({
      player: player,
      orders: [
        {
          origin: "A",
          destination: "C",
          amount: 80
        }
      ]
    });

    // at this point computer could make a move
    game.addPlayerTurnData({
      player: player,
      orders: [
        {
          origin: "A",
          destination: "C",
          amount: 20
        }
      ]
    });

    // and to make sure that our fleet arrived at destination and destroyed
    makeEmptyPlayerTurn(game);

    // now Computer player won the game!
    expect(game.status).toBe(GameStatus.COMPLETED);
    expect(game.winner).toBeDefined();
    expect(game.winner!.id).toBe(computer.id);
  });
});
