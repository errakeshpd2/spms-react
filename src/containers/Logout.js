import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import localStore from 'store';

import { clearUser } from '../data/user/actions';
import APP_PATH from '../constants/paths';

const Logout = ({ signOutUser }) => {
  signOutUser();
  localStore.remove('jwt');

  return <Redirect to={APP_PATH.LOGIN} />;
};

const mapDispatchToProps = dispatch => ({
  signOutUser: () => {
    dispatch(clearUser());
  }
});

export default connect(null, mapDispatchToProps)(Logout);
