import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import PlanetElement from "./Planet";
import { startGame } from "../actions/game.actions";
import gameSelectorFunction, { GameStoreSlice } from "../selectors/game.selector";
import Button from "./foundations/Button";

export interface DispatchProps {
  onRestartGame: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onRestartGame: (): void => {
      dispatch(startGame());
    }
  };
};

class GameField extends React.PureComponent<GameStoreSlice & DispatchProps> {
  render(): ReactElement | null {
    const { planets, fieldSize, onRestartGame, isStarted } = this.props;

    if (!planets || !isStarted) {
      return null;
    }

    return (
      <React.Fragment>
        <div
          style={{
            width: fieldSize * 60,
            height: fieldSize * 60,
            position: "relative"
          }}
        >
          {Object.keys(planets).map((planetName) => {
            const planet = planets[planetName];
            return <PlanetElement key={planetName + planet.ships + JSON.stringify(planet.owner)} planet={planet} />;
          })}
        </div>
        <Button variant="destructive" onClick={onRestartGame}>
          Restart game
        </Button>
      </React.Fragment>
    );
  }
}

export default connect(
  gameSelectorFunction,
  mapDispatchToProps
)(GameField);
