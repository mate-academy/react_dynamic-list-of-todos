import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.localeUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.localeUser();
    }
  }

  async localeUser() {
    getUser(this.props.userId)
      .then((users) => {
        this.setState({ user: users.data });
      });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        {this.state.user !== null
          ? (
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

              {this.props.userId !== 0 && (
                <button
                  className="TodoList__user-button button"
                  type="button"
                  onClick={() => this.props.clearUser()}
                >
                  Clear
                </button>
              )}
            </div>
          )
          : 'User not a found'
        }
      </>
    );
  }
}
