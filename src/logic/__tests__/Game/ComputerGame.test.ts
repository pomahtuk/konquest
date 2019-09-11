import ComputerPlayerEasy from "../../ComputerPlayerEasy";
import Player from "../../Player";
import ConquestGame, { TurnStatus, GameStatus, findPlayerFleets } from "../../Game";
import { PlanetMap } from "../../Planet";
import ComputerPlayerHard from "../../ComputerPlayerHard";
import Fleet from "../../Fleet";

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

  // here, as only used for computer player
  it("can find playerFleets", (): void => {
    const allFleets: Fleet[][] = [
      [
        {
          owner: player,
          amount: 10,
          killPercent: 0.5,
          destination: "B"
        },
        {
          owner: computer,
          amount: 10,
          killPercent: 0.4,
          destination: "B"
        }
      ],
      [
        {
          owner: player,
          amount: 10,
          killPercent: 0.8,
          destination: "D"
        }
      ]
    ];
    const playerFleets = findPlayerFleets(allFleets, player);
    expect(playerFleets).toHaveLength(2);
  });

  it("Can stop game if only computer players are left", (): void => {
    const anotherComp = new ComputerPlayerHard("another");
    const ownGame = new ConquestGame({
      players: [anotherComp, computer],
      fieldHeight: 4,
      fieldWidth: 4,
      neutralPlanetCount: 1
    });
    expect(ownGame.status).toBe(GameStatus.COMPLETED);
    expect(ownGame.winner).toBe(null);
  });

  it("Can have game with computer player", (): void => {
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

    // now game processed another turn
    // check if there are any fleets en route
    const fleets = game.getFleets();
    const fleetsTravelling = fleets.reduce((acc, fleetData) => {
      return [...acc, ...fleetData];
    }, []);
    if (fleetsTravelling.length > 0) {
      // wait a bit
      makeEmptyPlayerTurn(game);
    }

    // now Computer player won the game!
    expect(game.status).toBe(GameStatus.COMPLETED);
    expect(game.winner).toBeDefined();
    expect((game.winner as Player).id).toBe(computer.id);
  });
});
