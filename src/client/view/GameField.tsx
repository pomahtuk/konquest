import React, { ReactElement } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import ConquestGame from "../../logic/Game";
import Planet from "../../logic/Planet";
import { GameState } from "../reducers/game.reducers";
import { startGame, setDestinationPlanet, setOriginPlanet } from "../actions/game.actions";
import Player from "../../logic/Player";

interface GameFieldStoreSlice {
  game?: ConquestGame;
  activePlayer: Player;
  originPlanet?: Planet;
  destinationPlanet?: Planet;
}

const selectorFunction = (state: GameState): GameFieldStoreSlice => ({
  game: state.game,
  activePlayer: state.activePlayer as Player,
  originPlanet: state.originPlanet,
  destinationPlanet: state.destinationPlanet
});

const GameField = (): ReactElement | null => {
  const dispatch = useDispatch();
  const { game, originPlanet, activePlayer, destinationPlanet }: GameFieldStoreSlice = useSelector(selectorFunction, shallowEqual);

  if (!game) {
    return null;
  }

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
      <table style={{ width: 40 * width, height: 40 * height, tableLayout: "fixed" }} data-testid="gamefield">
        <tbody>
          {field.map(
            (row: (Planet | undefined)[], index): ReactElement => (
              <tr key={index}>
                {row.map(
                  (cell: Planet, index): ReactElement => (
                    <td key={cell ? cell.name : index}>
                      {cell ? (
                        <span
                          style={{
                            color: cell.owner
                              ? "red"
                              : originPlanet && cell.name === originPlanet.name
                              ? "blue"
                              : destinationPlanet && cell.name === destinationPlanet.name
                              ? "green"
                              : "inherit"
                          }}
                          onClick={(): void => onPlanetSelect(cell)}
                        >
                          {cell.name}
                          <br />
                          {cell.ships}
                        </span>
                      ) : (
                        "·"
                      )}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
      <button onClick={onRestartGame}>Restart game</button>
    </div>
  );
};

export default GameField;
