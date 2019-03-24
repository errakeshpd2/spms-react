import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment } from 'semantic-ui-react';
import Validator from 'validatorjs';

import ProfileCard from '../views/Profile/ProfileCard.js';
import ProfileForm from '../views/Profile/ProfileForm.js'
import { updateUser, saveOptions } from '../data/user/actions';
import api from '../helpers/api';

class Profile extends React.Component {
  render() {
    const { user, user: {errors} , saveOptions } = this.props;
  
    const validationRules = {
      data: {
        attributes: {
          first_name: 'required',
          last_name: 'required',
          emp_id: 'required',
          password_confirmation: [{ required_with: 'password' }]
        }
      },
    };
  
    const submitForm = (e) => {
      e.preventDefault();
      const { user } = this.props;
      const validation = new Validator(user, validationRules);

      if (validation.fails()) {
        saveOptions({ ...validation.errors});
        return false;
      } else {
        const userInput = {
          id: user.data.id,
          first_name: user.data.attributes.first_name,
          last_name: user.data.attributes.last_name,
          emp_id: user.data.attributes.emp_id,
          password: user.data.attributes.password,
          password_confirmation: user.data.attributes.password_confirmation
        }
        api.updateProfile(userInput)
        .then(({data}) => {
          saveOptions({ ...validation.errors, flashMessage: data.status, error: null});
        })
        .catch(error => {
          saveOptions({ error, ...validation.errors, flashMessage: null});
        });
      }
    };

    const handleInputChange = event => {
      const {updateProfile } = this.props;
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      updateProfile(name, value);
    };
    return (
      <div>
        { user.data && (
          <Grid stackable columns={2}>
            <Grid.Row>
              <Grid.Column computer={3} mobile={16}>
                <ProfileCard user={user}/>
              </Grid.Column>
              <Grid.Column computer={13}>
                <Segment>
                  <ProfileForm
                    user={user}
                    handleInputChange={handleInputChange}
                    submitForm={submitForm}
                    errors={errors}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => () => ({
  updateProfile: (name, value) => dispatch(updateUser({[name]:value })),
  saveOptions: (options) => dispatch(saveOptions(options)),
});

const mapStateToProps = ({ data: { user } }) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
