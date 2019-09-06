import React, { ReactElement, useContext } from "react";
import { css } from "emotion";
import { RouteComponentProps, Redirect } from "@reach/router";
import { useSelector, shallowEqual } from "react-redux";

import Grid from "../foundations/Grid";
import GridColumn from "../foundations/GridColumn";
import GameField from "../GameField";
import PlayerTurn from "../PlayerTurn";
import hexToRgba from "../helpers/hexToRgba";
import { ThemeContext } from "../themes/ThemeProvider";
import gameRouteSelector, { GameRouteStoreSlice } from "../../selectors/game.route.selector";
import { SETTINGS, STATS } from "../../routeNames";
import { GameStatus } from "../../../logic/Game";
// import { restoreGame } from "../../actions/shared.actions";
// import { setPlayers } from "../../actions/players.actions";

export interface GameRouteProps extends RouteComponentProps {
  storedGame?: string;
}

const GameRoute: React.SFC<GameRouteProps> = (): ReactElement | null => {
  const { isStarted, status }: GameRouteStoreSlice = useSelector(gameRouteSelector, shallowEqual);
  const theme = useContext(ThemeContext);

  if (!isStarted) {
    return <Redirect to={SETTINGS} />;
  }

  if (status === GameStatus.COMPLETED) {
    return <Redirect to={STATS} />;
  }

  const turnContainer = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: ${theme.units.medium};
  `;

  return (
    <Grid>
      <GridColumn size={8} sizeMedium={8}>
        <GameField />
      </GridColumn>
      <GridColumn size={4} sizeMedium={4} className={turnContainer}>
        <PlayerTurn />
      </GridColumn>
    </Grid>
  );
};

export default GameRoute;
