import React from "react";
import { Route, Switch } from "react-router-dom";

import Playground from "./view/Playground";

const App = () => (
  <Switch>
    <Route exact path="/" render={() => <Playground />} />
  </Switch>
);

export default App;
