import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import getResponse from '../../api/api';

const url = 'https://mate-api.herokuapp.com/users';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount(prevProps, prevState) {
    getResponse(`${url}/${this.props.userId}`)
      .then((selectedUser) => {
        this.setState({ selectedUser });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== this.props.userId) {
      getResponse(`${url}/${this.props.userId}`)
        .then((selectedUser) => {
          this.setState({ selectedUser });
        });
    }
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {selectedUser.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{selectedUser.name}</h3>
          <p className="CurrentUser__email">{selectedUser.email}</p>
          <p className="CurrentUser__phone">{selectedUser.phone}</p>
          <button type="button" onClick={this.props.clearUser}>
            Clear
          </button>
        </div>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
