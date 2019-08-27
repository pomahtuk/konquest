import React, { ReactElement } from "react";
import { connect } from "react-redux";

import playgroundSelectorFunction, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import ArrivingFleets from "./ArrivingFleets";
import Container from "./foundations/Container";
import Grid from "./foundations/Grid";
import GridColumn from "./foundations/GridColumn";
import GameField from "./GameField";

class PlayGround extends React.PureComponent<PlaygroundStoreSlice> {
  render(): ReactElement {
    const { isStarted = false } = this.props;

    return (
      <Container centered>
        {!isStarted ? (
          <Grid bleed={false}>
            <GridColumn size="full" sizeLarge="half">
              <PlayerSettings />
            </GridColumn>
            <GridColumn size="full" sizeLarge="half">
              <GameSettings />
            </GridColumn>
          </Grid>
        ) : (
          <Grid>
            <GridColumn size={8}>
              <GameField />
            </GridColumn>
            <GridColumn size={4}>
              <PlayerTurn />
              <ArrivingFleets />
            </GridColumn>
          </Grid>
        )}
      </Container>
    );
  }
}

export default connect(playgroundSelectorFunction)(PlayGround);
