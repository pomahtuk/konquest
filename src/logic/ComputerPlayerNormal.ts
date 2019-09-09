import ComputerPlayer, { ComputerPlayerType } from "./ComputerPlayer";

class ComputerPlayerNormal extends ComputerPlayer {
  protected minimumShips = 10;
  protected shipCountFactor = 2;

  constructor(name: string) {
    super(name, ComputerPlayerType.NORMAL);
  }
}

export default ComputerPlayerNormal;
