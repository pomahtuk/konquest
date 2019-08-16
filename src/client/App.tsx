import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";

import "@blueprintjs/core/lib/css/blueprint.css";

import Playground from "./view/Playground";

const App = (): ReactElement => (
  <Switch>
    <Route exact path="/" component={Playground} />
  </Switch>
);

export default App;
