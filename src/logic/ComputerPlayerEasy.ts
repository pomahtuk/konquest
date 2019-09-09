import ComputerPlayer, { ComputerPlayerType } from "./ComputerPlayer";

class ComputerPlayerEasy extends ComputerPlayer {
  protected minimumShips = 20;
  protected shipCountFactor = 2;

  constructor(name: string) {
    super(name, ComputerPlayerType.EASY);
  }
}

export default ComputerPlayerEasy;
