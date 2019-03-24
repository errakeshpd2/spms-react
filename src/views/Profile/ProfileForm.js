import React from 'react';
import { isEmpty } from 'lodash';
import { Button, Icon, Grid,  Form, Header, Message, Input } from 'semantic-ui-react';

const ProfileForm = (props) => {
    const {user, submitForm, handleInputChange, errors} = props;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Header size="large">Edit Profile</Header>
            {user.flashMessage && (
              <Message positive>
                <span>{user.flashMessage.toString()}</span>
              </Message>
            )}
            {user.error && (
              <Message negative>
                <span>{user.error.toString()}</span>
              </Message>
            )}
            <Form>
              <Form.Group widths="equal">
                <Form.Field required >
                  <label>First Name</label>
                  <Input
                    name='first_name'
                    key='first_name'
                    value={user.data.attributes.first_name}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.first_name'] && <span style={{color: 'red'}}>{errors['data.attributes.first_name']}</span>}
                </Form.Field>
                <Form.Field
                  required
                  error={errors && !isEmpty(errors['data.attributes.last_name'])}
                >
                  <label>Last Name</label>
                  <Input
                    name='last_name'
                    key='last_name'
                    value={user.data.attributes.last_name}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.last_name'] && <span style={{color: 'red'}}>{errors['data.attributes.last_name']}</span>}
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required error={!isEmpty(errors && errors['data.attributes.designation'])}>
                  <label>Designation</label>
                  <Input
                    name='designation'
                    key='designation'
                    value={user.data.attributes.designation}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.designation'] && <span style={{color: 'red'}}>{errors['data.attributes.designation']}</span>}
                </Form.Field>
                <Form.Field
                  required
                  error={errors && !isEmpty(errors['data.attributes.last_name'])}
                >
                  <label>Employee ID</label>
                  <Input
                    name='emp_id'
                    key='emp_id'
                    value={user.data.attributes.emp_id}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.emp_id'] && <span style={{color: 'red'}}>{errors['data.attributes.emp_id']}</span>}
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required error={!isEmpty(errors && errors['data.attributes.password'])}>
                  <label>Password</label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    value={user.data.attributes.password}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.password'] && <span style={{color: 'red'}}>{errors['data.attributes.password']}</span>}
                </Form.Field>
                <Form.Field
                  required
                  error={errors && !isEmpty(errors['data.attributes.password_confirmation'])}
                >
                  <label>Password Confirmation</label>
                  <Input
                    name='password_confirmation'
                    type='password'
                    key='password_confirmation'
                    value={user.data.attributes.password_confirmation}
                    onChange={handleInputChange}
                  />
                  {errors && errors['data.attributes.password_confirmation'] && <span style={{color: 'red'}}>{errors['data.attributes.password_confirmation']}</span>}
                </Form.Field>
              </Form.Group>
              <Button color="green" onClick={submitForm} inverted>
                <Icon name="checkmark" /> Update
              </Button>
            </Form>
          </Grid.Column>
        </Grid.Row>  
      </Grid>
    );
}

export default ProfileForm;
