import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Login from './containers/Login'
import requireAuth from './containers/RequireAuth';
import APP_PATH from './constants/paths';
import Logout from './containers/Logout';
import Dashboard from './containers/Dashboard';
import Header from './views/Shared/Header';
import Footer from './views/Shared/Footer';
import Profile from './containers/Profile';
import Tickets from './containers/Tickets';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Container
          style={{ width: '90%', minHeight: '400px', marginTop: '3em', marginBottom: '4em' }}
        >
          <Switch>
            <Route path={APP_PATH.LOGIN} component={Login} />
            <Route path={APP_PATH.LOGOUT} component={Logout} />
            <Route path={APP_PATH.BASE} component={requireAuth(Dashboard)} exact/>
            <Route path={APP_PATH.PROFILE} component={requireAuth(Profile)} />
            <Route path={APP_PATH.TICKETS} component={requireAuth(Tickets)} />
          </Switch>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
