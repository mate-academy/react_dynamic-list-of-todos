import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserData();
    }
  }

  loadUserData = async() => {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clear } = this.props;

    return (
      user ? (
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
            className="CurrentUser__clear__button"
            onClick={clear}
          >
            Clear
          </button>
        </div>
      ) : (
        <h2 className="CurrentUser__title">
          <span>
            User is not found in our database
          </span>
        </h2>
      )
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
