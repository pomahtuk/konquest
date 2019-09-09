import React, { ReactElement, useContext } from "react";
import { Global, css } from "@emotion/core";
import { css as emotionCss } from "emotion";
import emotionNormalize from "emotion-normalize";
import { Router } from "@reach/router";

import { ThemeContext } from "./view/themes/ThemeProvider";
import ImageCredentials from "./view/ImageCredentials";
import SettingsRoute from "./view/routes/SettingsRoute";
import Container from "./view/foundations/Container";
import GameRoute from "./view/routes/GameRoute";
import { SETTINGS, PLAY, STATS } from "./routeNames";
import StatsRoute from "./view/routes/StatsRoute";

export type GalaxyCredit = {
  title: string;
  credit: string;
  link: string;
};

export interface AppProps {
  image: string;
  credit: GalaxyCredit;
  storedGame?: string;
}

const App = ({ image, credit, storedGame }: AppProps): ReactElement => {
  const theme = useContext(ThemeContext);

  const VerticalCenterParent = emotionCss`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
  `;

  return (
    <React.Fragment>
      <Global
        styles={css`
          ${emotionNormalize};
          html {
            height: 100%;
            width: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          html,
          body {
            font-family: ${theme.fontStacks.sans};
            font-size: ${theme.fontSizes.medium};
            line-height: ${theme.lineHeights.medium};
            font-weight: ${theme.fontWeights.normal};
          }
          body {
            background: url(${image}.jpg) no-repeat center center fixed;
            background-size: cover;
            min-width: 100%;
            min-height: 100%;
          }
          * {
            box-sizing: border-box;
          }
        `}
      />
      <Container centered className={VerticalCenterParent}>
        <Router>
          <SettingsRoute path={SETTINGS} default />
          <GameRoute path={PLAY} storedGame={storedGame} />
          <StatsRoute path={STATS} />
        </Router>
      </Container>
      <ImageCredentials credit={credit} />
    </React.Fragment>
  );
};

export default App;
