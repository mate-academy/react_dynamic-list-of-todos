import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/todos';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  foundUser

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then((result) => {
        if (!result) {
          this.setState({
            selectedUser: { name: 'User not found!' },
          });

          return;
        }

        this.setState({
          selectedUser: result,
        });
      });
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    getUser(userId)
      .then((result) => {
        if (!result) {
          this.setState({
            selectedUser: { name: 'User not found!' },
          });

          return;
        }

        this.setState({
          selectedUser: result,
        });
      });
  }

  render() {
    const { userId, clearSelection } = this.props;
    const { selectedUser } = this.state;

    if (!selectedUser) {
      return 'Loading...';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{selectedUser.name}</h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>
        <button
          type="button"
          onClick={() => clearSelection()}
          className="CurrentUser__button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelection: PropTypes.func.isRequired,
};
