/* eslint-disable no-console */
import React from 'react';
import { CurrentUserProps } from '../../props/CurrentUserProps';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
    err: null,
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

      user
        ? this.setState({
          user,
          err: null,
        })
        : this.setState({
          err: 'User not found',
        });
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    const { userId, resetUserId } = this.props;
    const { user, err } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {userId}
          </span>
        </h2>

        {err || (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )
        }

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
