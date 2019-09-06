import React, { ReactElement, useContext } from "react";
import { Global, css } from "@emotion/core";
import { css as emotionCss } from "emotion";
import emotionNormalize from "emotion-normalize";
import { Router } from "@reach/router";

import Playground from "./view/Playground";
import { ThemeContext } from "./view/themes/ThemeProvider";
import ImageCredentials from "./view/ImageCredentials";
import SettingsRoute from "./view/routes/SettingsRoute";
import Container from "./view/foundations/Container";

export type GalaxyCredit = {
  title: string;
  credit: string;
  link: string;
};

export interface AppProps {
  image: string;
  credit: GalaxyCredit;
}

const App = ({ image, credit }: AppProps): ReactElement => {
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
          <SettingsRoute path="/" />
          <Playground path="/game" />
        </Router>
      </Container>
      <ImageCredentials credit={credit} />
    </React.Fragment>
  );
};

export default App;
