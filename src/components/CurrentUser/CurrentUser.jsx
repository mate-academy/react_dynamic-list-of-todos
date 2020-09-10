import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { handleClearButton } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2>{`Selected user: ${user.id}`}</h2>
        <ul>
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
        </ul>
        <button
          type="button"
          onClick={handleClearButton}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  handleClearButton: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};
