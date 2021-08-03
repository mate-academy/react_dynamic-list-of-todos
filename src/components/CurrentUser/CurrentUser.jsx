import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsersList } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state = {
    selectedUserId: this.props.userId,
    user: {},
  };

  componentDidMount() {
    getUsersList(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUsersList(this.props.userId)
        .then((user) => {
          this.setState({
            user,
            selectedUserId: this.props.userId,
          });
        });

      return true;
    }

    return false;
  }

  render() {
    const { user, selectedUserId } = this.state;
    const { name, username, email, phone } = user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {selectedUserId}
          </span>
        </h2>
        <button
          className="CurrentUser__clear-btn"
          type="button"
          onClick={() => {
            this.props.resetUser();
          }}
        >
          Clear
        </button>
        <h3 className="CurrentUser__name">{name || username}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  resetUser: PropTypes.func.isRequired,
};
