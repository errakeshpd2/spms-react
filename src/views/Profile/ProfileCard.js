import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

import photo from '../../assets/img/default-avatar.png';

class ProfileCard extends React.Component {
  render() {
    const { user } = this.props;
    const name = `${user.data.attributes.first_name} ${user.data.attributes.last_name}`
    return (
      <div>
        <Card>
          <Image src={photo} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Meta>
              {user.data.attributes.email}
            </Card.Meta>
            <Card.Description>{user.data.attributes.designation}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='user' />
            2 Projects
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default ProfileCard;
