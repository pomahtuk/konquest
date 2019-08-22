import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { startGame } from "../actions/game.actions";
import gameSelectorFunction, { GameStoreSlice } from "../selectors/game.selector";

import Button from "./foundations/Button";
import GameField from "./GameField";

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

class Game extends React.PureComponent<GameStoreSlice & DispatchProps> {
  render(): ReactElement {
    console.log("re-rendering Game");

    const { onRestartGame } = this.props;

    return (
      <div>
        <GameField />
        <Button variant="destructive" onClick={onRestartGame}>
          Restart game
        </Button>
      </div>
    );
  }
}

export default connect(
  gameSelectorFunction,
  mapDispatchToProps
)(Game);
