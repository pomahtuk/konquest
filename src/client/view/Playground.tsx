import React from "react";

import ConquestGame from "../../logic/Game";

export type PlaygroundProps = {
  game: ConquestGame | null;
};

interface Props {}

class Playground extends React.Component<Props, PlaygroundProps> {
  constructor(props: Props) {
    super(props);

    this.state = {
      game: null
    };
  }

  startGame() {
    const newGame = new ConquestGame({
      fieldHeight: 10,
      fieldWidth: 10,
      neutralPlanetCount: 4,
      players: [
        {
          id: 1,
          screenName: "One"
        },
        {
          id: 1,
          screenName: "One"
        }
      ]
    });

    this.setState({
      game: newGame
    });
  }

  render() {
    const { game } = this.state;

    return (
      <div>
        {game && <div>Game Field: {JSON.stringify(game.getDimensions())}</div>}
        <button onClick={() => this.startGame()}>Start Game</button>
      </div>
    );
  }
}

export default Playground;
