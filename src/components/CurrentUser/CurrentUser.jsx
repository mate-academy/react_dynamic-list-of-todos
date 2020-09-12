import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
state = {
  user: '',
}

componentDidMount() {
  const { userId, showUser } = this.props;

  showUser(userId)
    .then((data) => {
      this.setState({
        user: data,
      });
    });
}

componentDidUpdate(prevProps) {
  const { userId, showUser } = this.props;

  if (userId === prevProps.userId) {
    return;
  }

  showUser(userId)
    .then((data) => {
      this.setState({
        user: data,
      });
    });
}

render() {
  const { name, email, phone } = this.state.user;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {
            this.props.userId
          }
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>

      <button
        className="CurrentUser__clear-btn"
        type="button"
        onClick={this.props.clearSelectedUser}
      >
        Clear
      </button>
    </div>
  );
}
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  showUser: PropTypes.func.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};
