import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const { userId } = this.props;
    const user = await getUser(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return null;
    }

    return (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={this.props.userBtnOnClick}
        >
          Clear
        </button>
      </>
    );
  }
}

CurrentUser.defaultProps = {
  userId: null,
};

CurrentUser.propTypes = {
  userId: PropTypes.number,
  userBtnOnClick: PropTypes.func.isRequired,
};
