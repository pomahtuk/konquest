import React, { ReactElement } from "react";

import ConquestGame from "../../logic/Game";
import Planet from "../../logic/Planet";

const GameField = ({ game }: { game: ConquestGame }): ReactElement => {
  const { height, width } = game;
  const planets = game.getPlanets();

  // prepare matrix
  const field: (Planet | undefined)[][] = new Array(height).fill(undefined).map((): Planet[] => new Array(width).fill(undefined));
  // place planets on field
  Object.keys(planets).forEach((planetName): void => {
    const planet = planets[planetName];
    const { x, y } = planet.coordinates;
    field[y][x] = planet;
  });

  return (
    <table style={{ width: 40 * width, height: 40 * height, tableLayout: "fixed" }}>
      <tbody>
        {field.map(
          (row: (Planet | undefined)[], index): ReactElement => (
            <tr key={index}>
              {row.map(
                (cell: Planet, index): ReactElement => (
                  <td key={cell ? cell.name : index} style={{ color: cell && cell.owner ? "red" : "inherit" }}>
                    {cell ? cell.name : "·"}
                  </td>
                )
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default GameField;
