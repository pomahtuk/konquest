import React, { ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { startGame, setDestinationPlanet, setOriginPlanet } from "../actions/game.actions";
import gameFieldSelectorFunction, { GameFieldStoreSlice } from "../selectors/gamefield.selector";

import Planet from "../../logic/Planet";
import PlanetElement from "./Planet";
import Button from "./foundations/Button";

const GameField = (): ReactElement | null => {
  const dispatch = useDispatch();
  const { isStarted, originPlanet, activePlayer, destinationPlanet, fieldSize, planets, currentShipsModifier }: GameFieldStoreSlice = useSelector(
    gameFieldSelectorFunction,
    shallowEqual
  );

  if (!isStarted) {
    return null;
  }

  // prepare matrix
  const field: (Planet | undefined)[][] = new Array(fieldSize).fill(undefined).map((): Planet[] => new Array(fieldSize).fill(undefined));
  // place planets on field
  Object.keys(planets).forEach((planetName): void => {
    const planet = planets[planetName];
    const { x, y } = planet.coordinates;
    field[y][x] = planet;
  });

  const onRestartGame = (): void => {
    dispatch(startGame());
  };

  const onPlanetSelect = (planet: Planet): void => {
    if (!originPlanet && (!planet.owner || planet.owner.id !== activePlayer.id)) {
      // origin should belong to player
      return;
    } else if (!originPlanet && planet.owner && planet.owner.id === activePlayer.id) {
      dispatch(setOriginPlanet(planet));
    } else if (originPlanet && !destinationPlanet) {
      dispatch(setDestinationPlanet(planet));
    } else if (planet.owner && planet.owner.id === activePlayer.id) {
      dispatch(setOriginPlanet(planet));
      dispatch(setDestinationPlanet(undefined));
    }
  };

  return (
    <div>
      <table style={{ width: 40 * fieldSize, height: 40 * fieldSize, tableLayout: "fixed" }} data-testid="gamefield">
        <tbody>
          {field.map(
            (row: (Planet | undefined)[], index): ReactElement => (
              <tr key={index}>
                {row.map(
                  (cell: Planet, index): ReactElement => (
                    <td key={cell ? cell.name : index}>
                      <PlanetElement
                        planet={cell}
                        isOrigin={(originPlanet && cell && cell.name === originPlanet.name) || false}
                        isDestination={(destinationPlanet && cell && cell.name === destinationPlanet.name) || false}
                        onSelect={onPlanetSelect}
                        modifier={cell ? currentShipsModifier[cell.name] : 0}
                      />
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
      <Button variant="destructive" onClick={onRestartGame}>
        Restart game
      </Button>
    </div>
  );
};

export default GameField;
