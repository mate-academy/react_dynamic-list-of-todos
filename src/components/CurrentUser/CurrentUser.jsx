import React from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserInfo();
    }
  }

  async getUserInfo() {
    this.setState({
      selectedUser: await getUserById(this.props.userId),
    });
  }

  render() {
    const { selectedUser } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        {!selectedUser ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
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
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
