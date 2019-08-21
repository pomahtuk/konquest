import React, { ReactElement, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Global, css } from "@emotion/core";
import emotionNormalize from "emotion-normalize";

import Playground from "./view/Playground";
import { ThemeContext } from "./view/themes/ThemeProvider";

const App = (): ReactElement => {
  const theme = useContext(ThemeContext);
  return (
    <React.Fragment>
      <Global
        styles={css`
          ${emotionNormalize};
          html,
          body {
            font-family: ${theme.fontStacks.sans};
            font-size: ${theme.fontSizes.medium};
            line-height: ${theme.lineHeights.medium};
            font-weight: ${theme.fontWeights.normal};
          }
        `}
      />
      <Switch>
        <Route exact path="/" component={Playground} />
      </Switch>
    </React.Fragment>
  );
};

export default App;
