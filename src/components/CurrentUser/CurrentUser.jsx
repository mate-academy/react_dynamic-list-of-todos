/* eslint-disable no-console */
import React from 'react';
import { CurrentUserProps } from '../../props/CurrentUserProps';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
  }

  async componentDidMount() {
    this.changeUser();
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    this.changeUser();
  }

  changeUser = async() => {
    const { userId } = this.props;

    try {
      const user = await getUser(userId);

      this.setState({
        user,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    const { userId, resetUserId } = this.props;
    const { user } = this.state;

    return !user
      ? <p>User not found</p>
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="CurrentUser__button button"
            onClick={resetUserId}
          >
            Clear
          </button>
        </div>
      );
  }
}

CurrentUser.propTypes = CurrentUserProps;
