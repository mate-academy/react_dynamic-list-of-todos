import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

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
      .then((user) => {
        if (user) {
          this.setState({ user });
        }
      });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2>{`Selected user: ${user.id}`}</h2>

        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <button
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
