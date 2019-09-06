import React, { ReactElement, useContext } from "react";
import { css } from "emotion";
import { RouteComponentProps, navigate } from "@reach/router";

import { ThemeContext } from "../themes/ThemeProvider";
import hexToRgba from "../helpers/hexToRgba";
import Grid from "../foundations/Grid";
import PlayerSettings from "../PlayerSettings";
import GridColumn from "../foundations/GridColumn";
import GameSettings from "../GameSettings";
import { PLAY } from "../../routeNames";

const SettingsRoute: React.SFC<RouteComponentProps> = (): ReactElement => {
  const theme = useContext(ThemeContext);

  const settingsGrid = css`
    background: rgba(${hexToRgba(theme.colors.white, "0.3")});
    border-radius: ${theme.units.small};
    padding: 0 0 ${theme.units.largest} 0;
  `;

  return (
    <Grid className={settingsGrid}>
      <GridColumn size="full" sizeLarge="half">
        <PlayerSettings />
      </GridColumn>
      <GridColumn size="full" sizeLarge="half">
        <GameSettings
          onStart={(): void => {
            navigate(PLAY);
          }}
        />
      </GridColumn>
    </Grid>
  );
};

export default SettingsRoute;
