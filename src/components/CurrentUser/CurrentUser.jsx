import React from 'react';
import { CurrentUserProps } from '../../props/CurrentUserProps';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    this.changeUser(userId);
  }

  componentDidUpdate() {
    const { userId } = this.props;

    if (this.state.user && this.state.user.id === userId) {
      return;
    }

    this.changeUser(userId);
  }

  changeUser(userId) {
    getUser(userId)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  render() {
    const { userId, resetUserId } = this.props;
    const { user } = this.state;

    return user
      ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {'Selected user: '}
              {userId}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={resetUserId}
          >
            Clear data
          </button>
        </div>
      )
      : <p>User not found</p>;
  }
}

CurrentUser.propTypes = CurrentUserProps;
