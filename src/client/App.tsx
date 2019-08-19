import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";

import Playground from "./view/Playground";

import "purecss";

const App = (): ReactElement => (
  <Switch>
    <Route exact path="/" component={Playground} />
  </Switch>
);

export default App;
