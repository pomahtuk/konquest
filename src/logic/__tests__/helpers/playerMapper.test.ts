import Player from "../../Player";
import playerMapper from "../../helpers/playerMapper";
import ComputerPlayerEasy from "../../ComputerPlayerEasy";
import ComputerPlayerNormal from "../../ComputerPlayerNormal";
import ComputerPlayerHard from "../../ComputerPlayerHard";
import ComputerPlayer, { ComputerPlayerType } from "../../ComputerPlayer";

const humanTestPlayer = new Player("human test");
const computerTestPlayerEasy = new ComputerPlayerEasy("computer easy test");
const computerTestPlayerNormal = new ComputerPlayerNormal("computer easy normal");
const computerTestPlayerHard = new ComputerPlayerHard("computer easy hard");

describe("playerMapper", (): void => {
  it("Able to map Serialized player to a class instance", (): void => {
    // @ts-ignore - we will have to deal with objects representing player, not only instances
    const playerData: Player = {
      isComputer: false,
      screenName: "some",
      isDead: false,
      statEnemyFleetsDestroyed: 0,
      statShipCount: 0,
      statEnemyShipsDestroyed: 0
    };
    const playerInstance = playerMapper(playerData);
    expect(playerInstance.id).toBeDefined();
    expect(playerInstance.screenName).toBe(playerData.screenName);
    expect(playerInstance.isDead).toBe(playerData.isDead);
    expect(playerInstance.takeTurn).toBeDefined();
  });

  it("Able to map human player to human player without stats", (): void => {
    const humanCopy = playerMapper(humanTestPlayer);
    expect(humanCopy.screenName).toMatch(humanTestPlayer.screenName);
    expect(humanCopy.id).toMatch(humanTestPlayer.id);
  });
  it("Able to map human player to human player with stats", (): void => {
    humanTestPlayer.statShipCount = 100;
    humanTestPlayer.statEnemyFleetsDestroyed = 1;
    humanTestPlayer.statEnemyShipsDestroyed = 10;

    const humanCopy = playerMapper(humanTestPlayer, true);
    expect(humanCopy.screenName).toBe(humanTestPlayer.screenName);
    expect(humanCopy.id).toMatch(humanTestPlayer.id);
    expect(humanCopy.statEnemyFleetsDestroyed).toBe(humanTestPlayer.statEnemyFleetsDestroyed);
    expect(humanCopy.statShipCount).toBe(humanTestPlayer.statShipCount);
    expect(humanCopy.statEnemyShipsDestroyed).toBe(humanTestPlayer.statEnemyShipsDestroyed);
  });

  it("Able to map computer player easy to computer player easy without stats", (): void => {
    const computerCopy = playerMapper(computerTestPlayerEasy);
    expect(computerCopy.screenName).toMatch(computerTestPlayerEasy.screenName);
    expect(computerCopy.isComputer).toBe(true);
    expect(computerCopy.id).toMatch(computerTestPlayerEasy.id);
    expect((computerCopy as ComputerPlayer).computerType).toBe(ComputerPlayerType.EASY);
  });
  it("Able to map computer player normal to computer player normal without stats", (): void => {
    const computerCopy = playerMapper(computerTestPlayerNormal);
    expect(computerCopy.screenName).toMatch(computerTestPlayerNormal.screenName);
    expect(computerCopy.isComputer).toBe(true);
    expect(computerCopy.id).toMatch(computerTestPlayerNormal.id);
    expect((computerCopy as ComputerPlayer).computerType).toBe(ComputerPlayerType.NORMAL);
  });
  it("Able to map computer player hard to computer player hard without stats", (): void => {
    const computerCopy = playerMapper(computerTestPlayerHard);
    expect(computerCopy.screenName).toMatch(computerTestPlayerHard.screenName);
    expect(computerCopy.isComputer).toBe(true);
    expect(computerCopy.id).toMatch(computerTestPlayerHard.id);
    expect((computerCopy as ComputerPlayer).computerType).toBe(ComputerPlayerType.HARD);
  });

  it("Able to map computer player to computer player with stats", (): void => {
    computerTestPlayerEasy.statShipCount = 100;
    computerTestPlayerEasy.statEnemyFleetsDestroyed = 1;
    computerTestPlayerEasy.statEnemyShipsDestroyed = 10;

    const computerCopy = playerMapper(computerTestPlayerEasy, true);
    expect(computerCopy.screenName).toMatch(computerTestPlayerEasy.screenName);
    expect(computerCopy.isComputer).toBe(true);
    expect((computerCopy as ComputerPlayer).computerType).toBe(ComputerPlayerType.EASY);
    expect(computerCopy.statEnemyFleetsDestroyed).toBe(computerTestPlayerEasy.statEnemyFleetsDestroyed);
    expect(computerCopy.statShipCount).toBe(computerTestPlayerEasy.statShipCount);
    expect(computerCopy.statEnemyShipsDestroyed).toBe(computerTestPlayerEasy.statEnemyShipsDestroyed);
  });
});
