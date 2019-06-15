import React from "react";
import { Route, Switch } from "react-router-dom";
import New from "./pages/New";
import Feed from "./pages/Feed";
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route exact path="/new" component={New} />
  </Switch>
);

export default Routes;
