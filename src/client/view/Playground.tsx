import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import playgroundSelectorFunction, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import GameField from "./GameField";
import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import ArrivingFleets from "./ArrivingFleets";
import Container from "./foundations/Container";
import Grid from "./foundations/Grid";
import GridColumn from "./foundations/GridColumn";

const Playground = (): ReactElement => {
  const { isStarted }: PlaygroundStoreSlice = useSelector(playgroundSelectorFunction);
  return (
    <Container centered>
      {!isStarted ? (
        <Grid bleed={true}>
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
          <GameField />
        </GridColumn>
        <GridColumn size={4}>
          <ArrivingFleets />
        </GridColumn>
      </Grid>
    </Container>
  );
};

export default Playground;
