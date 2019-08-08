import React, { useState } from "react";

import ConquestGame, { getPlanetLimit } from "../../logic/Game";
import Player from "../../logic/Player";
import Planet from "../../logic/Planet";

const GameField: React.FC<{ game: ConquestGame }> = ({ game }) => {
  const { height, width } = game.getDimensions();
  const field: (Planet | undefined)[][] = new Array(height).fill(undefined).map(() => new Array(width).fill(undefined));
  const planets = game.getPlanets();
  // prepare gamefield
  Object.keys(planets).forEach((planetName) => {
    const planet = planets[planetName];
    const { x, y } = planet.coordinates;
    field[y][x] = planet;
  });

  return (
    <table style={{ width: 40 * width, height: 40 * height, tableLayout: "fixed" }}>
      <tbody>
        {field.map((row: (Planet | undefined)[], index) => (
          <tr key={index}>
            {row.map((cell: Planet, index) => (
              <td key={cell ? cell.name : index}>{cell ? cell.name : "·"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const useNumberInput = (initialState: number) => {
  const [value, setValue] = useState<number>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value));

  return {
    value,
    onChange
  };
};

const Playground = () => {
  const [game, setGame] = useState<ConquestGame | null>(null);
  const fieldSizeInput = useNumberInput(10);
  const neutralPlanetsInput = useNumberInput(4);

  const startGame = () => {
    const newGame = new ConquestGame({
      fieldHeight: fieldSizeInput.value,
      fieldWidth: fieldSizeInput.value,
      neutralPlanetCount: neutralPlanetsInput.value,
      players: [new Player("One"), new Player("Two")]
    });

    setGame(newGame);
  };

  return (
    <div>
      <label>
        Field Side size
        <br />
        <input type="number" {...fieldSizeInput} />
      </label>
      <br />
      <label>
        Neutral planets (max: {getPlanetLimit(fieldSizeInput.value ** 2, 2)})
        <br />
        <input type="number" {...neutralPlanetsInput} />
      </label>
      <br />
      <button onClick={startGame}>Start Game</button>
      {game && <GameField game={game} />}
    </div>
  );
};

export default Playground;
