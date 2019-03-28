import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { get } from 'lodash';
import { decode as jwtDecode } from 'jwt-simple';
import localStore from 'store';
import APP_PATH from '../constants/paths';
import { setUser } from '../data/user/actions';
import api from '../helpers/api';

const requireAuth = ComposedComponent => {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    isLoggedOut() {
      const nowInSeconds = Math.round(new Date().getTime() / 1000);
      const token = localStore.get('jwt');
      if (token === undefined) {
        return true;
      }
      const decoded = jwtDecode(token, null, true);
      const exp = decoded.exp;
      return nowInSeconds > exp;
    }

    refetchUser(){
      const { signInUser } = this.props;
      api.validate_token()
      .then(({ data }) => {
        const user = get(data, 'user');
        signInUser(user);
      })
    }

    componentWillMount() {
      const token = localStore.get('jwt');

      if(!this.props.authenticated && !(token === undefined)){
        this.refetchUser();
       }

       if ((!this.props.authenticated && (token === undefined)) || this.isLoggedOut()) {
         this.props.history.push(APP_PATH.LOGIN);
       }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated || this.isLoggedOut()) {
        this.props.history.push(APP_PATH.LOGIN);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { authenticated: !isEmpty(state.data.user) };
  };

  const mapDispatchToProps = dispatch => ({
    signInUser: user => {
      dispatch(setUser(user));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default requireAuth;