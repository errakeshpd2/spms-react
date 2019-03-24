import React from 'react';
import { get } from 'lodash';
import localStore from 'store';
import { connect } from 'react-redux';

import LoginForm from '../views/Login/Form.js'
import APP_PATH from '../constants/paths';
import { setUser, saveOptions } from '../data/user/actions';
import api from '../helpers/api';

class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = event.target;
    const { history, signInUser, saveOptions } = this.props;
  
    api.login(email.value, password.value)
    .then(({data}) => {
      const error = get(data, 'error');
      if (error) {
        throw Error(error);
      }
      const accessToken = get(data, 'auth_token');
      const user = get(data, 'user');
      if (!accessToken) {
        throw Error('Unexpected error');
      }
      localStore.set('jwt', accessToken);
      signInUser(user).then(()=>{
        history.push(APP_PATH.BASE);
      })
    })
    .catch(error => {
      saveOptions({ error: 'Invalid username/password'});
    });
  };

  render() {
    const { user} = this.props;
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} error={user.error}/>
      </div>
    );
  }
}

const mapStateToProps = ({ data: { user } }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  signInUser: user => {
    dispatch(setUser(user))
    return Promise.resolve();
  },
  saveOptions: (options) => dispatch(saveOptions(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
