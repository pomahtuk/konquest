import ComputerPlayer, { ComputerPlayerType } from "./ComputerPlayer";

class ComputerPlayerHard extends ComputerPlayer {
  protected minimumShips = 30;
  protected shipCountFactor = 3;

  constructor(name: string) {
    super(name, ComputerPlayerType.HARD);
  }
}

export default ComputerPlayerHard;
