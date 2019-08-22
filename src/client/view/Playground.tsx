import React, { ReactElement } from "react";
import { connect } from "react-redux";

import playgroundSelectorFunction, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import Game from "./Game";
import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import ArrivingFleets from "./ArrivingFleets";
import Container from "./foundations/Container";
import Grid from "./foundations/Grid";
import GridColumn from "./foundations/GridColumn";

class PlayGround extends React.PureComponent<PlaygroundStoreSlice> {
  render(): ReactElement {
    const { isStarted } = this.props;
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
          <PlayerTurn />
        )}
        <Grid>
          <GridColumn size={8}>
            <Game />
          </GridColumn>
          <GridColumn size={4}>
            <ArrivingFleets />
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}

export default connect(playgroundSelectorFunction)(PlayGround);
