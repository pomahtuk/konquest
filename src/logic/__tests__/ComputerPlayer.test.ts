import ComputerPlayer, { ComputerPlayerType } from "../ComputerPlayer";

describe("ComputerPlayer", (): void => {
  it("Exports computer player class", (): void => {
    expect(ComputerPlayer).toBeDefined();
  });

  it("Able to create instance of ComputerPlayer", (): void => {
    const computer = new ComputerPlayer("test", ComputerPlayerType.EASY);
    expect(computer).toBeDefined();
    expect(computer.isComputer).toBeTruthy();
    expect(computer.computerType).toBe(ComputerPlayerType.EASY);
  });

  it("Can properly calculate if planet should not be considered as destination for turn", (): void => {
    const computer = new ComputerPlayer("test", ComputerPlayerType.EASY);
    const shouldNot = computer.shouldSkipPlanet("A", [], []);
    expect(shouldNot).toBe(false);
    const shouldDueToOrders = computer.shouldSkipPlanet("A", [{ origin: "B", destination: "A", amount: 10 }], []);
    expect(shouldDueToOrders).toBe(true);
    const shouldDueToFleets = computer.shouldSkipPlanet("A", [], [{ owner: computer, destination: "A", amount: 10, killPercent: 0.5 }]);
    expect(shouldDueToFleets).toBe(true);
  });

  it("Can prepare turn data", (): void => {
    const computer = new ComputerPlayer("test", ComputerPlayerType.EASY);
    expect(computer.takeTurn({}, [])).toHaveLength(0);
  });
});
