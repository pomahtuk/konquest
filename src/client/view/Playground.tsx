import React, { useState } from "react";

import { Slider, State, SharedProps } from "baseui/slider";
import { Button } from "baseui/button";

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

const useSlider = (initialState: number) => {
  const [value, setValue] = useState<number[]>([initialState]);

  const onChange = ({ value }: State): void => setValue(value);

  return {
    value,
    onChange
  };
};

const SliderOverrides = {
  InnerThumb: ({ $value, $thumbIndex }: SharedProps) => <React.Fragment>{$value[$thumbIndex]}</React.Fragment>,
  ThumbValue: () => null,
  Thumb: {
    style: () => ({
      height: "36px",
      width: "36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: "36px",
      borderTopRightRadius: "36px",
      borderBottomRightRadius: "36px",
      borderBottomLeftRadius: "36px",
      borderColor: "#ccc",
      borderSize: "3px",
      borderStyle: "solid",
      backgroundColor: "#fff"
    })
  }
};

const Playground = () => {
  const [game, setGame] = useState<ConquestGame | null>(null);
  const fieldSizeInput = useSlider(10);
  const neutralPlanetsInput = useSlider(4);

  const startGame = () => {
    const newGame = new ConquestGame({
      fieldHeight: fieldSizeInput.value[0],
      fieldWidth: fieldSizeInput.value[0],
      neutralPlanetCount: neutralPlanetsInput.value[0],
      players: [new Player("One"), new Player("Two")]
    });

    setGame(newGame);
  };

  const maxPlanets = getPlanetLimit(fieldSizeInput.value[0] ** 2, 2);

  return (
    <div>
      <label>
        Field Side size
        <br />
        <Slider {...fieldSizeInput} min={0} max={20} overrides={SliderOverrides} />
      </label>
      <br />
      <label>
        Neutral planets (max: {maxPlanets})
        <br />
        <Slider {...neutralPlanetsInput} min={0} max={maxPlanets} overrides={SliderOverrides} />
      </label>
      <br />
      <Button onClick={startGame}>Start Game</Button>
      {game && <GameField game={game} />}
    </div>
  );
};

export default Playground;
