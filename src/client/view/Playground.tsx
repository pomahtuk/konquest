import React, { useState, ReactElement } from "react";

import ConquestGame, { GameOptions } from "../../logic/Game";

import Header from "./Header";
import GameField from "./GameField";
import GameSettings from "./GameSettings";

const Playground = (): ReactElement => {
  const [game, setGame] = useState<ConquestGame | null>(null);

  const startGame = (options: GameOptions): void => {
    const newGame = new ConquestGame(options);

    setGame(newGame);
  };

  return (
    <div>
      <Header />
      <GameSettings onChange={startGame} />
      {game && <GameField game={game} />}
    </div>
  );
};

export default Playground;
