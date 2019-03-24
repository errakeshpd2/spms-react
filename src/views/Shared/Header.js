
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { isEmpty } from 'loadsh';

import APP_PATH from '../../constants/paths';

class Header extends Component {
  render() {
    const { user } = this.props;
    const name = !isEmpty(user) && `${user.data.attributes.first_name} ${user.data.attributes.last_name}`
    return (
      <div>
          <Menu inverted color='teal' style={{ width: '100%'}}>
            <Container>
              <Menu.Item as='a' header>
                SPMS
              </Menu.Item>
              {!isEmpty(user) && (
                <>
                  <Menu.Item as='li'>
                    <Link to={APP_PATH.BASE}>Home</Link>
                  </Menu.Item>
                  <Menu.Item as='li'>
                    <Link to={APP_PATH.TICKETS}>Tickets</Link>
                  </Menu.Item>
                  <Menu.Menu position="right">
                    <Menu.Item>
                      <Link to={APP_PATH.PROFILE}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item header>
                      Logged in as &nbsp;<i>{name}</i>
                    </Menu.Item>
                    <Menu.Item>
                      <Link to={APP_PATH.LOGOUT}>Logout</Link>
                    </Menu.Item>
                  </Menu.Menu>
                </>
              )}
            </Container>
          </Menu>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const { data: { user } } = state;
  return {
    user
  };
};

export default connect(mapStateToProps)(Header);

