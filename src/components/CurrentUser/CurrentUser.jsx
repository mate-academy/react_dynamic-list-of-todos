import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount() {
    getUsers(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUsers(this.props.userId)
        .then(user => this.setState({
          selectedUser: user,
        }));
    }
  }

  render() {
    const { selectedUser } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {selectedUser.id}
          </span>
        </h2>

        <button
          type="button"
          className="button button__center"
          onClick={() => clearUser()}
        >
          Clear
        </button>

        <h3 className="CurrentUser__name">{selectedUser.name}</h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
