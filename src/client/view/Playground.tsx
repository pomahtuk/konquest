import React, { ReactElement, useContext } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { css } from "emotion";

import playgroundSelector, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import ArrivingFleets from "./ArrivingFleets";
import Container from "./foundations/Container";
import Grid from "./foundations/Grid";
import GridColumn from "./foundations/GridColumn";
import GameField from "./GameField";
import { ThemeContext } from "./themes/ThemeProvider";
import hexToRgba from "./helpers/hexToRgba";

const PlayGround = (): ReactElement => {
  const { isStarted = false }: PlaygroundStoreSlice = useSelector(playgroundSelector, shallowEqual);
  const theme = useContext(ThemeContext);

  const VerticalCenterParent = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  `;

  const settingsGrid = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: 0 0 ${theme.units.largest} 0;
  `;

  const turnContainer = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: ${theme.units.medium};
  `;

  return (
    <Container centered className={VerticalCenterParent}>
      {!isStarted ? (
        <Grid className={settingsGrid}>
          <GridColumn size="full" sizeLarge="half">
            <PlayerSettings />
          </GridColumn>
          <GridColumn size="full" sizeLarge="half">
            <GameSettings />
          </GridColumn>
        </Grid>
      ) : (
        <Grid>
          <GridColumn size={8} sizeMedium={8}>
            <GameField />
          </GridColumn>
          <GridColumn size={4} sizeMedium={4}>
            <div className={turnContainer}>
              <PlayerTurn />
              <ArrivingFleets />
            </div>
          </GridColumn>
        </Grid>
      )}
    </Container>
  );
};

export default PlayGround;
