import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  List,
  Segment,
} from 'semantic-ui-react'


const Footer = ({ user }) => (
  <div>
     <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '3em 0em' }} color='teal'>
      <Container textAlign='center'>
        <List horizontal inverted divided link size='small' color='teal'>
          <List.Item as='a' href='#'>
            Site Map
          </List.Item>
          <List.Item as='a' href='#'>
            Contact Us
          </List.Item>
          <List.Item as='a' href='#'>
            Terms and Conditions
          </List.Item>
          <List.Item as='a' href='#'>
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  </div>
);

Footer.propTypes = {
  user: PropTypes.object
};

export default Footer;
