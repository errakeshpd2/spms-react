
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Container, Image } from 'semantic-ui-react';

import APP_PATH from '../../constants/paths';

const Header = ({ user }) => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          {/* <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} /> */}
          SPMS
        </Menu.Item>
        <Menu.Item as='li'>
          <Link to={APP_PATH.BASE}>Home</Link>
        </Menu.Item>
        <Menu.Item as='li'>
          <Link to={APP_PATH.TICKETS}>Tickets</Link>
        </Menu.Item>
      </Container>
    </Menu>
  </div>
);

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
