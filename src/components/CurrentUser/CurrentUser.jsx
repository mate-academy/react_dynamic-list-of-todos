import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({
        selectedUser: user,
      }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId)
        .then(user => this.setState({
          selectedUser: user,
        }));
    }
  }

  render() {
    const { selectedUser } = this.state;
    const { clearUser } = this.props;

    if (!selectedUser) {
      return 'Loading...';
    }

    return (
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
        <button
          type="button"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
