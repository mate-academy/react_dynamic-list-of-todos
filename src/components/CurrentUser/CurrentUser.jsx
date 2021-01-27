import React from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUserById(this.props.userId)
      .then(userFromServer => (
        this.setState({
          user: userFromServer.data,
        })
      ));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUserById(this.props.userId)
        .then(userFromServer => (
          this.setState({
            user: userFromServer.data,
          })
        ));
    }
  }

  render() {
    const { user } = this.state;
    const { onUserClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user: &nbsp;
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          onClick={onUserClear}
          className="CurrentUser__clear button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number,
  onUserClear: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  userId: 0,
};
