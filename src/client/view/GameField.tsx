import React from "react";

import ConquestGame from "../../logic/Game";
import Planet from "../../logic/Planet";

const GameField: React.FC<{ game: ConquestGame }> = ({ game }) => {
  const { height, width } = game.getDimensions();
  const planets = game.getPlanets();

  // prepare matrix
  const field: (Planet | undefined)[][] = new Array(height).fill(undefined).map(() => new Array(width).fill(undefined));
  // place planets on field
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

export default GameField;
