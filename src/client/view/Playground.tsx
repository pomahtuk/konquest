import React, { ReactElement, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { css } from "emotion";
import { RouteComponentProps } from "@reach/router";

import playgroundSelector, { PlaygroundStoreSlice } from "../selectors/playground.selector";

import GameSettings from "./GameSettings";
import PlayerSettings from "./PlayerSettings";
import PlayerTurn from "./PlayerTurn";
import Container from "./foundations/Container";
import Grid from "./foundations/Grid";
import GridColumn from "./foundations/GridColumn";
import GameField from "./GameField";
import { ThemeContext } from "./themes/ThemeProvider";
import hexToRgba from "./helpers/hexToRgba";
import { startGame } from "../actions/game.actions";

const PlayGround: React.SFC<RouteComponentProps> = (): ReactElement => {
  const { isStarted }: PlaygroundStoreSlice = useSelector(playgroundSelector, shallowEqual);
  const dispatch = useDispatch();
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
            <GameSettings
              onStart={(): void => {
                dispatch(startGame());
              }}
            />
          </GridColumn>
        </Grid>
      ) : (
        <Grid>
          <GridColumn size={8} sizeMedium={8}>
            <GameField />
          </GridColumn>
          <GridColumn size={4} sizeMedium={4} className={turnContainer}>
            <PlayerTurn />
          </GridColumn>
        </Grid>
      )}
    </Container>
  );
};

export default PlayGround;
