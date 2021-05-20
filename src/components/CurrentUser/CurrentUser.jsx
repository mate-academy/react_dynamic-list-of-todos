import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUserById } from '../Api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.userFromServer();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.userFromServer();
    }
  }

  userFromServer = async() => {
    const user = await getUserById(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearInfo } = this.props;

    return (
      <>
        {user && (
        <div className="CurrentUser">

          <h2
            className="CurrentUser__title"
          >
            <span>
              Selected user: $
              {user.id}
            </span>
          </h2>

          <h3
            className="CurrentUser__name"
          >
            {user.name}
          </h3>
          <p
            className="CurrentUser__email"
          >
            {user.email}
          </p>
          <p
            className="CurrentUser__phone"
          >
            {user.phone}
          </p>
          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={clearInfo}
          >
            Clear
          </button>
        </div>
        )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearInfo: PropTypes.func.isRequired,
};
