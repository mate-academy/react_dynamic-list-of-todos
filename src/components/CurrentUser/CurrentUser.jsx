import React, { PureComponent } from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api/api';
import { currentUserType } from '../../types';

export class CurrentUser extends PureComponent {
  state = {
    user: {},
  }

  componentDidMount() {
    this.updateUser(this.props.userId);
  }

  componentDidUpdate({ userId }) {
    const newUserId = this.props.userId;

    if (userId !== newUserId) {
      this.updateUser(newUserId);
    }
  }

  updateUser(newUserId) {
    getUser(newUserId)
      .then((newUser) => {
        this.setState({
          user: newUser,
        });
      })
      .catch(() => {
        this.setState({
          user: {},
        });
      });
  }

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        {user
          ? (
            <>
              <h2 className="CurrentUser__title">
                <span>
                  {`Selected user: ${user.id}`}
                </span>
              </h2>

              <h3 className="CurrentUser__name">{user.name}</h3>
              <p className="CurrentUser__email">{user.email}</p>
              <p className="CurrentUser__phone">{user.phone}</p>

              <button
                type="button"
                onClick={clearSelectedUser}
                className="button clear-button"
              >
                Clear
              </button>
            </>
          )
          : (
            <p>User is not found</p>
          )}
      </div>
    );
  }
}

CurrentUser.propTypes = currentUserType;
