
import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux';

class Spinner extends Component {
  render() {
    const { spinner } = this.props;
    return (
      <div>
        {spinner && spinner.loading && (
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        )}
      </div>
    );
  }
};

const mapStateToProps = state => {
  const { data: { spinner } } = state;
  return {
    spinner
  };
};

export default connect(mapStateToProps)(Spinner);

