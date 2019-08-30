import React, { ReactElement, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Global, css } from "@emotion/core";
import emotionNormalize from "emotion-normalize";

import Playground from "./view/Playground";
import { ThemeContext } from "./view/themes/ThemeProvider";
import ImageCredentials from "./view/ImageCredentials";

export type GalaxyCredit = {
  title: string;
  credit: string;
  link: string;
};

export interface AppProps {
  image: string;
  credit: GalaxyCredit;
}

const App = ({ image = "galaxy_3", credit }: AppProps): ReactElement => {
  const theme = useContext(ThemeContext);
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
      <Switch>
        <Route exact path="/" component={Playground} />
      </Switch>
      <ImageCredentials credit={credit} />
    </React.Fragment>
  );
};

export default App;
