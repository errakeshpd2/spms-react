import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh';

import Login from './containers/Login'
import requireAuth from './containers/RequireAuth';
import APP_PATH from './constants/paths';
import Logout from './containers/Logout';
import Dashboard from './containers/Dashboard';
import Header from './views/Shared/Header';
import Footer from './views/Shared/Footer';

class App extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        {!isEmpty(user) && (<Header user={user} />)}
        <Container
          style={{ width: '95%', marginTop: '4em', marginBottom: '7em' }}
        >
          <Switch>
            <Route path={APP_PATH.LOGIN} component={Login} />
            <Route path={APP_PATH.LOGOUT} component={Logout} />
            <Route path={APP_PATH.BASE} component={requireAuth(Dashboard)} exact/>
          </Switch>
        </Container>
        {!isEmpty(user) && (<Footer />)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { data: { user } } = state;
  return {
    user
  };
};

export default compose(withRouter, connect(mapStateToProps))(App);
