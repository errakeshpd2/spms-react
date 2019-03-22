import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Login from './containers/Login'
import requireAuth from './containers/RequireAuth';
import APP_PATH from './constants/paths';
import Logout from './containers/Logout';
import Dashboard from "./containers/Dashboard";
class App extends Component {
  render() {
    return (
      <Switch>
        <Route path={APP_PATH.LOGIN} component={Login} />
        <Route path={APP_PATH.LOGOUT} component={Logout} />
        <Route path={APP_PATH.BASE} component={requireAuth(Dashboard)} exact/>
      </Switch>
    );
  }
}

export default App;
