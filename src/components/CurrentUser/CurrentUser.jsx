import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { userFromServer } from '../../api/todos';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    userFromServer(userId)
      .then(result => this.setState({
        selectedUser: result,
      }));
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    userFromServer(userId)
      .then(result => this.setState({
        selectedUser: result,
      }));
  }

  render() {
    const { userId, clear } = this.props;
    const { selectedUser } = this.state;

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
          onClick={() => clear()}
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
  clear: PropTypes.func.isRequired,
};
